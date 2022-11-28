import type { ReactNode } from 'react';
import clsx from 'clsx';
import {
	ExclamationTriangleIcon,
	InfoCircledIcon,
	CheckCircledIcon,
	CircleBackslashIcon,
} from '@radix-ui/react-icons';

const icons = {
	info: <InfoCircledIcon width={22} height={22} />,
	warn: <ExclamationTriangleIcon width={22} height={22} />,
	error: <CircleBackslashIcon width={22} height={22} />,
	tip: <CheckCircledIcon width={22} height={22} />,
};

type BoxType = 'info' | 'warn' | 'error' | 'tip';

interface CalloutBoxProps {
	type: BoxType;
	children: ReactNode;
}

export function CalloutBox({ type = 'tip', children }: CalloutBoxProps): JSX.Element {
	const iconType = {
		info: icons['info'],
		warn: icons['warn'],
		error: icons['error'],
		tip: icons['tip'],
	};

	const getBoxIcon = (type: string): JSX.Element => {
		return iconType[type as keyof typeof iconType];
	};

	return (
		<div
			className={clsx('relative my-5 rounded-lg px-5', {
				'bg-green-500/30 border-2 border-green-500': type === 'tip',
				'bg-blue-500/30 border-2 border-blue-500': type === 'info',
				'bg-yellow-500/30 border-2 border-yellow-500': type === 'warn',
				'bg-red-500/30 border-2 border-red-500': type === 'error',
			})}
		>
			<div
				className={clsx(
					'absolute -top-4 -left-4 flex items-center justify-center',
					'p-2 bg-surface-one rounded-full'
				)}
			>
				<span
					className={clsx({
						'text-green-500': type === 'tip',
						'text-blue-500': type === 'info',
						'text-yellow-500': type === 'warn',
						'text-red-500': type === 'error',
					})}
				>
					{getBoxIcon(type)}
				</span>
			</div>
			<div className="text-sm">{children}</div>
		</div>
	);
}
