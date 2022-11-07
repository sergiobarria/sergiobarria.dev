import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

const tabs = [
	{ id: 0, title: 'What I do' },
	{ id: 1, title: 'My Favorite Stack' },
	{ id: 2, title: "What I'm Doing Now" },
];

const content = [
	{
		id: 0,
		subtitle: 'These are the things I do',
		list: [
			'Frontend Development',
			'Backend Development',
			'Mobile Development',
			'JAMstack Development',
		],
	},
	{
		id: 1,
		subtitle: 'This is my current favorite stack',
		list: [
			'Frontent: React, Next.js',
			'Backend: Node.js, Express.js',
			'Database: MongoDB',
			'Deployment: Vercel',
			'Mobile: React Native',
			'Styling: Tailwind CSS',
		],
	},
	{
		id: 2,
		subtitle: 'These are the things I am currently working on or learning',
		list: [
			'Migrating my portfolio to Astro',
			"Learning Go for backend development and API's",
			'Learning about GitHub Actions and CI/CD in general',
			'Learning more about Backend Development and SQL Databases',
		],
	},
];

const CheckIcon = () => (
	<svg
		className="flex-shrink-0 w-4 h-4 text-green-600 dark:text-green-500"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			clipRule="evenodd"
		></path>
	</svg>
);

export function AboutMeTabs() {
	const [activeTab, setActiveTab] = useState<number>(0);

	return (
		<div className="my-6 w-full md:w-2/3 mx-auto bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
			{/* Mobile tabs */}
			<div className="block sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select Tab
				</label>
				<select
					id="tabs"
					className={clsx(
						'bg-gray-50 border-0 border-b border-gray-200 text-gray-900 sm:text-sm',
						'rounded-t-lg focus:ring-accent focus:border-accent block w-full p-2.5',
						'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
						'dark:text-white dark:focus:ring-accent dark:focus:border-accent'
					)}
				>
					{tabs.map((tab) => (
						<option key={tab.id} onClick={() => setActiveTab(tab.id)}>
							{tab.title}
						</option>
					))}
				</select>
			</div>

			{/* Tabs */}
			<ul
				id="tabs"
				role="tabs-list"
				className={clsx(
					'hidden text-sm font-medium text-center text-gray-500 rounded-lg',
					'rounded-lg divide-x divide-gray-200 sm:flex dark:divide-gray-600 dark:text-gray-400'
				)}
			>
				{tabs.map((tab) => (
					<li key={tab.id} className="w-full">
						<button
							id="about-tab"
							role="tab"
							aria-controls="about"
							aria-selected={activeTab === tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={clsx(
								'inline-block p-4 w-full bg-gray-50',
								'focus:outline-none dark:bg-gray-700',
								{
									'bg-gray-700 dark:bg-accent/90 font-bold text-white': activeTab === tab.id,
									'hover:bg-gray-100 dark:hover:bg-gray-600': activeTab !== tab.id,
									'rounded-tl-lg': tab.id === 0,
									'rounded-tr-lg': tab.id === tabs.length - 1,
								}
							)}
						>
							{tab.title}
						</button>
					</li>
				))}
			</ul>

			{/* Tabs Content */}
			<div className="border-t border-gray-200 dark:border-gray-600 p-4 text-sm">
				{content.find((tab) => tab.id === activeTab) && (
					<Fragment>
						<h5 className="text-sm md:text-base">
							{content.find((tab) => tab.id === activeTab)?.subtitle}:
						</h5>
						<ul className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-600">
							{content
								.find((tab) => tab.id === activeTab)
								?.list.map((item, i) => (
									<li key={i} className="flex items-center py-2 space-x-2">
										<CheckIcon />
										{item.includes(':') ? (
											<Fragment>
												<span className="font-bold">{item.split(':')[0]}:</span>
												<span>{item.split(':')[1]}</span>
											</Fragment>
										) : (
											<span>{item}</span>
										)}
									</li>
								))}
						</ul>
					</Fragment>
				)}
			</div>
		</div>
	);
}
