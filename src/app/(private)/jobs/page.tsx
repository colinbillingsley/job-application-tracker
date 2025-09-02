import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import JobsList from "./components/JobsList";

const Jobs = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}

	return (
		<PageContainer>
			<H1>Jobs</H1>
			<JobsList />
		</PageContainer>
	);
};

export default Jobs;
