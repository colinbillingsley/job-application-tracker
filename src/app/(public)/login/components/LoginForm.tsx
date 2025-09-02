"use client";
import { SlideInFromLeft } from "@/components/motion/SlideInFromLeft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/server/users";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LoginForm = () => {
	const [formData, setFormData] = React.useState<{
		email: string;
		password: string;
	}>({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = React.useState<{
		email: string;
		password: string;
		login: string;
	}>({
		email: "",
		password: "",
		login: "",
	});
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();

	const resetErrors = () => {
		setFormErrors({
			email: "",
			password: "",
			login: "",
		});
	};

	const handleErrors = () => {
		const errors = {
			email: "",
			password: "",
			login: "",
		};
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
			console.log("Logging user with data:", formData);
			await signIn(formData.email, formData.password);
			toast("Login successful!", {
				description: "Welcome back! You have been logged in.",
			});
			router.push("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
			setFormErrors((prev) => ({
				...prev,
				login: "Login failed. Please check your credentials and try again.",
			}));
		} finally {
			setLoading(false);
		}
	}

	return (
		<SlideInFromLeft>
			<form className="container max-w-xl mx-auto space-y-6">
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Login with JobTracker</h2>
					<span className="text-muted-foreground text-sm">
						Log in to your account with JobTracker to keep track of all your
						applied jobs.
					</span>
				</div>

				<div className="space-y-4">
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
							<span>Logging in...</span>
						</div>
					) : (
						"Login"
					)}
				</Button>

				<div className="flex items-center justify-end gap-2">
					<p>Don&apos;t have an account?</p>
					<Link
						href="/register"
						className="group text-primary hover:underline font-bold flex items-center"
					>
						<span>Register here</span>
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

export default LoginForm;
