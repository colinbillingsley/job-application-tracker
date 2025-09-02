import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import PageContainer from "@/components/ui/PageContainer";
import H1 from "@/components/ui/H1";

const Dashboard = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}

	const todaysDate = dayjs(new Date()).format("dddd, MMMM D");

	return (
		<PageContainer>
			<span className="font-bold text-xl">{todaysDate}</span>
			<H1 className="font-black text-3xl">
				Welcome back {session?.user?.name || "No User"}
			</H1>
		</PageContainer>
	);
};

export default Dashboard;
