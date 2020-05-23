type NoParamConstructor<T> = new () => T;

export class Mapper {

	static ConvertTo<T, U>(type: NoParamConstructor<T>, obj: U) {
		return Object.assign(new type(), obj);
	}
}
