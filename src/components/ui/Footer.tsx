import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 text-sm text-muted-foreground">
				<p>
					&copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
				</p>

				<div className="flex space-x-6 mt-4 md:mt-0">
					<Link
						href="/privacy"
						className="hover:text-foreground transition-colors"
					>
						Privacy
					</Link>
					<Link
						href="/terms"
						className="hover:text-foreground transition-colors"
					>
						Terms
					</Link>
					<Link
						href="/about"
						className="hover:text-foreground transition-colors"
					>
						About
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
