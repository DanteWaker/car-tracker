import { toast as sonnerToast } from "sonner";

type ToastProps = {
	title?: string;
	description?: React.ReactNode;
	variant?: "default" | "destructive";
	duration?: number;
	position?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right"
		| "top-center"
		| "bottom-center";
	onDismiss?: () => void;
	onAutoClose?: () => void;
	className?: string;
	style?: React.CSSProperties;
	[key: string]: unknown;
};

export function useToast() {
	return {
		toast: ({ title, description, variant, ...props }: ToastProps) => {
			return sonnerToast(title, {
				description,
				...props,
			});
		},
	};
}
