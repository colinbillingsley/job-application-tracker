"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function StaggeredList({
	children,
	className,
}: {
	children: ReactNode[];
	className?: string;
}) {
	return (
		<motion.ul
			initial="hidden"
			animate="show"
			variants={{
				hidden: { opacity: 0 },
				show: {
					opacity: 1,
					transition: { staggerChildren: 0.1 },
				},
			}}
			className={cn(``, className)}
		>
			{children.map((child, i) => (
				<motion.li
					key={i}
					variants={{
						hidden: { opacity: 0, y: 20 },
						show: { opacity: 1, y: 0 },
					}}
				>
					{child}
				</motion.li>
			))}
		</motion.ul>
	);
}
