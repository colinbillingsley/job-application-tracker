import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const H1 = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <h1 className={cn(`font-black text-3xl`, className)}>{children}</h1>;
};

export default H1;
