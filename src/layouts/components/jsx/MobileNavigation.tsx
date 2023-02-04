import clsx from 'clsx';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, Cross1Icon } from '@radix-ui/react-icons';

import { navLinks } from '../../../../site.json';

interface NavLinkProps {
	href: string;
	label: string;
	pathname: string;
}

function NavLink({ href, label, pathname }: NavLinkProps) {
	return (
		<li>
			<Popover.Button
				as="a"
				href={href}
				className={clsx('block text-zinc-800 dark:text-zinc-100 py-2', {
					'font-medium text-teal-500 dark:text-teal-500': pathname === href,
				})}
			>
				{label}
			</Popover.Button>
		</li>
	);
}

interface MobileNavigationProps {
	pathname: string;
}

export function MobileNavigation({ pathname }: MobileNavigationProps) {
	const links = [{ id: 99, label: 'Home', href: '/', number: 0 }, ...navLinks];

	return (
		<Popover className="relative mr-3 md:hidden">
			<Popover.Button
				className={clsx(
					'flex items-center px-4 py-2 gap-3 rounded-full group bg-white/90 text-zinc-800',
					'shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90',
					'dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 outline-none'
				)}
			>
				<span className="text-sm">Menu</span>
				<ChevronDownIcon className="w-4 h-4 ml-1" />
			</Popover.Button>

			<Popover.Overlay className="fixed h-full inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />

			<Transition
				as="div"
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
				className={clsx(
					'fixed z-50 origin-top inset-x-4 rounded-3xl bg-white dark:bg-zinc-900 p-8',
					'ring-zinc-900/50 dark:ring-zinc-800'
				)}
			>
				<Popover.Panel>
					<div className="flex flex-row-reverse items-center justify-between">
						<Popover.Button>
							<Cross1Icon />
						</Popover.Button>
						<h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
							Mobile Navigation
						</h2>
					</div>

					{/* Mobile Navigation Links */}
					<nav className="mt-6">
						<ul className="-my-2 text-base divide-y divide-zinc-100 text-zinc-800 dark:divide-zinc-100/5">
							{links.map((link) => (
								<NavLink key={link.id} href={link.href} pathname={pathname} label={link.label} />
							))}
						</ul>
					</nav>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
