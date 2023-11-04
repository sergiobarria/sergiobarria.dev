const { WAKATIME_USER, WAKATIME_API_KEY } = import.meta.env;

interface WakaAllTime {
    best_day: {
        id: string;
        date: string;
        text: string;
        total_seconds: string;
    };
    daily_average: string;
    human_readable_daily_average: string;
    human_readable_range: string;
    since: string;
    languages: {
        name: string;
        percent: string;
        text: string;
        total_seconds: string;
    }[];
    operating_systems: {
        name: string;
    }[];
}

interface AlltimeSinceToday {
    total_seconds: number;
    text: string;
    decimal: string;
    digital: string;
    is_up_to_date: boolean;
    percent_calculated: number;
    range: {
        start: string;
        start_date: string;
        start_text: string;
        end: string;
        end_date: string;
        end_text: string;
        timezone: string;
    };
    timeout: number;
}

export async function getFavoriteLanguages() {
    const res = await fetch(
        `https://wakatime.com/api/v1/users/${WAKATIME_USER}/stats/all_time?api_key=${WAKATIME_API_KEY}`
    );

    if (!res.ok) throw new Error('Failed to fetch Wakatime stats');
    const { data }: { data: WakaAllTime } = await res.json();

    return data?.languages?.slice(0, 3);
}
