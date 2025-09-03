import React, { ReactNode } from "react";
import { ScaleIn } from "../motion/ScaleIn";
import { cn } from "@/lib/utils";

const PageContainer = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<ScaleIn>
			<div
				className={cn(
					`container mx-auto min-h-screen h-full w-full my-12 px-4`,
					className
				)}
			>
				{children}
			</div>
		</ScaleIn>
	);
};

export default PageContainer;
