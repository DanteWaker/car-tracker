export type TFilter = {
	column: string;
	operator: string;
	type: string;
	value: string;
	sortDirection: string;
};

export type BaseRequest<TBody = unknown> = {
	endpoint: string;
	params?: Record<string, string>;
	body?: TBody;
};

export interface PaginationInfo {
	totalItems: number;
	itemsReturned: number;
	pageSize: number;
	currentPage: number;
	totalPages: number;
	nextPage: number | null;
	prevPage: number | null;
}

export interface IHttpProvider {
	get: <TResponse>(request: BaseRequest) => Promise<TResponse>;
	post: <TResponse, TBody>(request: BaseRequest<TBody>) => Promise<TResponse>;
	del: (request: BaseRequest) => Promise<void>;
	put: <TResponse, TBody>(request: BaseRequest<TBody>) => Promise<TResponse>;
	patch: <TResponse, TBody>(request: BaseRequest<TBody>) => Promise<TResponse>;
}
