import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";

/**
 * Represents the query key which can be a string or a readonly array of unknown values.
 * Used to uniquely identify a query in the cache.
 */
export type QueryKey = string | readonly unknown[];

/**
 * Function that executes the query and returns a Promise with the data.
 * @template TData Type of data returned by the query.
 */
export type QueryFn<TData> = () => Promise<TData>;

/**
 * Configuration options for a query.
 * @template TData Type of data returned by the query.
 * @template TError Type of error that may occur during the query.
 */
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

/**
 * Result of a query, containing data, state and control functions.
 * @template TData Type of data returned by the query.
 * @template TError Type of error that may occur during the query.
 */
export interface QueryResult<TData, TError> {
	data: TData | undefined;
	error: TError | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	refetch: () => Promise<UseQueryResult<TData, TError>>;
	isFetching: boolean;
}

/**
 * Internal query options, omitting properties that are managed internally by the adapter.
 * @template TData Type of data returned by the query.
 * @template TError Type of error that may occur during the query.
 */
export type InternalQueryOptions<TData, TError> = Omit<
	UseQueryOptions<TData, TError>,
	"queryKey" | "queryFn"
>;
