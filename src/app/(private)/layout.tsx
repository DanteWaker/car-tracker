import type { Route } from "@/_shared/templates/layout/Navbar";
import { SidebarLayout } from "@/_shared/templates/layout/SidebarLayout";
import { IconCar, IconDashboard, IconRoute } from "@tabler/icons-react";

const routes: Route[] = [
	{
		name: "Dashboard",
		path: "/",
		icon: <IconDashboard className="h-5 w-5" />,
	},
	{
		name: "Veículos",
		path: "/vehicles",
		icon: <IconCar className="h-5 w-5" />,
	},
	{
		name: "Rastreamento de veículos",
		path: "/rastreamento",
		icon: <IconRoute className="h-5 w-5" />,
	},
];

export default async function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarLayout routes={routes}>
			<div className="p-6">{children}</div>
		</SidebarLayout>
	);
}
