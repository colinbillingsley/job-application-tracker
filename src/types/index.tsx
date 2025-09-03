export interface NavLinkType {
	href: string;
	name: string;
	icon?: React.ReactNode;
	className?: string;
}

export type PayType = "hourly" | "salary";

export type JobType = "onsite" | "remote" | "hybrid";

export type ApplicationStatus =
	| "applied"
	| "under_review"
	| "interview"
	| "offered"
	| "accepted"
	| "rejected"
	| "hired";

export type JobFormData = {
	company: string;
	position: string;
	location: string;
	pay: number;
	pay_type: PayType;
	job_type: JobType;
	status: ApplicationStatus;
	date_applied: Date;
	notes: string;
	job_url: string;
};

export type JobDataType = {
	id: number;
	company: string;
	position: string;
	location: string;
	pay: number;
	payType: PayType;
	jobType: JobType;
	status: ApplicationStatus;
	appliedDate: Date;
	notes: string;
	job_url: string;
	updatedAt: Date;
	createdAt: Date;
};
