import config from '@/config'

const { apiKey, username } = config.wakatime

interface WakatimeAllTime {
    best_day: {
        id: string
        date: string
        text: string
        total_seconds: string
    }
    daily_average: string
    human_readable_daily_average: string
    human_readable_range: string
    since: string
    languages: {
        name: string
        percent: string
        text: string
        total_seconds: string
    }[]
    operating_systems: {
        name: string
    }[]
}

interface Wakatime {
    decimal: string
    digital: string
    is_up_to_date: boolean
    percent_calculated: number
    range: {
        end: string
        end_date: string
        end_text: string
        start: string
        start_date: string
        start_text: string
        timezone: string
    }
    text: string
    timeout: number
    total_seconds: number
}

export const getWakaAllTimeStats = async () => {
    const res = await fetch(
        `https://wakatime.com/api/v1/users/${username}/stats/all_time?api_key=${apiKey}`
    )

    if (!res.ok) throw new Error('Failed to fetch WakaTime stats')
    const { data }: { data: WakatimeAllTime } = await res.json()

    return {
        bestDay: data?.best_day,
        dailyAvg: data?.human_readable_daily_average,
        since: data?.human_readable_range,
        topLang: data?.languages[0],
        otherLang: data?.languages[1],
        os: data?.operating_systems[0]
    }
}

export const getWakaStats = async () => {
    const res = await fetch(
        `https://wakatime.com/api/v1/users/${username}/all_time_since_today?api_key=${apiKey}`
    )

    if (!res.ok) throw new Error('Failed to fetch WakaTime stats')
    const { data }: { data: Wakatime } = await res.json()

    return data
}
