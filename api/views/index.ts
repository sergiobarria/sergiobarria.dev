import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllRecords } from '../../lib/xata';

export default async (_: VercelRequest, res: VercelResponse) => {
	const totalViews = await getAllRecords();
	console.log('total views: ', totalViews);

	return res.status(200).json({ total: totalViews?.toString() });
};
