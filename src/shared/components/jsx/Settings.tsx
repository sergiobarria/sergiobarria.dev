import { Fragment, forwardRef, useState } from 'react';
import clsx from 'clsx';

import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import { GearIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons';

import { Tooltip } from './Tooltip';

import styles from './Settings.module.scss';

export const SelectItem = forwardRef<
	HTMLDivElement,
	Select.SelectItemProps & React.RefAttributes<HTMLDivElement>
>(({ children, className, ...props }, forwardedRef) => {
	return (
		<Select.Item className={clsx(styles.selectItem, className)} {...props} ref={forwardedRef}>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className={styles.selectItemIndicator}>
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
			<Select.Trigger className={styles.selectTrigger} aria-label="themes">
				<Select.Value />
				<Select.Icon className={styles.selectIcon}>
					<ChevronDownIcon />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className={styles.selectContent}>
					<Select.ScrollUpButton className={styles.selectScrollButton}>
						<ChevronUpIcon />
					</Select.ScrollUpButton>
					<Select.Viewport className={styles.selectViewport}>
						<Select.Group>
							<SelectItem value="night">Night</SelectItem>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="night-owl">Night-Owl</SelectItem>
							<SelectItem value="purple">Purple</SelectItem>
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className={styles.selectScrollButton}>
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
					<Popover.Trigger className={styles.trigger}>
						<GearIcon width={24} height={24} />
					</Popover.Trigger>
				</Tooltip>

				<Popover.Portal>
					<Popover.Content className={styles.preferences}>
						<span>Preferences</span>
						<div className={styles.preferenceBlock}>
							<div className={styles.preferenceItem}>
								<span>Theme</span>
								<ThemeSelect />
							</div>
						</div>
						<Popover.Arrow className={styles.arrow} />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</Fragment>
	);
}
