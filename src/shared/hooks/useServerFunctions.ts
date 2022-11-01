import { useEnv } from './useEnv';

export function useServerFunctions() {
	const mode = useEnv();
	let apiUrl = '';

	if (mode === 'development') {
		apiUrl = 'http://localhost:3000/api';
	}

	if (mode === 'production') {
		// TODO: Add production URL
		// https://docs.astro.build/en/guides/environment-variables/#default-environment-variables
		// Check the default base_url and site variables to see if they can be used
		apiUrl = 'https://vercel.com/api';
	}

	return { apiUrl };
}
