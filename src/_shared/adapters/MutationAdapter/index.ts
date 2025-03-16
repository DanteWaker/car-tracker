import { useMutation as useReactMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
	MutationFn,
	MutationOptions,
	MutationResult,
	InternalMutationResult,
} from "./contracts";

/**
 * A wrapper around React Query's useMutation hook to decouple the application from the library
 * and provide generic error handling
 *
 * @param mutationFn - The function that performs the mutation
 * @param options - Additional options for the mutation
 * @returns A simplified mutation result object
 */
export function useMutation<
	TData = unknown,
	TVariables = unknown,
	TError = Error,
>(
	mutationFn: MutationFn<TData, TVariables>,
	options?: MutationOptions<TData, TVariables, TError>,
): MutationResult<TData, TVariables, TError> {
	const result = useReactMutation<TData, TError, TVariables>({
		mutationFn,
		onError: (error, variables) => {
			// Generic error handling
			console.error("Mutation error:", error);

			// Display error toast with appropriate message
			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro ao processar a solicitação";

			toast.error(errorMessage);

			// Call custom error handler if provided
			options?.onError?.(error, variables);
		},
		onSuccess: options?.onSuccess,
		onSettled: options?.onSettled,
		retry: options?.retry,
		retryDelay: options?.retryDelay,
	}) as InternalMutationResult<TData, TVariables, TError>;

	return {
		data: result.data,
		error: result.error,
		isLoading: result.isPending,
		isError: result.isError,
		isSuccess: result.isSuccess,
		reset: result.reset,
		mutate: result.mutate,
		mutateAsync: result.mutateAsync,
	};
}

// Re-export types from contracts
export * from "./contracts";
