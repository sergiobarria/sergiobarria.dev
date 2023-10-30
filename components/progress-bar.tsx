'use client';

import { useEffect } from 'react';
import { scroll, animate } from 'motion';

export function ProgressBar() {
    useEffect(() => {
        scroll(animate('#progress-bar', { scale: [0, 1] }));
    }, []);

    return (
        <div
            id="progress-bar"
            className="fixed inset-x-0 top-0 h-1 origin-[0%] scale-x-0 transform bg-neutral-200"
        ></div>
    );
}
