import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		// authenticate via better auth
		const session = await auth.api.getSession({ headers: req.headers });
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user.id;

		const userJobs = await db
			.select()
			.from(jobs)
			.where(eq(jobs.userId, userId))
			.orderBy(jobs.createdAt);

		return NextResponse.json(userJobs, { status: 200 });
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
