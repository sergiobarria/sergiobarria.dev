import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Type = 'info' | 'warn' | 'error' | 'tip';

interface CalloutBoxProps {
	type: Type;
}

export function CalloutBox({ type, children }: PropsWithChildren<CalloutBoxProps>) {
	return (
		<div
			className={clsx('p-3 rounded-xl my-5 [&_p]:my-4', {
				'border-b border-green-400 text-green-200 bg-green-400/20': type === 'tip',
				'border-b border-yellow-400 text-yellow-200 bg-yellow-400/20': type === 'warn',
				'border-b border-red-400 text-red-200 bg-red-400/20': type === 'error',
				'border-b border-blue-400 text-blue-200 bg-blue-400/20': type === 'info',
			})}
		>
			{children}
		</div>
	);
}
