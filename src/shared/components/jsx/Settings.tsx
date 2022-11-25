import { Fragment, forwardRef, useState } from 'react';
import clsx from 'clsx';

import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import { GearIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons';

import { Tooltip } from './Tooltip';

export const SelectItem = forwardRef<
	HTMLDivElement,
	Select.SelectItemProps & React.RefAttributes<HTMLDivElement>
>(({ children, className, ...props }, forwardedRef) => {
	console.log('props', props);
	console.log('forwardedRef', forwardedRef);
	return (
		<Select.Item
			className={clsx(
				'flex items-center text-xs text-font-two h-[2rem]',
				'pl-6 pr-4 relative select-none [&:not(:last-of-type)]:border-b border-surface-three',
				'data-[disabled]:text-pink-400 data-[disabled]:pointer-events-none',
				'data-[highlighted]:outline-none data-[highlighted]:bg-brand-accent',
				'data-[highlighted]:text-selection data-[highlighted]:rounded-md',
				className
			)}
			{...props}
			ref={forwardedRef}
		>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
				<CheckIcon />
			</Select.ItemIndicator>
		</Select.Item>
	);
});

export function ThemeSelect() {
	const [theme, setTheme] = useState(localStorage.getItem('theme-preference') ?? 'night');

	const handleThemeChange = (value: string) => {
		const doc = document.firstElementChild;

		doc?.setAttribute('data-theme', value);
		setTheme(value);
		localStorage.setItem('theme-preference', value);
	};

	return (
		<Select.Root value={theme} onValueChange={(value) => handleThemeChange(value)}>
			<Select.Trigger
				className={clsx(
					'inline-flex items-center justify-center rounded-md px-4',
					'h-[2rem] gap-2 bg-surface-four text-brand-accent shadow-md',
					'transition-all duration-200 ease-in-out hover:opacity-90',
					'hover:shadow-lg transform hover:scale-105 focus:shadow-lg',
					'data-[placeholder]:text-brand/80'
				)}
				aria-label="themes"
			>
				<Select.Value />
				<Select.Icon className="text-brand">
					<ChevronDownIcon />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className="overflow-hidden bg-surface-four rounded-md shadow-md">
					<Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-brand cursor-default">
						<ChevronUpIcon />
					</Select.ScrollUpButton>
					<Select.Viewport className="p-2">
						<Select.Group>
							<SelectItem value="night">Night</SelectItem>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="night-owl">Night-Owl</SelectItem>
							<SelectItem value="grape">Grape</SelectItem>
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-brand cursor-default">
						<ChevronDownIcon />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}

export function Settings() {
	return (
		<Fragment>
			<Popover.Root>
				<Tooltip content="Settings">
					<Popover.Trigger
						className={clsx(
							'outline outline-1 outline-brand bg-surface-one rounded-full p-2',
							'transition-all duration-200 ease-in-out',
							'hover:bg-surface-two hover:outline-2 hover:motion-safe:animate-spin'
						)}
					>
						<GearIcon width={24} height={24} />
					</Popover.Trigger>
				</Tooltip>

				<Popover.Portal>
					<Popover.Content
						className={clsx(
							'bg-surface-two rounded-md px-6 py-4 shadow-md w-[70vw] md:w-[250px]',
							'data-[state=open]:fade-in duration-200 ease-in',
							'data-[state=closed]:fade-out duration-200 ease-out'
						)}
					>
						<span className="block text-xl font-semibold mb-3">Preferences</span>
						<div>
							<div
								className={clsx(
									'flex items-center justify-between py-4 border-b',
									'border-surface-four [&:first-child]:border-t'
								)}
							>
								<span>Theme</span>
								<ThemeSelect />
							</div>
						</div>
						<Popover.Arrow className="fill-surface-three border-none stroke-none" />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</Fragment>
	);
}
