export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	const res = await fetch(input, init);
	const json = await res.json();
	return json;
}
