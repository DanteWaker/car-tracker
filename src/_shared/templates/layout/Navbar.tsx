"use client";

import { Avatar, AvatarFallback } from "@/_shared/components/ui/avatar";
import { Button } from "@/_shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/_shared/components/ui/sheet";
import { IconDashboard, IconLogout, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

export interface Route {
	name: string;
	path: string;
	icon: ReactNode;
}

const defaultRoutes: Route[] = [
	{
		name: "Dashboard",
		path: "/",
		icon: <IconDashboard className="h-5 w-5" />,
	},
];

interface NavbarProps {
	routes?: Route[];
}

export function Navbar({ routes = defaultRoutes }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(true);
	const pathname = usePathname();
	const router = useRouter();

	const toggleDesktopMenu = () => {
		setIsDesktopMenuOpen(!isDesktopMenuOpen);
	};

	return (
		<div className="flex h-screen">
			{/* Sidebar para desktop */}
			<div
				className={`hidden md:flex flex-col bg-background border-r transition-all duration-300 ${isDesktopMenuOpen ? "w-64" : "w-16"}`}
			>
				<div className="p-4 flex items-center justify-between border-b">
					{isDesktopMenuOpen && (
						<Link href="/dashboard" className="flex-shrink-0 flex items-center">
							<span className="text-xl font-bold">Car Tracker</span>
						</Link>
					)}
					<Button variant="ghost" size="icon" onClick={toggleDesktopMenu}>
						<IconMenu2 className="h-5 w-5" />
					</Button>
				</div>

				<div className="flex-1 py-6 px-3 space-y-2">
					{routes.map((route) => (
						<Link
							key={route.path}
							href={route.path}
							className={`flex items-center p-2 rounded-md ${
								pathname === route.path
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							}`}
						>
							<div className="flex items-center">
								{route.icon}
								{isDesktopMenuOpen && <span className="ml-3 text-sm font-medium">{route.name}</span>}
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Navbar para mobile */}
				<nav className="md:hidden bg-background border-b sticky top-0 z-40">
					<div className="px-4 py-3">
						<div className="flex justify-between items-center">
							<Link href="/dashboard" className="flex-shrink-0 flex items-center">
								<span className="text-xl font-bold">Car Tracker Management</span>
							</Link>

							{/* Menu hambúrguer para mobile */}
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon">
										<IconMenu2 className="h-5 w-5" />
										<span className="sr-only">Abrir menu</span>
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-[250px] sm:w-[300px]">
									<SheetHeader className="pb-6">
										<SheetTitle>Menu</SheetTitle>
									</SheetHeader>

									{/* Links de navegação para mobile */}
									<div className="flex flex-col space-y-3 py-4">
										{routes.map((route) => (
											<Link
												key={route.path}
												href={route.path}
												className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
													pathname === route.path
														? "bg-primary/10 text-primary"
														: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
												}`}
												onClick={() => setIsOpen(false)}
											>
												{route.icon}
												<span className="ml-3">{route.name}</span>
											</Link>
										))}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}
