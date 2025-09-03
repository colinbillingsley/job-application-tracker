"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "./DatePicker";
import StatusSelector from "./StatusSelector";
import JobTypeRadio from "./JobTypeRadio";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { JobFormData } from "@/types";
import { useCreateJob } from "@/hooks/useCreateJob";

const NewJobForm = () => {
	const [formData, setFormData] = useState<JobFormData>({
		company: "",
		position: "",
		location: "",
		pay: 0,
		pay_type: "hourly",
		job_type: "onsite",
		status: "applied",
		date_applied: new Date(),
		notes: "",
		job_url: "",
	});
	const [formErrors, setFormErrors] = useState<{
		company: string;
		position: string;
		location: string;
		pay: string;
		job_type: string;
		status: string;
		date_applied: string;
		notes: string;
		job_url: string;
		creation: string;
	}>({
		company: "",
		position: "",
		location: "",
		pay: "",
		job_type: "",
		status: "",
		date_applied: "",
		notes: "",
		job_url: "",
		creation: "",
	});

	const router = useRouter();
	const { mutate: createJob, isPending } = useCreateJob();

	function resetErrors() {
		setFormErrors({
			company: "",
			position: "",
			location: "",
			pay: "",
			job_type: "",
			status: "",
			date_applied: "",
			notes: "",
			job_url: "",
			creation: "",
		});
	}

	function handleErrors() {
		const errors = {
			company: "",
			position: "",
			location: "",
			pay: "",
			job_type: "",
			status: "",
			date_applied: "",
			notes: "",
			job_url: "",
			creation: "",
		};
		if (!formData.company) {
			errors.company = "Company is required";
		}
		if (!formData.position) {
			errors.position = "Position is required";
		}
		if (!formData.location) {
			errors.location = "Location is required";
		}
		if (!formData.pay) {
			errors.pay = "Pay is required";
		} else if (formData.pay < 0) {
			errors.pay = "Pay must be a nonnegative number";
		}
		if (!formData.job_type) {
			errors.job_type = "Type is required";
		}
		if (!formData.status) {
			errors.status = "Status is required";
		}
		if (!formData.date_applied) {
			errors.date_applied = "Date applied is required";
		}
		if (!formData.position) {
			errors.position = "Position is required";
		}
		setFormErrors(errors);
		return Object.values(errors).every((error) => error === "");
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		resetErrors();
	}

	// TODO
	function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		resetErrors();
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (!handleErrors()) return;
		console.log("Creating job with data:", formData);
		createJob(formData, {
			onSuccess: () => {
				toast("Job created!", {
					description: "You can now keep track of it, and stay up-to-date!",
				});
				router.push("/jobs");
			},
			onError: (err) => {
				console.error("Job creation failed:", err);
				setFormErrors((prev) => ({
					...prev,
					creation:
						"Job creation failed. Something failed trying to create a job.",
				}));
			},
		});
	}

	return (
		<form className="container max-w-xl mx-auto space-y-6">
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">Create a new job</h2>
				<span className="text-muted-foreground text-sm">
					Fill out the form below to add a new job to your tracker.
				</span>
			</div>

			<div className="space-y-4">
				<div className={`space-y-2`}>
					<Label
						htmlFor="company"
						className={`${formErrors.company ? "text-destructive" : ""}`}
					>
						Company
					</Label>
					<Input
						type="input"
						name="company"
						placeholder="Company"
						onChange={handleInputChange}
						className={`${formErrors.company ? "border-destructive" : ""}`}
					/>
					{formErrors.company && (
						<p className="text-sm text-red-500">{formErrors.company}</p>
					)}
				</div>

				<div className={`space-y-2`}>
					<Label
						htmlFor="position"
						className={`${formErrors.position ? "text-destructive" : ""}`}
					>
						Position
					</Label>
					<Input
						type="input"
						name="position"
						placeholder="Position"
						onChange={handleInputChange}
						className={`${formErrors.position ? "border-destructive" : ""}`}
					/>
					{formErrors.position && (
						<p className="text-sm text-red-500">{formErrors.position}</p>
					)}
				</div>

				<div className={`space-y-2`}>
					<Label
						htmlFor="location"
						className={`${formErrors.location ? "text-destructive" : ""}`}
					>
						Location
					</Label>
					<Input
						type="input"
						name="location"
						placeholder="Location"
						onChange={handleInputChange}
						className={`${formErrors.location ? "border-destructive" : ""}`}
					/>
					{formErrors.location && (
						<p className="text-sm text-red-500">{formErrors.location}</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-end gap-2 w-full">
						<div className="space-y-2 w-full">
							<Label
								htmlFor="pay"
								className={`${formErrors.pay ? "text-destructive" : ""}`}
							>
								Pay
							</Label>
							<Input
								type="number"
								name="pay"
								placeholder="Pay"
								onChange={handleInputChange}
								className={`${formErrors.pay ? "border-destructive" : ""}`}
							/>
						</div>

						<RadioGroup
							value={formData.pay_type}
							onValueChange={(val: JobFormData["pay_type"]) =>
								setFormData((prev) => ({
									...prev,
									pay_type: val,
								}))
							}
							className={`flex flex-col gap-2`}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="hourly" id="hourly" />
								<Label htmlFor="hourly">Hourly</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="salary" id="salary" />
								<Label htmlFor="salary">Salary</Label>
							</div>
						</RadioGroup>
					</div>
					{formErrors.pay && (
						<p className="text-sm text-red-500">{formErrors.pay}</p>
					)}
				</div>

				<div className="my-8">
					<JobTypeRadio
						value={formData.job_type}
						onChange={(val: JobFormData["job_type"]) =>
							setFormData((prev) => ({
								...prev,
								job_type: val,
							}))
						}
						error={formErrors.job_type}
					/>
				</div>

				<div className="flex flex-col sm:flex-row items-start gap-4">
					<StatusSelector
						value={formData.status}
						onChange={(val: JobFormData["status"]) =>
							setFormData((prev) => ({
								...prev,
								status: val,
							}))
						}
						error={formErrors.status}
					/>

					<DatePicker
						value={formData.date_applied}
						onChange={(date) =>
							setFormData((prev) => ({ ...prev, date_applied: date }))
						}
					/>
				</div>

				<div className={`space-y-2`}>
					<Label
						htmlFor="notes"
						className={`${formErrors.notes ? "text-destructive" : ""}`}
					>
						Notes
					</Label>
					<Textarea
						name="notes"
						placeholder="Type any notes here."
						onChange={handleTextareaChange}
					/>
				</div>
			</div>

			<div className={`space-y-2`}>
				<Label
					htmlFor="job_url"
					className={`${formErrors.job_url ? "text-destructive" : ""}`}
				>
					Job URL
				</Label>
				<Input
					type="input"
					name="job_url"
					placeholder="Job URL"
					onChange={handleInputChange}
					className={`${formErrors.job_url ? "border-destructive" : ""}`}
				/>
				{formErrors.job_url && (
					<p className="text-sm text-red-500">{formErrors.job_url}</p>
				)}
			</div>

			{formErrors.creation && (
				<p className="text-sm text-red-500">{formErrors.creation}</p>
			)}

			<div className="flex items-center justify-end gap-4">
				<Link href={"/jobs"}>
					<Button type="button" variant={"outline"} size={"lg"}>
						Cancel
					</Button>
				</Link>
				<Button
					type="submit"
					disabled={isPending}
					size={"lg"}
					onClick={handleSubmit}
				>
					{isPending ? (
						<div className="flex items-center gap-2">
							<Loader2 className="animate-spin" />
							<span>Creating job...</span>
						</div>
					) : (
						"Create Job"
					)}
				</Button>
			</div>
		</form>
	);
};

export default NewJobForm;
