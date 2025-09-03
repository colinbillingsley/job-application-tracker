import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();

		console.log(body);

		const {
			company,
			position,
			location,
			pay,
			pay_type,
			job_type,
			status,
			date_applied,
			notes,
			job_url,
		} = body;

		if (
			!company ||
			!position ||
			!location ||
			!pay ||
			!pay_type ||
			!job_type ||
			!status ||
			!date_applied
		) {
			return NextResponse.json(
				{
					error: "Missing required fields: company, position, location, or pay",
				},
				{ status: 400 }
			);
		}

		const values = {
			company,
			position,
			location,
			pay: pay,
			payType: pay_type,
			jobType: job_type,
			status,
			notes: notes || null,
			job_url: job_url || null,
			userId: session.user.id,
			appliedDate: date_applied,
		};

		console.log("values", values);

		const created = await db.insert(jobs).values(values).returning();
		return NextResponse.json(created[0], { status: 201 });
	} catch (err) {
		console.error("Error creating job:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
