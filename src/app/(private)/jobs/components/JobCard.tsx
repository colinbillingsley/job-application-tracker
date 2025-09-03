import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ApplicationStatus, JobDataType, JobType } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	Building2,
	Calendar,
	CircleDollarSignIcon,
	MapPin,
} from "lucide-react";

const ICONSIZE: number = 14;

dayjs.extend(relativeTime);

export function displayJobType(type: JobType) {
	switch (type) {
		case "onsite":
			return <p>On-Site</p>;
		case "remote":
			return <p>Remote</p>;
		case "hybrid":
			return <p>Hybrid</p>;
	}
}

export function displayApplicationStatus(status: ApplicationStatus) {
	switch (status) {
		case "applied":
			return (
				<p className="px-4 py-2 rounded-md bg-applied text-applied-foreground">
					Applied
				</p>
			);
		case "under_review":
			return (
				<p className="px-4 py-2 rounded-md bg-under-review text-under-review-foreground">
					Under Review
				</p>
			);
		case "interview":
			return (
				<p className="px-4 py-2 rounded-md bg-interview text-interview-foreground">
					Interview
				</p>
			);
		case "offered":
			return (
				<p className="px-4 py-2 rounded-md bg-offered text-offered-foreground">
					Offered
				</p>
			);
		case "accepted":
			return (
				<p className="px-4 py-2 rounded-md bg-accepted text-accepted-foreground">
					Accepted
				</p>
			);
		case "rejected":
			return (
				<p className="px-4 py-2 rounded-md bg-rejected text-rejected-foreground">
					Rejected
				</p>
			);
	}
}

const JobCard = ({ job }: { job: JobDataType }) => {
	return (
		<Link href={`/job/${job.id}`}>
			<Card className="hover:scale-105 transition-all duration-[250ms] ease-in-out">
				<CardHeader>
					<CardTitle className="text-2xl">{job.position}</CardTitle>
				</CardHeader>
				<CardContent className="text-sm text-muted-foreground space-y-1">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<Building2 size={ICONSIZE} />
							<p>{job.company}</p>
						</div>

						<div className="size-1 rounded-full bg-muted-foreground" />
						{displayJobType(job.jobType)}
					</div>
					<div className="flex items-center gap-2">
						<CircleDollarSignIcon size={ICONSIZE} />
						<p>
							${job.pay} / {job.payType === "hourly" ? "hour" : "year"}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<MapPin size={ICONSIZE} />
						<p>{job.location}</p>
					</div>
				</CardContent>
				<CardFooter className="flex items-center justify-between gap-2 mt-4">
					<div className="text-xs">{displayApplicationStatus(job.status)}</div>
					<div className="flex items-center gap-2">
						<Calendar size={ICONSIZE} />
						<p className="text-xs">
							{dayjs(job.appliedDate).format("MMM D, YYYY")}
						</p>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default JobCard;
