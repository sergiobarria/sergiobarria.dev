import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

import { CloudinaryImage } from './CloudinaryImage';
import { Tooltip } from './Tooltip';
import type { Project } from '~/pages/projects/_utils';

import styles from './FeaturedProjectsList.module.scss';

interface FeaturedProjectsListProps {
	projects: Project[];
}

export function FeaturedProjectsList({ projects }: FeaturedProjectsListProps) {
	return (
		<div className={styles.container}>
			{projects.map((project, idx) => (
				<div key={idx} className={styles.grid}>
					<div className={styles.gridContent}>
						<span>Featured Project</span>
						<h3>{project.name}</h3>
						<p>{project.description}</p>
						<p>
							{project.stack.split(',').map((item, i) => (
								<span key={i}>{item}</span>
							))}
						</p>
						<div>
							<Tooltip content="Source Code">
								<a href={project.repo} target="_blank" rel="noopener noreferrer">
									<GitHubLogoIcon width={24} height={24} />
								</a>
							</Tooltip>
							<Tooltip content="Live Url">
								<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
									<ExternalLinkIcon width={24} height={24} />
								</a>
							</Tooltip>
						</div>
					</div>
					<div className={styles.gridImg}>
						<CloudinaryImage
							publicId={`sergiobarria/projects/${project.image}`}
							isThumbnail
							alt={`thumbnail for ${project.name} frontmatter`}
							width={500}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
