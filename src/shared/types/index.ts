export interface Wakatime {
	decimal: string;
	digital: string;
	is_up_to_date: boolean;
	percent_calculated: number;
	range: {
		end: string;
		end_date: string;
		end_text: string;
		start: string;
		start_date: string;
		start_text: string;
		timezone: string;
	};
	text: string;
	timeout: number;
	total_seconds: number;
}

export interface WakatimeAllTime {
	bestDay: {
		id: string;
		date: string;
		text: string;
		total_seconds: string;
	};
	dailyAvg: string;
	since: string;
	topLang: {
		name: string;
		percent: string;
		text: string;
		total_seconds: string;
	};
	otherLang: {
		name: string;
		percent: string;
		text: string;
		total_seconds: string;
	};
	os: {
		name: string;
	};
}
