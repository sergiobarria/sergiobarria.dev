import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Popover, Listbox, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

import { GearIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons';

const themes = [
	{ id: 1, label: 'Night', value: 'night' },
	{ id: 2, label: 'Light', value: 'light' },
	{ id: 3, label: 'Night Owl', value: 'night-owl' },
	{ id: 4, label: 'Grape', value: 'grape' },
];

function ThemeSelect() {
	const [theme, setTheme] = useState(localStorage.getItem('theme-preference') ?? 'night');

	const handleThemeChange = (value: string) => {
		const doc = document.firstElementChild;

		doc?.setAttribute('data-theme', value);
		setTheme(value);
		localStorage.setItem('theme-preference', value);
	};

	const formatThemeLabel = (value: string) => {
		return value.split('-').join(' ');
	};

	return (
		<Listbox value={formatThemeLabel(theme)} onChange={handleThemeChange}>
			<Listbox.Button
				className={clsx(
					'relative flex items-center justify-between rounded-md px-4',
					'h-[2rem] gap-2 bg-surface-four text-brand-accent shadow-md',
					'transition-all duration-200 ease-in-out hover:opacity-90',
					'hover:shadow-lg transform hover:scale-105 focus:shadow-lg'
				)}
			>
				{theme}
				<ChevronDownIcon />
			</Listbox.Button>
			<Transition
				as={Fragment}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Listbox.Options
					className={clsx(
						'absolute top-10 right-0 mt-2 w-32 origin-top-right divide-y divide-surface-four',
						'rounded-md bg-surface-three shadow-lg focus:outline-none'
					)}
				>
					{themes.map((theme) => (
						<Listbox.Option key={theme.id} value={theme.value} as={Fragment}>
							{({ active, selected }) => (
								<li
									className={clsx(
										'capitalize inline-flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm',
										'cursor-pointer focus:outline-none focus:ring-0',
										active && 'bg-brand-accent text-selection',
										selected && 'text-brand-accent'
									)}
								>
									{selected && <CheckIcon />}
									{formatThemeLabel(theme.value)}
								</li>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
}

export function Settings() {
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [arrowElement, setArrowElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: 'bottom-end',
		modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
	});

	return (
		<Popover className="relative">
			<Popover.Button
				ref={setReferenceElement as any}
				className={clsx(
					'outline outline-1 outline-brand bg-surface-one rounded-full p-2',
					'transition-all duration-200 ease-in-out',
					'hover:bg-surface-two hover:outline-2 hover:motion-safe:animate-spin'
				)}
			>
				<GearIcon width={24} height={24} />
			</Popover.Button>

			<Transition
				as={Fragment}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel
					ref={setPopperElement as any}
					style={styles.popper}
					{...attributes.popper}
					className={clsx('bg-surface-two rounded-md px-6 py-4 shadow-md w-[70vw] md:w-[250px]')}
				>
					<span className="block text-xl font-semibold mb-3">Preferences</span>
					<div>
						<div
							className={clsx(
								'relative flex items-center justify-between py-4 border-b',
								'border-surface-four [&:first-child]:border-t'
							)}
						>
							<span>Theme</span>
							<ThemeSelect />
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
