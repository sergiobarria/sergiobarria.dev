import type { ReactNode } from 'react';
import clsx from 'clsx';
import {
	ExclamationTriangleIcon,
	InfoCircledIcon,
	CheckCircledIcon,
	CircleBackslashIcon,
} from '@radix-ui/react-icons';

import styles from './CalloutBox.module.scss';

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
			className={clsx(styles.callout, {
				[styles.tip]: type === 'tip',
				[styles.info]: type === 'info',
				[styles.warn]: type === 'warn',
				[styles.error]: type === 'error',
			})}
		>
			<div className={clsx(styles.icon)}>
				<span>{getBoxIcon(type)}</span>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
