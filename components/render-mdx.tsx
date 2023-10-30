import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { InfoIcon, FlameIcon, AlertCircleIcon, SkullIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const CustomLink = (props: any) => {
    const href = props.href;

    if (href.startsWith('/')) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        );
    }

    if (href.startsWith('#')) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: any) {
    return (
        <div className="flex justify-center">
            <Image alt={props.alt} className="rounded-lg" {...props} />
        </div>
    );
}

const calloutTypeMappings = {
    tip: {
        border: 'border-green-400',
        background: 'bg-green-400/40',
        text: 'text-green-200'
    },
    warn: {
        border: 'border-yellow-400',
        background: 'bg-yellow-400/40',
        text: 'text-yellow-200'
    },
    error: {
        border: 'border-red-400',
        background: 'bg-red-400/40',
        text: 'text-red-200'
    },
    info: {
        border: 'border-blue-400',
        background: 'bg-blue-400/40',
        text: 'text-blue-200'
    }
};

interface Props {
    type: keyof typeof calloutTypeMappings;
}

function Callout({ type, children }: PropsWithChildren<Props>) {
    const typeMapping = calloutTypeMappings[type];

    return (
        <div className={cn('my-8 rounded border', typeMapping.border)}>
            <span
                className={cn(
                    'flex items-center gap-3 p-3',
                    typeMapping.background,
                    typeMapping.text
                )}
            >
                {type === 'tip' && <FlameIcon className="text-green-500" />}
                {type === 'warn' && <AlertCircleIcon className="text-yellow-500" />}
                {type === 'error' && <SkullIcon className="text-rose-600" />}
                {type === 'info' && <InfoIcon className="text-sky-600" />}
                <span className="text-sm font-semibold capitalize">{type}</span>
            </span>
            <span className="block px-3 text-sm">{children}</span>
        </div>
    );
}

const components = {
    Image: RoundedImage,
    a: CustomLink,
    Callout
};

export function RenderMDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);

    return (
        <article className="prose-quoteless prose prose-invert">
            <Component components={components} />
        </article>
    );
}
