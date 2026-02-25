export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function formatPostDateForDisplay(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function parsePostDateToDate(value: unknown): Date {
	if (value instanceof Date) return value;
	if (typeof value !== "string") return new Date(String(value));

	const s = value.trim();
	const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
	if (dateOnly) {
		const y = Number(dateOnly[1]);
		const m = Number(dateOnly[2]);
		const d = Number(dateOnly[3]);
		return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
	}

	const localNoZone =
		/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(s);
	if (localNoZone) {
		const y = Number(localNoZone[1]);
		const m = Number(localNoZone[2]);
		const d = Number(localNoZone[3]);
		const hh = Number(localNoZone[4]);
		const mm = Number(localNoZone[5]);
		const ss = Number(localNoZone[6] ?? "0");
		return new Date(Date.UTC(y, m - 1, d, hh - 8, mm, ss));
	}

	return new Date(s);
}
