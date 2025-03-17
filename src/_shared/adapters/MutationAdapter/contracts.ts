import type { UseMutationResult } from "@tanstack/react-query";

/**
 * Function that executes the mutation and returns a Promise with the data.
 * @template TData Type of data returned by the mutation.
 * @template TVariables Type of variables passed to the mutation.
 */
export type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

/**
 * Configuration options for a mutation.
 * @template TData Type of data returned by the mutation.
 * @template TVariables Type of variables passed to the mutation.
 * @template TError Type of error that may occur during the mutation.
 */
export interface MutationOptions<TData, TVariables, TError> {
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: TError, variables: TVariables) => void;
	onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
	retry?: boolean | number;
	retryDelay?: number;
}

/**
 * Result of a mutation, containing data, state and control functions.
 * @template TData Type of data returned by the mutation.
 * @template TVariables Type of variables passed to the mutation.
 * @template TError Type of error that may occur during the mutation.
 */
export interface MutationResult<TData, TVariables, TError> {
	data: TData | undefined;
	error: TError | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	reset: () => void;
	mutate: (variables: TVariables) => void;
	mutateAsync: (variables: TVariables) => Promise<TData>;
}

/**
 * Internal mutation options, omitting properties that are managed internally by the adapter.
 * @template TData Type of data returned by the mutation.
 * @template TVariables Type of variables passed to the mutation.
 * @template TError Type of error that may occur during the mutation.
 */
export type InternalMutationOptions<TData, TVariables, TError> = Omit<
	MutationOptions<TData, TVariables, TError>,
	"mutationFn"
>;

/**
 * Internal mutation result type used by the adapter.
 * @template TData Type of data returned by the mutation.
 * @template TVariables Type of variables passed to the mutation.
 * @template TError Type of error that may occur during the mutation.
 */
export type InternalMutationResult<TData, TVariables, TError> = UseMutationResult<TData, TError, TVariables, unknown>;
