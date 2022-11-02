import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPostViews, updatePostViews } from '../../lib/redis';

export default async (req: VercelRequest, res: VercelResponse) => {
	const { slug } = req.query as { slug: string };

	if (req.method === 'GET') {
		const views = await getPostViews(slug);

		return res.status(200).json({ total: views?.toString() });
	}

	if (req.method === 'POST') {
		const views = await updatePostViews(slug);

		return res.status(200).json({ total: views?.toString() });
	}
};
