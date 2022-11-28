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
				{disclosureData.map((data) => {
					return (
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
					);
				})}
			</div>
		</div>
	);
}

// import { forwardRef, useEffect, useState } from 'react';
// import * as Tabs from '@radix-ui/react-tabs';
// import * as RadixAccordion from '@radix-ui/react-accordion';
// import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
// import clsx from 'clsx';

// interface AccordionTriggerProps extends RadixAccordion.AccordionTriggerProps {
// 	active?: string;
// }

// const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
// 	({ children, className, ...props }, forwardedRef) => {
// 		// const [state, setState] = useState<'open' | 'closed' | ''>('');

// 		// get data attribute from button on first render
// 		// useEffect(() => {
// 		// 	const button = document.getElementById('accordion-trigger');
// 		// 	setState(button?.getAttribute('data-state') as 'open' | 'closed');
// 		// }, []);

// 		return (
// 			<RadixAccordion.Header
// 				id="accordion-trigger"
// 				className={clsx(
// 					'p-3 rounded-lg bg-surface-three w-full max-w-xl',
// 					'data-[state=open]:bg-brand/60'
// 				)}
// 			>
// 				<RadixAccordion.Trigger
// 					className={clsx('flex items-center justify-between w-full', className)}
// 					{...props}
// 					ref={forwardedRef}
// 					onClick={(e) => {
// 						// setState((state) => (state === 'open' ? 'closed' : 'open'));
// 					}}
// 				>
// 					<span>{children}</span>
// 					{/* {state === 'open' ? ( */}
// 					<MinusIcon className="w-5 h-5 data-[state=closed]:hidden" />
// 					{/* ) : ( */}
// 					<PlusIcon className="w-5 h-5 data-[state=open]:hidden" />
// 					{/* )} */}
// 				</RadixAccordion.Trigger>
// 			</RadixAccordion.Header>
// 		);
// 	}
// );

// const AccordionContent = forwardRef<HTMLDivElement, RadixAccordion.AccordionContentProps>(
// 	({ children, className, ...props }, forwardedRef) => (
// 		<RadixAccordion.Content
// 			className={clsx('bg-surface-four p-4 rounded-lg mt-2', className)}
// 			{...props}
// 			ref={forwardedRef}
// 		>
// 			<div className="AccordionContentText">{children}</div>
// 		</RadixAccordion.Content>
// 	)
// );

// export function MyselfSection() {
// 	const [activeItem, setActiveItem] = useState<string>('item-1');

// 	return (
// 		<div className="flex items-center justify-center mt-3">
// 			<RadixAccordion.Root
// 				type="single"
// 				collapsible
// 				defaultValue="item-1"
// 				className="w-full mx-auto"
// 			>
// 				<RadixAccordion.Item value="item-1" className="w-full md:w-1/2 mx-auto">
// 					<AccordionTrigger active={activeItem}>Accordion 1</AccordionTrigger>
// 					<AccordionContent>Content 1</AccordionContent>
// 				</RadixAccordion.Item>
// 				<RadixAccordion.Item value="item-2" className="w-full md:w-1/2 mx-auto">
// 					<AccordionTrigger active={activeItem}>Accordion 2</AccordionTrigger>
// 					<AccordionContent>Content 2</AccordionContent>
// 				</RadixAccordion.Item>
// 				<RadixAccordion.Item value="item-3" className="w-full md:w-1/2 mx-auto">
// 					<AccordionTrigger active={activeItem}>Accordion 3</AccordionTrigger>
// 					<AccordionContent>Content 4</AccordionContent>
// 				</RadixAccordion.Item>
// 			</RadixAccordion.Root>
// 		</div>
// 	);
// }

// // <div className={styles.container}>
// // 			<Tabs.Root className={styles.tabs} defaultValue="tab1">
// // 				<Tabs.List className={styles.tabsList} aria-label="about me">
// // 					<Tabs.Trigger className={styles.tab} value="tab1">
// // 						What I do
// // 					</Tabs.Trigger>
// // 					<Tabs.Trigger className={styles.tab} value="tab2">
// // 						My Favorite Stack
// // 					</Tabs.Trigger>
// // 					{/* NOTE: Temporarily disabled */}
// // 					{/* <Tabs.Trigger className={styles.tab} value="tab3">
// // 						My Experience
// // 					</Tabs.Trigger> */}
// // 					<Tabs.Trigger className={styles.tab} value="tab4">
// // 						What I'm up to
// // 					</Tabs.Trigger>
// // 				</Tabs.List>
// // 				<Tabs.Content className={styles.tabContent} value="tab1">
// // 					<h4>These are the areas where I work</h4>
// // 					<ul>
// // 						<li>Frontend Development</li>
// // 						<li>Backend Development</li>
// // 						<li>Mobile Development</li>
// // 						<li>JAMstack Development</li>
// // 					</ul>
// // 				</Tabs.Content>
// // 				<Tabs.Content className={styles.tabContent} value="tab2">
// // 					<h4>This is my current Favorite Stack</h4>
// // 					<ul>
// // 						<li>
// // 							<strong>Frontend: </strong>React, Next.js
// // 						</li>
// // 						<li>
// // 							<strong>Backend: </strong>Node.js, Express.js
// // 						</li>
// // 						<li>
// // 							<strong>Database: </strong>MongoDB
// // 						</li>
// // 						<li>
// // 							<strong>Deployment: </strong>Vercel
// // 						</li>
// // 						<li>
// // 							<strong>Mobile: </strong>React Native
// // 						</li>
// // 						<li>
// // 							<strong>Styling: </strong>Tailwind CSS
// // 						</li>
// // 					</ul>
// // 				</Tabs.Content>
// // 				{/* NOTE: Temporarily disabled */}
// // 				{/* <Tabs.Content className="" value="tab3">
// // 					<p className="">Content 3</p>
// // 				</Tabs.Content> */}
// // 				<Tabs.Content className={styles.tabContent} value="tab4">
// // 					<h4>Here is what I'm up to right now</h4>
// // 					<ul>
// // 						<li>Migrating my personal website from Next.js to Astro.</li>
// // 						<li>Learning Go for backend development and API's.</li>
// // 						<li>Learning more about Github Actions and CI/CD in general.</li>
// // 						<li>Learning more about Backend Development and SQL Databases</li>
// // 					</ul>
// // 				</Tabs.Content>
// // 			</Tabs.Root>
// // 		</div>
