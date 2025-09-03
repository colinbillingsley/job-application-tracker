"use client";
import { cn } from "@/lib/utils";
import { NavLinkType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, name, icon, className }: NavLinkType) => {
	const pathname = usePathname();
	const isActive = pathname.includes(href);

	return (
		<Link
			href={href}
			className={cn(
				`flex items-center gap-1 transition-all h-full px-3 ${
					isActive ? "font-bold bg-primary/10 border-b-2 border-b-primary" : ""
				}`,
				className
			)}
		>
			{icon && <span>{icon}</span>}
			<span>{name}</span>
		</Link>
	);
};

export default NavLink;
