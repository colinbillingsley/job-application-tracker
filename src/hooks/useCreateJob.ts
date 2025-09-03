// hooks/useCreateJob.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { JobFormData } from "@/types";

export function useCreateJob() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newJob: JobFormData) => {
			const res = await axios.post(
				"http://localhost:3000/api/jobs/new",
				newJob
			);
			return res.data;
		},
		onSuccess: () => {
			// invalidate jobs list so it refetches
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
	});
}
