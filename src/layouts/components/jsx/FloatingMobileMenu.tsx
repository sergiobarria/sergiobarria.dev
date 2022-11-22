import React, { useRef } from 'react';
import clsx from 'clsx';
import { Divide as HamburgerMenu } from 'hamburger-react';
import { motion as m } from 'framer-motion';

import { useDimensions } from '~/shared/hooks';

import styles from './FloatingMobileMenu.module.scss';

import site from '../../../../site.json';

interface ToggleActions {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const navigationVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.3 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

interface FloatingButtonProps extends ToggleActions {}

function FloatingButton({ isOpen, setIsOpen }: FloatingButtonProps): JSX.Element {
	return (
		<div className={clsx(styles.floatingBtn, isOpen ? styles.open : styles.closed)}>
			<HamburgerMenu size={24} toggled={isOpen} toggle={setIsOpen} />
		</div>
	);
}

interface MenuItemProps {
	text: string;
	href: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	pathname?: string;
	number?: number;
}

function MenuItem({ text, href, setIsOpen, pathname, number }: MenuItemProps): JSX.Element {
	return (
		<m.li
			variants={menuItemVariants}
			whileTap={{ scale: 0.95 }}
			className={clsx(styles.menuItem, pathname === href && styles.menuItemActive)}
			onClick={() => setIsOpen(false)}
		>
			<span>0{number}.</span>
			<a href={href}>{text}</a>
		</m.li>
	);
}

interface NavigationProps extends ToggleActions {
	pathname?: string;
}

function Navigation({ isOpen, setIsOpen, pathname }: NavigationProps): JSX.Element {
	const { navLinks } = site;

	const navigationLinks = [{ id: 0, label: 'Home', href: '/' }, ...navLinks];

	return (
		<m.ul
			variants={navigationVariants}
			className={clsx(styles.navigation, !isOpen && styles.navigationHidden)}
		>
			{navigationLinks.map((link, index) => {
				return (
					<MenuItem
						key={link.id}
						text={link.label}
						number={index + 1}
						href={link.href}
						setIsOpen={setIsOpen}
						pathname={pathname}
					/>
				);
			})}
		</m.ul>
	);
}

interface FloatingMobileMenuProps {
	currentPath?: string;
}

export function FloatingMobileMenu({ currentPath }: FloatingMobileMenuProps): JSX.Element {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	const sidebar = {
		open: (height = 750) => ({
			clipPath: `circle(${height * 2 + 200}px at right 4rem bottom 4rem)`,
			transition: {
				type: 'spring',
				stiffness: 20,
				restDelta: 2,
			},
		}),
		closed: {
			clipPath: 'circle(0px at right 4rem bottom 4rem)',
			transition: {
				delay: 0.1,
				type: 'spring',
				stiffness: 400,
				damping: 40,
			},
		},
	};

	return (
		<m.nav
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			custom={height}
			ref={containerRef}
			className={styles.mobileNav}
		>
			<m.div className={styles.navContainer} variants={sidebar}>
				<Navigation isOpen={isOpen} setIsOpen={setIsOpen} pathname={currentPath} />
			</m.div>
			<FloatingButton isOpen={isOpen} setIsOpen={setIsOpen} />
		</m.nav>
	);
}
