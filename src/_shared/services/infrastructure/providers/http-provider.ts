import type { AxiosInstance } from "axios";

import type { BaseRequest, IHttpProvider } from "./http-provider-contracts";
import { HttpMethod, type IHttpClient } from "../contracts/http-contracts";
import { HttpClient } from "../htttp/http-client";
import apiInstance from "../../api/api";

class HttpProvider implements IHttpProvider {
	private httpClient: IHttpClient;

	constructor(api: AxiosInstance) {
		this.httpClient = HttpClient.create(api);
	}

	public get = async <TResponse>(request: BaseRequest): Promise<TResponse> => {
		return await this.httpClient.sendRequest<TResponse, unknown>({
			endpoint: request.endpoint,
			method: HttpMethod.GET,
			params: request.params,
		});
	};

	public post = async <TResponse, TBody>(
		request: BaseRequest<TBody>,
	): Promise<TResponse> => {
		return await this.httpClient.sendRequest<TResponse, TBody>({
			endpoint: request.endpoint,
			method: HttpMethod.POST,
			body: request.body,
			params: request.params,
		});
	};

	public del = async (request: BaseRequest): Promise<void> => {
		await this.httpClient.sendRequest<unknown, unknown>({
			endpoint: request.endpoint,
			method: HttpMethod.DELETE,
			body: request.body,
		});
	};

	public put = async <TResponse, TBody>(
		request: BaseRequest<TBody>,
	): Promise<TResponse> => {
		return await this.httpClient.sendRequest<TResponse, TBody>({
			endpoint: request.endpoint,
			method: HttpMethod.PUT,
			body: request.body,
			params: request.params,
		});
	};

	public patch = async <TResponse, TBody>(
		request: BaseRequest<TBody>,
	): Promise<TResponse> => {
		return await this.httpClient.sendRequest<TResponse, TBody>({
			endpoint: request.endpoint,
			method: HttpMethod.PATCH,
			body: request.body,
			params: request.params,
		});
	};
}

export const httpProvider = new HttpProvider(apiInstance);
