import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs))
}

export function formatDate(date: Date | undefined) {
    if (!date) return ''

    return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date)
}
