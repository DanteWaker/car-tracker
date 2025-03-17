import type { ReactNode } from "react";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	actions?: ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
	return (
		<div className="flex justify-between items-center mb-6 w-full py-4">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
				{subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
			</div>

			{actions && <div className="flex items-center gap-4">{actions}</div>}
		</div>
	);
};

export default PageHeader;
