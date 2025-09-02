import {
	integer,
	text,
	boolean,
	pgTable,
	serial,
	timestamp,
} from "drizzle-orm/pg-core";

const jobsStatusEnum = [
	"applied",
	"considered",
	"offered",
	"rejected",
] as const;
const jobsTypeEnum = ["onsite", "remote", "hybrid"] as const;
const interviewStatusEnum = [
	"scheduled",
	"occurred",
	"passed",
	"failed",
] as const;

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified")
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(
		() => /* @__PURE__ */ new Date()
	),
	updatedAt: timestamp("updated_at").$defaultFn(
		() => /* @__PURE__ */ new Date()
	),
});

const jobs = pgTable("jobs", {
	id: serial("id").primaryKey(),
	company: text("company").notNull(),
	position: text("position").notNull(),
	location: text("location").notNull(),
	type: text("type")
		.notNull()
		.default("onsite")
		.$type<(typeof jobsTypeEnum)[number]>(),
	status: text("status")
		.notNull()
		.default("applied")
		.$type<(typeof jobsStatusEnum)[number]>(),
	appliedDate: text("date_applied").notNull(),
	notes: text("notes"),
	job_url: text("job_url"),

	userId: integer("user_id")
		.notNull()
		.references(() => user.id),

	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

const interviews = pgTable("interviews", {
	id: serial("id").primaryKey(),
	contact_email: text("contact_email").notNull(),
	contact_name: text("contact_name").notNull(),
	status: text("status")
		.notNull()
		.default("scheduled")
		.$type<(typeof interviewStatusEnum)[number]>(),
	date_scheduled: timestamp("scheduled_date").notNull(),
	notes: text("notes"),

	userId: integer("user_id")
		.notNull()
		.references(() => user.id),
	jobId: integer("job_id")
		.notNull()
		.references(() => jobs.id),

	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});
