export class BaseResponseApiDto<T> {
    data?: T | null;
    message: string;
    statuCode: number;
}