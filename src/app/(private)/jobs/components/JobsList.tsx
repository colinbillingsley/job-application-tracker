// Move useQuery to a client component
"use client";
import { Button } from "@/components/ui/button";
import { JobDataType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Frown, Loader2 } from "lucide-react";
import Link from "next/link";
import JobCard from "./JobCard";
import { StaggeredList } from "@/components/motion/StaggerdList";

const JobsList = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const res = await axios.get("http://localhost:3000/api/jobs");
			if (res.status < 200 || res.status >= 300)
				throw new Error("Failed to fetch jobs");
			console.log(res.data);
			return res.data;
		},
	});

	if (isLoading)
		return (
			<div className="w-full h-[30rem] flex items-center justify-center bg-muted my-8">
				<div className="flex flex-col items-center justify-center space-y-2">
					<Loader2 strokeWidth={1.5} className="animate-spin size-14" />
					<p className="text-xl">Loading...</p>
				</div>
			</div>
		);
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<>
			{data && data.length === 0 ? (
				<div className="w-full h-[30rem] flex items-center justify-center bg-muted my-8">
					<div className="text-center space-y-2">
						<p className="flex items-center gap-2">
							No jobs have been added <Frown strokeWidth={1.25} />
						</p>
						<Link href={"/jobs/new"} className="hover:cursor-pointer">
							<Button size={"lg"}>Add Job +</Button>
						</Link>
					</div>
				</div>
			) : (
				<StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{data.map((job: JobDataType, index: number) => (
						<JobCard key={`${job.company}-${index}`} job={job} />
					))}
				</StaggeredList>
			)}
		</>
	);
};

export default JobsList;
