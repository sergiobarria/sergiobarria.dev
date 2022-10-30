import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

const icons = {
	info: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
			/>
		</svg>
	),
	warn: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
			/>
		</svg>
	),
	error: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
			/>
		</svg>
	),
	tip: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
			/>
		</svg>
	),
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
		fire: icons['tip'],
	};

	const getBoxIcon = (type: string): JSX.Element => {
		return iconType[type as keyof typeof iconType];
	};

	return (
		<div
			className={clsx('relative my-6 rounded-md border-2 p-4', {
				'border-green-500 text-green-500': type === 'tip',
				'border-blue-500 text-blue-500': type === 'info',
				'border-yellow-500 text-yellow-500': type === 'warn',
				'border-red-500 text-red-500': type === 'error',
			})}
		>
			<div
				className={clsx(
					'absolute -top-3 left-3 flex items-center space-x-2 px-4 py-[2px] text-sm rounded-md',
					{
						'bg-green-500 text-white': type === 'tip',
						'bg-blue-500 text-white': type === 'info',
						'bg-yellow-500 text-white': type === 'warn',
						'bg-red-500 text-white': type === 'error',
					}
				)}
			>
				{getBoxIcon(type)}
				<span className="capitalize">{type === 'warn' ? 'Warning' : type}</span>
			</div>
			<div className="text-gray-700 dark:text-gray-300 prose-p:mb-0">{children}</div>
		</div>
	);
}
