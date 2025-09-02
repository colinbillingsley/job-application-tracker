"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({ children }: { children: ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
		>
			{children}
		</motion.div>
	);
}
