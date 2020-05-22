# Dev-Blog
### despair driven development
![GitHub repo size](https://img.shields.io/github/repo-size/PierreStephaneVoltaire/pvoltaire)
![GitHub last commit](https://img.shields.io/github/last-commit/PierreStephaneVoltaire/pvoltaire)
![GitHub](https://img.shields.io/github/license/PierreStephaneVoltaire/pvoltaire)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=com.lapots.breed.judge:judge-rule-engine&metric=alert_status)](https://sonarcloud.io/dashboard?id=PierreStephaneVoltaire_pvoltaire)
![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (long format)](https://img.shields.io/sonar/blocker_violations/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (long format)](https://img.shields.io/sonar/critical_violations/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (long format)](https://img.shields.io/sonar/major_violations/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (long format)](https://img.shields.io/sonar/minor_violations/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (long format)](https://img.shields.io/sonar/info_violations/PierreStephaneVoltaire_pvoltaire?server=https%3A%2F%2Fsonarcloud.io)

This is a simple multi-user blog/cms using Nestjs angular and react
![stack](bin/despair.png "Architecture")
I'm currently using multiple service from the aws stack such as:
* Lambda for calls to the consul endpoint to know the location of other services
* Lightsail to host my servers :(It was a cheap way to get the project started and i can always upgrade to ECS later)
* RDS for user and post data persistence: I wanted to avoid a NoSQL db
    * The data structure is mostly consistent
     * i wanted to avoid redundancy
     * it's easier for organizing and visualizing data
 * I may add Dynamo or something else if i start dealing with data from unstructured sources 
 * S3 for static site hosting
 * r53 and Cloudfont as DNS service and cdn 
      
The architecture right now, is a bit of a mess, so it is subject to change

---

## Features , Progress & stack
- [ ] User login/sign up (WIp)
  * Dotnet core (C#)
  * AWS Cognito
  * Entity framework Core  
  * RDS (MySql)
  * React
- [ ] Content viewing (Posts)(WIP)
  * Angular
- [ ] Content management and creation(WIP)
  * Typescript
  * RDS (MySql)
  * TypeORM
  * Nestjs
  * React
- [ ] Post templates creation and selection
- [ ] Post versioning (Draft/updates)
- [ ] Comments
- [ ] Chat
- [ ] Email notification
- [ ] Virtual meetings
- [ ] Post Fuzzy search
  * SpringBoot (JAVA)
  * Elasticsearch
  * JAVA
## link
http://despairdrivendevelopment.net/
