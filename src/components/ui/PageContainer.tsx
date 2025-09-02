import React, { ReactNode } from "react";
import { ScaleIn } from "../motion/ScaleIn";

const PageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<ScaleIn>
			<div className={`container mx-auto h-full w-full mt-12`}>{children}</div>
		</ScaleIn>
	);
};

export default PageContainer;
