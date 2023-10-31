'use client';

import { useEffect } from 'react';

import { increment } from '../app/actions';

interface Props {
    views: number;
    slug: string;
    track?: boolean;
}

export function ViewCounter({ views, slug, track = false }: Props) {
    useEffect(() => {
        if (track) increment(slug);
    }, [slug, track]);

    return <span className="text-sm text-neutral-400">{views} views</span>;
}
