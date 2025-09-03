import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ApplicationStatus } from "@/types";
import React from "react";

const StatusSelector = ({
	value,
	onChange,
	error,
	className,
}: {
	value: string;
	onChange: (value: ApplicationStatus) => void;
	error?: string;
	className?: string;
}) => {
	return (
		<div className={`space-y-2 w-full`}>
			<Label htmlFor="status" className={`${error ? "text-destructive" : ""}`}>
				Application Status
			</Label>
			<Select onValueChange={onChange} value={value}>
				<SelectTrigger className={cn(`w-full`, className)}>
					<SelectValue placeholder="Select the status of your job application" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="applied">Applied</SelectItem>
					<SelectItem value="under_review">Under Review</SelectItem>
					<SelectItem value="interview">Interview</SelectItem>
					<SelectItem value="offered">Offered</SelectItem>
					<SelectItem value="accepted">Accepted</SelectItem>
					<SelectItem value="rejected">Rejected</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default StatusSelector;
