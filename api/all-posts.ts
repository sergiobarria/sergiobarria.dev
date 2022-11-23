import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllSlugs } from '../lib/xata';

export default async (_: VercelRequest, res: VercelResponse) => {
	const slugs = await getAllSlugs();

	return res.status(200).json({ slugs });
};
