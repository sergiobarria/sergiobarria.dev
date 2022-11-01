import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (_: VercelRequest, res: VercelResponse) => {
	res.status(200).json({ status: 'ok!' });
};
