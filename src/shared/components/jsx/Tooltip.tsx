import clsx from 'clsx';
import * as RadixTooltip from '@radix-ui/react-tooltip';

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
					<RadixTooltip.Content
						className={clsx('bg-surface-three rounded-lg p-2 text-sm shadow-md z-50')}
					>
						{content}
						<RadixTooltip.Arrow className="fill-surface-three stroke-none" />
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
}
