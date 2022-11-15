import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllRecords } from '../../lib/xata';

export default async (_: VercelRequest, res: VercelResponse) => {
	const totalViews = await getAllRecords();

	return res.status(200).json({ total: totalViews?.toString() });
};
