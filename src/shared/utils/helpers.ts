import path from 'node:path';

export const getSlugFromFilePath = (file: string) => path.parse(file).name;

export const urlFromContentUrl = (url: string) => {
	const { dir, name } = path.parse(url);
	return path.join(dir.replace('src/content', ''), name);
};
