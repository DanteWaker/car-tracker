"use client";

import { Avatar, AvatarFallback } from "@/_shared/components/ui/avatar";
import { Button } from "@/_shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/_shared/components/ui/sheet";
import { useAuthStore } from "@/_shared/stores/auth.store";
import { IconDashboard, IconLogout, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const routes = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: <IconDashboard className="h-5 w-5" />,
	},
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(true);
	const pathname = usePathname();
	const { user, signOut } = useAuthStore();
	const router = useRouter();
	// Obter as iniciais do nome do usuário para o avatar
	const getUserInitials = () => {
		if (!user?.email) return "U";
		return user.email.charAt(0).toUpperCase();
	};

	// Obter o nome de exibição do usuário
	const getDisplayName = () => {
		if (user?.user_metadata?.name) return user.user_metadata.name;
		if (user?.email) {
			// Retorna a parte antes do @ no email
			return user.email.split("@")[0];
		}
		return "Usuário";
	};

	const handleSignOut = async () => {
		await signOut();
		router.push("/login");
		setIsOpen(false);
	};

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
							<span className="text-xl font-bold">Energy</span>
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

				<div className="p-4 border-t">
					{isDesktopMenuOpen ? (
						<div className="flex items-center space-x-3">
							<Avatar className="h-8 w-8">
								<AvatarFallback>{getUserInitials()}</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-medium truncate">{getDisplayName()}</div>
								<div className="text-xs text-muted-foreground truncate">{user?.email}</div>
							</div>
							<Button variant="ghost" size="icon" onClick={handleSignOut}>
								<IconLogout className="h-5 w-5" />
							</Button>
						</div>
					) : (
						<div className="flex flex-col items-center space-y-3">
							<Avatar className="h-8 w-8">
								<AvatarFallback>{getUserInitials()}</AvatarFallback>
							</Avatar>
							<Button variant="ghost" size="icon" onClick={handleSignOut}>
								<IconLogout className="h-5 w-5" />
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Navbar para mobile */}
				<nav className="md:hidden bg-background border-b sticky top-0 z-40">
					<div className="px-4 py-3">
						<div className="flex justify-between items-center">
							<Link href="/dashboard" className="flex-shrink-0 flex items-center">
								<span className="text-xl font-bold">Energy Management</span>
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

									{/* Informações do usuário para mobile */}
									<div className="flex items-center space-x-3 mb-6 pb-6 border-b">
										<Avatar className="h-10 w-10">
											<AvatarFallback>{getUserInitials()}</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">{getDisplayName()}</div>
											<div className="text-sm text-muted-foreground truncate max-w-[180px]">{user?.email}</div>
										</div>
									</div>

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

									{/* Botão de sair para mobile */}
									<div className="mt-auto pt-6 border-t">
										<Button variant="outline" className="w-full" onClick={handleSignOut}>
											<IconLogout className="mr-2 h-4 w-4" />
											Sair
										</Button>
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
