import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";

// Types
export type QueryKey = string | readonly unknown[];
export type QueryFn<TData> = () => Promise<TData>;

export interface QueryOptions<TData, TError> {
	enabled?: boolean;
	onSuccess?: (data: TData) => void;
	onError?: (error: TError) => void;
	retry?: boolean | number;
	retryDelay?: number;
	staleTime?: number;
	cacheTime?: number;
	refetchOnWindowFocus?: boolean;
	refetchOnMount?: boolean;
	refetchInterval?: number | false;
	suspense?: boolean;
}

export interface QueryResult<TData, TError> {
	data: TData | undefined;
	error: TError | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	refetch: () => Promise<UseQueryResult<TData, TError>>;
	isFetching: boolean;
}

// Type for internal use in the adapter
export type InternalQueryOptions<TData, TError> = Omit<
	UseQueryOptions<TData, TError>,
	"queryKey" | "queryFn"
>;
