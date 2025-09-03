import NavLink from "@/components/navigation/NavLink";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<nav className="w-full h-16 mx-auto container flex items-center justify-between">
			<Link href="/" className="font-bold">
				JobTracker
			</Link>

			<div className="flex items-center h-full">
				<NavLink href="/login" name="Login" />
				<NavLink href="/register" name="Register" />
			</div>
		</nav>
	);
};

export default Navbar;
