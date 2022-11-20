import { EyeOpenIcon } from '@radix-ui/react-icons';

import { useViews } from '~/shared/hooks/useViews';

import styles from './Views.module.scss';

interface ViewsProps {
	slug: string;
	title?: string;
}

export function Views({ slug, title }: ViewsProps) {
	const { views } = useViews(slug as string);

	return (
		<span className={styles.chip}>
			<EyeOpenIcon width={18} height={18} />
			<span>{views ?? '--'}</span>
		</span>
	);
}
