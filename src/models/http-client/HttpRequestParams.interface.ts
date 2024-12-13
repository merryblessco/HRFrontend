export interface HttpRequestParamsInterface {
  url: string;
  requiresToken: boolean;
  payload?: any;
}

export interface ApiResponse {
  statusCode: any;
  message: any;
  data: any;
}

// export interface HttpRequestParamsInterface<T> {
//   url: string;
//   requiresToken: boolean;
//   payload?: T | any | undefined;
// }
