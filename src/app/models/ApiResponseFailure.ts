export default class ApiResponseFailure {
  url: string;
  message: string;
  statusCode: number;
  timestamp: Date;

  constructor(
    path: string,
    message: string,
    statusCode: number,
    timestamp: Date,
  ) {
    this.url = path;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
  }
}
