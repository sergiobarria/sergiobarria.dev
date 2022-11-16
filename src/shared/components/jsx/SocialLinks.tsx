import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { Tooltip } from './Tooltip';

import { socialLinks } from '../../../../site.json';

import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
	className?: string;
	size?: 'small' | 'medium' | 'large';
}

export function SocialLinks({ className, size = 'medium' }: SocialLinksProps) {
	const sizes = {
		small: 18,
		medium: 24,
		large: 32,
	};

	const icons = {
		github: <GitHubLogoIcon width={sizes[size]} height={sizes[size]} />,
		linkedin: <LinkedInLogoIcon width={sizes[size]} height={sizes[size]} />,
		twitter: <TwitterLogoIcon width={sizes[size]} height={sizes[size]} />,
	};

	return (
		<div className={styles.container}>
			{socialLinks.map((link) => (
				<Tooltip key={link.name} content={`My ${link.name}`}>
					<a
						href={link.url}
						className={clsx(styles.icon, className)}
						target="_blank"
						rel="noopener noreferrer"
					>
						{icons[link.name as keyof typeof icons]}
					</a>
				</Tooltip>
			))}
		</div>
	);
}
