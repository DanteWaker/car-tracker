"use client";

import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import type { Route } from "./Navbar";

interface SidebarLayoutProps {
	children: ReactNode;
	routes?: Route[];
}

export function SidebarLayout({ children, routes }: SidebarLayoutProps) {
	return (
		<div className="flex h-screen">
			<Navbar routes={routes} />
			<div className="flex-1 overflow-auto">{children}</div>
		</div>
	);
}
