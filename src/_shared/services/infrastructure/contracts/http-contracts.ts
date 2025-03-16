export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type IHttpRequest<TBody = unknown> = {
  endpoint: string
  method: HttpMethod
  body?: TBody
  headers?: Record<string, string | number | boolean>
  params?: Record<string, string | number | boolean>
}

export interface IHttpClient {
  sendRequest: <TResponse, TBody = unknown>(
    request: IHttpRequest<TBody>
  ) => Promise<TResponse>
}
