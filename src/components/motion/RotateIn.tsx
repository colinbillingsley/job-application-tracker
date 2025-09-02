"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function RotateIn({ children }: { children: ReactNode }) {
	return (
		<motion.div
			initial={{ rotate: -10, opacity: 0 }}
			animate={{ rotate: 0, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
