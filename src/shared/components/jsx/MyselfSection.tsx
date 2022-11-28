import { Fragment } from 'react';
import clsx from 'clsx';
import { Disclosure, Transition } from '@headlessui/react';
import { PlusIcon, MinusIcon, CheckIcon } from '@radix-ui/react-icons';

const disclosureData = [
	{
		id: 1,
		title: 'My Expertise',
		content: [
			"Frontend Development: I've been working on frontend development mainly using ReactJS and NextJS. I've also worked with other frameworks like VueJS.",
			"Backend Development: I work with NodeJS and Express for backend development. I'm also familiar with other languages like Python and most recently Go.",
			"Mobile Development: I've worked with React Native for mobile development, and I'm also familiar with Flutter for cross platform mobile development.",
		],
	},
	{
		id: 2,
		title: 'My Favorite Stack',
		content: [
			'Frontend: ReactJS, NextJS',
			'Backend: NodeJS, Express',
			'Mobile: React Native',
			'Database: MongoDB',
			'Styling: TailwindCSS',
		],
	},
	{
		id: 3,
		title: "What I'm up to now",
		content: [
			"I'm working as a Full-Stack Developer for a startup.",
			"I'm also working on a few personal projects, which you can check out on my Github.",
			"I'm also learning Go, and I'm planning to make a few projects with it.",
			"Also, I'm learning more about CI/CD and DevOps.",
		],
	},
];

export function MyselfSection() {
	return (
		<div className="mt-3 w-full">
			<div className="w-full md:w-2/3 mx-auto space-y-3">
				{disclosureData.map((data) => (
					<Disclosure key={data.id}>
						{({ open }) => (
							<Fragment>
								<Disclosure.Button
									className={clsx('flex items-center justify-between p-3 w-full rounded-lg', {
										'bg-brand/60': open,
										'bg-surface-three': !open,
									})}
								>
									<h3>{data?.title}</h3>
									{open ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
								</Disclosure.Button>
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0"
								>
									<Disclosure.Panel className={clsx('bg-surface-three p-3 rounded-lg mt-1')}>
										<ul className="space-y-1">
											{data?.content.map((item) => (
												<li key={item} className="flex items-center gap-3">
													<div>
														<CheckIcon width={18} height={18} className="text-green-500" />
													</div>
													{item.includes(':') ? (
														<span className="text-sm">
															<strong>{item.split(':')[0]}</strong>
															{item.split(':')[1]}
														</span>
													) : (
														<span className="text-sm">{item}</span>
													)}
												</li>
											))}
										</ul>
									</Disclosure.Panel>
								</Transition>
							</Fragment>
						)}
					</Disclosure>
				))}
			</div>
		</div>
	);
}
