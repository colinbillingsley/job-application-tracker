"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SlideInFromRight({ children }: { children: ReactNode }) {
	return (
		<motion.div
			initial={{ x: 50, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
