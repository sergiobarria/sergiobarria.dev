import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllPostsViews } from '../../lib/redis';

export default async (_: VercelRequest, res: VercelResponse) => {
	const totalViews = await getAllPostsViews();

	return res.status(200).json({ total: totalViews?.toString() });
};