"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function ScaleIn({ children }: { children: ReactNode }) {
	return (
		<motion.div
			initial={{ scale: 0.95, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
