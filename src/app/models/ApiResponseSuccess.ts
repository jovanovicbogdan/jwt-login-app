export default class ApiResponseSuccess<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
