"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	value: Date;
	onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="space-y-2 w-full">
			<Label htmlFor="date_applied">Date Applied</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal"
					>
						{value ? value.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={value}
						captionLayout="dropdown"
						onSelect={(date) => {
							if (date) onChange(date); // update parent form
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
