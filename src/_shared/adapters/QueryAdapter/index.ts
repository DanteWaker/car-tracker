import { useQuery as useReactQuery } from "@tanstack/react-query";

import type { InternalQueryOptions, QueryFn, QueryKey, QueryOptions, QueryResult } from "./contracts";

/**
 * A wrapper around React Query's useQuery hook to decouple the application from the library
 *
 * @param key - The query key used for caching and deduplication
 * @param queryFn - The function that fetches the data
 * @param options - Additional options for the query
 * @returns A simplified query result object
 */
export function useQuery<TData = unknown, TError = Error>(
	key: QueryKey,
	queryFn: QueryFn<TData>,
	options?: QueryOptions<TData, TError>,
): QueryResult<TData, TError> {
	const result = useReactQuery<TData, TError>({
		queryKey: Array.isArray(key) ? key : [key],
		queryFn,
		refetchOnWindowFocus: false,
		...(options as Omit<InternalQueryOptions<TData, TError>, "refetchOnWindowFocus">),
	});

	return {
		data: result.data,
		error: result.error,
		isLoading: result.isLoading,
		isError: result.isError,
		isSuccess: result.isSuccess,
		refetch: result.refetch,
		isFetching: result.isFetching,
	};
}

// Re-export types from contracts
export * from "./contracts";
