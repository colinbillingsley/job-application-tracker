import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import React from "react";
import NewJobForm from "./components/NewJobForm";

const NewJob = () => {
	return (
		<PageContainer>
			<H1>New Job</H1>
			<NewJobForm />
		</PageContainer>
	);
};

export default NewJob;
