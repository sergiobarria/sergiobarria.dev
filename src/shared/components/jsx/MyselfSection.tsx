import * as Tabs from '@radix-ui/react-tabs';

import styles from './MyselfSection.module.scss';

export function MyselfSection() {
	return (
		<div className={styles.container}>
			<Tabs.Root className={styles.tabs} defaultValue="tab1">
				<Tabs.List className={styles.tabsList} aria-label="about me">
					<Tabs.Trigger className={styles.tab} value="tab1">
						What I do
					</Tabs.Trigger>
					<Tabs.Trigger className={styles.tab} value="tab2">
						My Favorite Stack
					</Tabs.Trigger>
					{/* NOTE: Temporarily disabled */}
					{/* <Tabs.Trigger className={styles.tab} value="tab3">
						My Experience
					</Tabs.Trigger> */}
					<Tabs.Trigger className={styles.tab} value="tab4">
						What I'm up to
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content className={styles.tabContent} value="tab1">
					<h4>These are the areas where I work</h4>
					<ul>
						<li>Frontend Development</li>
						<li>Backend Development</li>
						<li>Mobile Development</li>
						<li>JAMstack Development</li>
					</ul>
				</Tabs.Content>
				<Tabs.Content className={styles.tabContent} value="tab2">
					<h4>This is my current Favorite Stack</h4>
					<ul>
						<li>
							<strong>Frontend: </strong>React, Next.js
						</li>
						<li>
							<strong>Backend: </strong>Node.js, Express.js
						</li>
						<li>
							<strong>Database: </strong>MongoDB
						</li>
						<li>
							<strong>Deployment: </strong>Vercel
						</li>
						<li>
							<strong>Mobile: </strong>React Native
						</li>
						<li>
							<strong>Styling: </strong>Tailwind CSS
						</li>
					</ul>
				</Tabs.Content>
				{/* NOTE: Temporarily disabled */}
				{/* <Tabs.Content className="" value="tab3">
					<p className="">Content 3</p>
				</Tabs.Content> */}
				<Tabs.Content className={styles.tabContent} value="tab4">
					<h4>Here is what I'm up to right now</h4>
					<ul>
						<li>Migrating my personal website from Next.js to Astro.</li>
						<li>Learning Go for backend development and API's.</li>
						<li>Learning more about Github Actions and CI/CD in general.</li>
						<li>Learning more about Backend Development and SQL Databases</li>
					</ul>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
