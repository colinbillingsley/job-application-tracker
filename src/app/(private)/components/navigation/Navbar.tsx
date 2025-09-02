import NavLink from "@/components/navigation/NavLink";
import { NavLinkType } from "@/types";
import { BriefcaseBusiness, LayoutDashboard, Speech } from "lucide-react";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";

const ICONSIZE = 18;
const STROKEWIDTH = 1.5;

const navbarLinks: NavLinkType[] = [
	{
		href: "/dashboard",
		name: "Dashboard",
		icon: <LayoutDashboard size={ICONSIZE} strokeWidth={STROKEWIDTH} />,
	},
	{
		href: "/jobs",
		name: "Jobs",
		icon: <BriefcaseBusiness size={ICONSIZE} strokeWidth={STROKEWIDTH} />,
	},
	{
		href: "/interviews",
		name: "Interviews",
		icon: <Speech size={ICONSIZE} strokeWidth={STROKEWIDTH} />,
	},
];

const Navbar = () => {
	return (
		<nav className="w-full mx-auto container flex items-center justify-between">
			<Link href="/" className="font-bold">
				JobTracker
			</Link>

			<div className="flex items-center">
				{navbarLinks.map((link) => (
					<NavLink key={link.href} {...link} />
				))}
				<SignOutButton />
			</div>
		</nav>
	);
};

export default Navbar;
