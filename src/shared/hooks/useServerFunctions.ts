import { useEnv } from './useEnv';

export function useServerFunctions() {
	const mode = useEnv();
	let apiUrl = '';

	if (mode === 'development') {
		apiUrl = 'http://localhost:8080/api';
	}

	if (mode === 'production') {
		apiUrl = window.location.origin + '/api';
	}

	return { apiUrl };
}
