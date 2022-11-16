import * as RadixTooltip from '@radix-ui/react-tooltip';

import styles from './Tooltip.module.scss';

interface TooltipProps {
	children: React.ReactNode;
	content: React.ReactNode | string;
}

export function Tooltip({ children, content }: TooltipProps) {
	return (
		<RadixTooltip.Provider>
			<RadixTooltip.Root>
				<RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content className={styles.content}>
						{content}
						<RadixTooltip.Arrow className={styles.arrow} />
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
}
