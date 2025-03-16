import type { UseMutationResult } from "@tanstack/react-query";

export type MutationFn<TData, TVariables> = (
	variables: TVariables,
) => Promise<TData>;

export interface MutationOptions<TData, TVariables, TError> {
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: TError, variables: TVariables) => void;
	onSettled?: (
		data: TData | undefined,
		error: TError | null,
		variables: TVariables,
	) => void;
	retry?: boolean | number;
	retryDelay?: number;
}

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

// Type for internal use in the adapter
export type InternalMutationOptions<TData, TVariables, TError> = Omit<
	MutationOptions<TData, TVariables, TError>,
	"mutationFn"
>;

export type InternalMutationResult<TData, TVariables, TError> =
	UseMutationResult<TData, TError, TVariables, unknown>;
