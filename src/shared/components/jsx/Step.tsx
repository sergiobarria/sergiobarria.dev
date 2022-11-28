import clsx from 'clsx';

interface Props {
	number: number;
	title: string;
}

export function Step({ number, title }: Props) {
	return (
		<div className="flex items-center gap-x-3">
			<div
				className={clsx(
					'flex items-center justify-center w-8 h-8 font-semibold',
					'text-brand p-4 rounded-full border border-brand font-marker'
				)}
			>
				{number}
			</div>
			<h3 className="mt-2">{title}</h3>
		</div>
	);
}
