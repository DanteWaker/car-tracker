import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-4">
			<h1 className="text-6xl font-bold text-primary dark:text-primary-dark">404</h1>
			<h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300">Page not found</h2>
			<p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
				Sorry, the page you are looking for does not exist or has been moved.
			</p>
			<Link
				href="/"
				className="mt-4 px-6 py-3 rounded-md bg-primary dark:bg-primary-dark hover:opacity-90 transition-opacity text-primary-dark  dark:text-primary"
			>
				Back to Home
			</Link>
		</div>
	);
}
