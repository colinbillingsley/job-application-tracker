"use client";
import { SlideInFromLeft } from "@/components/motion/SlideInFromLeft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/server/users";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const RegisterForm = () => {
	const [formData, setFormData] = React.useState<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [formErrors, setFormErrors] = React.useState<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
		login: string;
	}>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		login: "",
	});
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();

	const resetErrors = () => {
		setFormErrors({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			login: "",
		});
	};

	const handleErrors = () => {
		const errors = {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			login: "",
		};
		if (!formData.name) {
			errors.name = "Name is required";
		}
		if (!formData.email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Email is invalid. Please include an '@' and a domain";
		}
		if (!formData.password) {
			errors.password = "Password is required";
		} else if (formData.password.length < 6) {
			errors.password = "Password must be at least 6 characters";
		}
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}
		setFormErrors(errors);
		console.log(errors);
		console.log(formData);
		return Object.values(errors).every((error) => error === "");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		resetErrors();
	};

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (!handleErrors()) return;
		setLoading(true);
		try {
			console.log("Registering user with data:", formData);
			await signUp(formData.email, formData.password, formData.name);
			toast("Registration successful!", {
				description: "You can now log in with your new account.",
			});
			router.push("/login");
		} catch (error) {
			console.error("Registration error:", error);
			setFormErrors((prev) => ({
				...prev,
				login:
					"Registration failed. Please check your credentials and try again.",
			}));
		} finally {
			setLoading(false);
		}
	}

	return (
		<SlideInFromLeft>
			<form className="container max-w-xl mx-auto space-y-6">
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Register with JobTracker</h2>
					<span className="text-muted-foreground text-sm">
						Create an account with JobTracker to keep track of all your applied
						jobs.
					</span>
				</div>

				<div className="space-y-4">
					<div className={`space-y-2`}>
						<Label
							htmlFor="name"
							className={`${formErrors.name ? "text-destructive" : ""}`}
						>
							Name
						</Label>
						<Input
							type="name"
							name="name"
							placeholder="Name"
							onChange={handleChange}
							className={`${formErrors.name ? "border-destructive" : ""}`}
						/>
						{formErrors.name && (
							<p className="text-sm text-red-500">{formErrors.name}</p>
						)}
					</div>
					<div className={`space-y-2`}>
						<Label
							htmlFor="email"
							className={`${formErrors.email ? "text-destructive" : ""}`}
						>
							Email
						</Label>
						<Input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							className={`${formErrors.email ? "border-destructive" : ""}`}
						/>
						{formErrors.email && (
							<p className="text-sm text-red-500">{formErrors.email}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="password"
							className={`${formErrors.password ? "text-destructive" : ""}`}
						>
							Password
						</Label>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							className={`${formErrors.password ? "border-destructive" : ""}`}
						/>
						{formErrors.password && (
							<p className="text-sm text-red-500">{formErrors.password}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="confirmPassword"
							className={`${
								formErrors.confirmPassword ? "text-destructive" : ""
							}`}
						>
							Confirm Password
						</Label>
						<Input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onChange={handleChange}
							className={`${
								formErrors.confirmPassword ? "border-destructive" : ""
							}`}
						/>
						{formErrors.confirmPassword && (
							<p className="text-sm text-red-500">
								{formErrors.confirmPassword}
							</p>
						)}
					</div>
				</div>

				{formErrors.login && (
					<p className="text-sm text-red-500">{formErrors.login}</p>
				)}

				<Button
					type="button"
					disabled={loading}
					size={"lg"}
					onClick={handleSubmit}
					className="w-full"
				>
					{loading ? (
						<div className="flex items-center gap-2">
							<Loader2 className="animate-spin" />
							<span>Registering...</span>
						</div>
					) : (
						"Register"
					)}
				</Button>

				<div className="flex items-center justify-end gap-2">
					<p>Already have an account?</p>
					<Link
						href="/login"
						className="group text-primary hover:underline font-bold flex items-center"
					>
						<span>Log in here</span>
						<ArrowRight
							size={16}
							className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
						/>
					</Link>
				</div>
			</form>
		</SlideInFromLeft>
	);
};

export default RegisterForm;
