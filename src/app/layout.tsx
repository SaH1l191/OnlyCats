import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "next-cloudinary/dist/cld-video-player.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "OnlyHorse - E-commerce Store",
	description:
		"OnlyHorse is a platform for horse lovers which includes a wide range of exclusive content and merchandise.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		//docs 
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='h-screen flex flex-col'>
						<div className='flex-1'>
							{children}
						</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}