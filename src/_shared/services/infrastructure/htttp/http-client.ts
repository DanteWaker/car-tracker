import type { AxiosError, AxiosInstance } from "axios";
import type { IHttpClient, IHttpRequest } from "../contracts/http-contracts";

export class HttpClient implements IHttpClient {
	constructor(private readonly api: AxiosInstance) {}

	static create(api: AxiosInstance) {
		return new HttpClient(api);
	}

	async sendRequest<TResponse, TBody>(
		props: IHttpRequest<TBody>,
	): Promise<TResponse> {
		const { endpoint, method, body, headers, params } = props;

		try {
			const response = await this.api.request<TResponse>({
				url: endpoint,
				method,
				headers,
				data: body,
				params,
			});

			return response.data;
		} catch (_err: unknown) {
			const _error = _err as AxiosError;
			const status = _error.response?.status || 500;
			const message = _error.response?.data || _error.message;
			throw new Error(`Request failed with status ${status}: ${message}`);
		}
	}
}
