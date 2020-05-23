
terraform {
  required_version = ">= 0.12"
  backend "s3" {
    bucket = "ddd-state"
    key    =  "terraform.tfstate"
    region ="ca-central-1"
    encrypt        = true
  }
}

locals {
  app = "prod.api"
  region = "ca-central-1"
  keyname = "aws"
  domain = "despairdrivendevelopment.net"
}
variable "aws_access_key_id"{}
variable "aws_secret_access_key" {}
variable "region" {}
variable "db_type" {}
variable "db_host" {}
variable "db_port"{}
variable "db_username"{}
variable "db_password"{}
variable "db_database"{}
variable "api_port"{}
variable "api_secure_port"{}

variable "environment" {}


provider "aws" {
  region = "ca-central-1"

}

resource "tls_private_key" "aws" {
  algorithm = "RSA"
}

resource "null_resource" "docker_build" {
  triggers = {
    dockerfile = filemd5("Dockerfile")
    dockercomposefile=filemd5("docker-compose.yml")
    dockercomposefile=filemd5(".env")

  }

  provisioner "local-exec" {
    command = "docker build  -t devblog --build-arg api_port=${var.api_port} --build-arg  api_port=${var.api_secure_port}"
  }
  provisioner "local-exec" {
    command = "docker save devblog | gzip > devblog.tar.gz"
  }

  provisioner "local-exec" {
    when = destroy
    command = "docker rmi devblog --force"
  }
}

resource "aws_lightsail_key_pair" "lightsail_key_pair" {
  name = "aws_key"
  public_key = tls_private_key.aws.public_key_openssh
}
resource "aws_lightsail_static_ip_attachment" "app" {
  static_ip_name = aws_lightsail_static_ip.app.name
  instance_name  = aws_lightsail_instance.app.name
}

resource "aws_lightsail_static_ip" "app" {
  name = "${local.app}ip"
}

resource "aws_lightsail_instance" "app" {
  name = local.app
  availability_zone = "${local.region}b"
  blueprint_id = "ubuntu_18_04"

  bundle_id = "nano_2_0"
  key_pair_name = aws_lightsail_key_pair.lightsail_key_pair.name
  provisioner "remote-exec" {
    connection {
      type = "ssh"
      user = "ubuntu"
      host = self.public_ip_address
      private_key = tls_private_key.aws.private_key_pem
    }
    inline = [
      "curl -fsSL https://get.docker.com -o get-docker.sh",
      "sudo sh get-docker.sh",
      "sudo curl -L \"https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "sudo apt install git",
      "sudo apt install consul"
    ]
  }


}

resource "null_resource" "docker_deploy" {
  depends_on = [
    null_resource.docker_build
  ]

  triggers = {
    public_ip = aws_lightsail_instance.app.public_ip_address
  }

  connection {
    type = "ssh"
    user = "ubuntu"
    host = self.triggers.public_ip
    private_key = tls_private_key.aws.private_key_pem
  }
  provisioner "file" {
    source = ".env"
    destination = ".env"
  }
  provisioner "file" {
    source = "devblog.tar.gz"
    destination = "devblog.tar.gz"
  }

  provisioner "file" {
    source = "docker-compose.yml"
    destination = "docker-compose.yml"
  }
  provisioner "remote-exec" {
    inline = [
    "sudo docker load --input devblog.tar.gz",
      "sudo docker-compose up",
      "echo \"updated\">>text.txt"
    ]
  }
}

resource "local_file" "aws_key" {
  filename = "aws_key.pem"
  file_permission = "0600"
  sensitive_content = tls_private_key.aws.private_key_pem
}

resource "null_resource" "export_ip" {

  provisioner "local-exec" {
    command = "export api_host=${aws_lightsail_static_ip.app.ip_address}:${var.api_port}"
  }
}

resource "aws_s3_bucket" "app" {
  bucket = "${local.app}.${local.domain}"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "AES256"
      }
    }
  }
}

data "aws_route53_zone" "zone" {
  name         = "${local.domain}."
}

resource "aws_route53_record" "app" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "${local.app}.${data.aws_route53_zone.zone.name}"
  type    = "A"
  ttl     = "300"
  records = [aws_lightsail_static_ip.app.ip_address]
}


resource "aws_iam_user" "app" {
  name = local.app
}

resource "aws_iam_access_key" "app" {
  user    = aws_iam_user.app.name
}

resource "aws_iam_user_policy" "app" {
  name = local.app
  user = aws_iam_user.app.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::${local.app}.${local.domain}"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::${local.app}.${local.domain}/*"]
    }
  ]
}
EOF
}

output "ip" {
  value = aws_lightsail_instance.app.public_ip_address
}

