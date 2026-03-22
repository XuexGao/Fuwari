import fs from "node:fs";
import path from "node:path";
import type { ParsedTimetableData } from "@/types/timetable";
import { parseTimetableText } from "@/utils/timetable-parser";

export function parseTimetableFile(filePath: string): ParsedTimetableData {
	const absolutePath = path.isAbsolute(filePath)
		? filePath
		: path.join(process.cwd(), filePath);
	const rawText = fs.readFileSync(absolutePath, "utf-8");
	return parseTimetableText(rawText);
}
