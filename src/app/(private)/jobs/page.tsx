import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import JobsList from "./components/JobsList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Jobs = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}

	return (
		<PageContainer className="space-y-4">
			<H1>Jobs</H1>
			<Link href={"/jobs/new"} className="hover:cursor-pointer">
				<Button size={"lg"}>Add Job +</Button>
			</Link>
			<JobsList />
		</PageContainer>
	);
};

export default Jobs;
