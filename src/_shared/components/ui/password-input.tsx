"use client";

import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	showToggle?: boolean;
}

export function PasswordInput({ showToggle = true, className, ...props }: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input type={showPassword ? "text" : "password"} className={className} {...props} />
			{showToggle && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShowPassword(!showPassword)}
					disabled={props.disabled}
				>
					{showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
					<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
				</Button>
			)}
		</div>
	);
}
