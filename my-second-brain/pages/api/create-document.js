import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const auth = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/documents.create'],
    });

    const docs = google.docs({ version: 'v1', auth });
    const response = await docs.documents.create({
      requestBody: {
        title: 'New Document',
      },
    });

    res.status(200).json({ documentId: response.data.documentId });
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ error: 'Failed to create document' });
  }
}