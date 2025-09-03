import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { JobType } from "@/types";
import React from "react";

const JobTypeRadio = ({
	value,
	onChange,
	error,
	className,
}: {
	value: string;
	onChange: (value: JobType) => void;
	error?: string;
	className?: string;
}) => {
	return (
		<div className={`space-y-2`}>
			<Label htmlFor="pay" className={`${error ? "text-destructive" : ""}`}>
				Job Type
			</Label>
			<RadioGroup
				value={value}
				onValueChange={onChange}
				className={cn(`flex items-center justify-around`, className)}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="onsite" id="onsite" />
					<Label htmlFor="onsite">On-site</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="remote" id="remote" />
					<Label htmlFor="remote">Remote</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="hybrid" id="hybrid" />
					<Label htmlFor="hybrid">Hybrid</Label>
				</div>
			</RadioGroup>
		</div>
	);
};

export default JobTypeRadio;
