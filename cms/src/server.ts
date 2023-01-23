import * as path from 'path';

import express from 'express';
import payload from 'payload';

require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
	res.redirect('/admin');
});

// Initialize Payload
payload.init({
	secret: process.env.PAYLOAD_SECRET,
	mongoURL: process.env.MONGODB_URI,
	express: app,
	onInit: () => {
		payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
	},
});

// Add your own express routes here
const PORT = process.env.PAYLOAD_API_PORT || 1337;
app.listen(PORT);
