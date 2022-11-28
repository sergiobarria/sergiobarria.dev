import * as Tabs from '@radix-ui/react-tabs';
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { CloudinaryImage } from './CloudinaryImage';
import { Tooltip } from './Tooltip';
import type { Project } from '~/pages/projects/_utils';

interface FeaturedProjectsListProps {
	projects: Project[];
}

export function FeaturedProjectsList({ projects }: FeaturedProjectsListProps) {
	// TODO: See where can add project image
	return (
		<div className="bg-surface-two p-4 md:p-8 rounded-lg mt-3">
			<Tabs.Root
				defaultValue={projects[0].name}
				className="grid grid-cols-1 md:grid-cols-[175px,auto] gap-4"
			>
				{/* TODO: Move this border style to a global component class to re-use in other parts */}
				<Tabs.List
					aria-label="Featured Projects"
					className={clsx(
						'relative flex gap-3 border-b border-surface-three pb-2',
						'md:border-b-0 md:border-r-2 md:pb-4 md:pr-4 md:flex-col md:items-start'
						// 'md:before:absolute md:before:-top-3 md:before:-left-3 md:before:w-20 md:before:h-20',
						// 'md:before:border-tl-2 md:before:border-brand-accent md:before:rounded-tl-lg'
					)}
				>
					{projects.map((project) => (
						<Tabs.Trigger
							key={project.order}
							value={project.name}
							className={clsx(
								'text-sm md:py-2 px-3 rounded-lg hover:text-brand-accent hover:bg-surface-four',
								'data-[state=active]:bg-surface-four data-[state=active]:text-brand-accent'
							)}
						>
							{project.name}
						</Tabs.Trigger>
					))}
				</Tabs.List>
				{projects.map((project) => (
					<Tabs.Content key={project.order} value={project.name}>
						<div className="flex flex-col h-full gap-4 w-full">
							<div className="flex items-center justify-between">
								<h3>{project.name}</h3>
								<span className="flex items-center gap-5">
									<a href={project.repo} className="hover:text-brand">
										<GitHubLogoIcon width={24} height={24} />
									</a>
									<a href={project.liveUrl} className="hover:text-brand">
										<ExternalLinkIcon width={24} height={24} />
									</a>
								</span>
							</div>
							<p>{project.description}</p>
							<div className="flex items-center gap-3 mt-auto">
								{project.stack.split(',').map((item) => (
									<span
										key={item}
										className="capitalize text-sm bg-surface-four rounded-lg px-2 py-1"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					</Tabs.Content>
				))}
			</Tabs.Root>
		</div>
	);
}
