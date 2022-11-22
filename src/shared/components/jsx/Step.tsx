import styles from './Step.module.scss';

interface Props {
	number: number;
	title: string;
}

export function Step({ number, title }: Props) {
	return (
		<div className={styles.step}>
			<div>{number}</div>
			<h3>{title}</h3>
		</div>
	);
}
