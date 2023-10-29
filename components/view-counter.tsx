'use client';

import { useEffect } from 'react';

import { increment } from '../app/actions';

interface Props {
    views: number;
    slug: string;
}

export function ViewCounter({ views, slug }: Props) {
    useEffect(() => {
        increment(slug);
    }, [slug]);

    return <span className="text-sm text-neutral-400">{views} views</span>;
}
