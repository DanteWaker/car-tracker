"use client";

import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface SidebarLayoutProps {
	children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
	return (
		<div className="flex h-screen">
			<Navbar />
			<div className="flex-1 overflow-auto">{children}</div>
		</div>
	);
}
