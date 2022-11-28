import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { CloudinaryImage } from './CloudinaryImage';
import type { Project } from '~/pages/projects/_utils';

interface FeaturedProjectsListProps {
	projects: Project[];
}

export function FeaturedProjectsList({ projects }: FeaturedProjectsListProps) {
	return (
		<div className="bg-surface-two p-4 md:p-8 rounded-lg mt-3">
			<Tab.Group>
				<div className="grid grid-cols-1 md:grid-cols-[175px,auto] gap-4">
					<Tab.List
						aria-label="featured projects"
						className={clsx(
							'relative flex gap-3 border-b border-surface-three pb-2',
							'md:border-b-0 md:border-r-2 md:pb-4 md:pr-4 md:flex-col md:items-start'
						)}
					>
						{projects.map((project) => (
							<Tab as={Fragment} key={project.order}>
								{({ selected }) => (
									<button
										className={clsx(
											'text-sm md:py-2 px-3 rounded-lg hover:text-brand-accent hover:bg-surface-four',
											'focus:border-none focus:outline-none',
											selected && 'text-brand-accent bg-surface-four'
										)}
									>
										{project.name}
									</button>
								)}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels>
						{projects.map((project) => (
							<Tab.Panel key={project.order}>
								<div className="flex flex-col h-full gap-4 w-full">
									<div className="flex items-center justify-between">
										<h3>{project.name}</h3>
										<span className="flex items-center gap-5">
											<a
												href={project.repo}
												className="hover:text-brand"
												target="_blank"
												rel="noopener noreferrer"
											>
												<GitHubLogoIcon width={24} height={24} />
											</a>
											<a
												href={project.liveUrl}
												className="hover:text-brand"
												target="_blank"
												rel="noopener noreferrer"
											>
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
							</Tab.Panel>
						))}
					</Tab.Panels>
				</div>
			</Tab.Group>
		</div>
	);
}
