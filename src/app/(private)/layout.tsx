import { SidebarLayout } from "@/_shared/templates/layout/SidebarLayout";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "../providers";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-public-sans",
});

export const metadata: Metadata = {
	title: "Car Tracker",
	description: "Car Tracker",
};

export const dynamic = "force-dynamic";

export default async function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				<SidebarLayout>
					<Providers>{children}</Providers>
				</SidebarLayout>
			</body>
		</html>
	);
}
