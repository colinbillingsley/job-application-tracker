"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutButton = () => {
	const router = useRouter();

	async function handleSignOut() {
		await authClient.signOut();
		router.push("/login");
	}
	return (
		<Button className="py-4 px-3" onClick={handleSignOut}>
			SignOut
		</Button>
	);
};

export default SignOutButton;
