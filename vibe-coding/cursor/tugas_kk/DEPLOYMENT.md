# Deployment Guide

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Set up database:**

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Environment Variables Required

### Database (Neon)

- `DATABASE_URL` - Your Neon PostgreSQL connection string

### Authentication (NextAuth)

- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Random secret string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GITHUB_ID` - GitHub OAuth client ID
- `GITHUB_SECRET` - GitHub OAuth client secret

### AI Integration (n8n)

- `N8N_WEBHOOK_URL` - Your n8n webhook URL
- `N8N_API_KEY` - Your n8n API key (optional)

## n8n Webhook Setup

1. Create a webhook trigger in n8n
2. Set up your AI processing workflow
3. Configure the webhook to expect this payload:

```json
{
  "userId": "string",
  "productId": "string (optional)",
  "message": "string",
  "context": {
    "cart": [],
    "product": {}
  }
}
```

4. Return this response format:

```json
{
  "reply": "string",
  "suggestions": ["string"],
  "metadata": {}
}
```

## Testing n8n Integration

```bash
curl -X POST "YOUR_N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_N8N_API_KEY" \
  -d '{
    "userId": "test-user",
    "message": "Hello, I need help",
    "context": {}
  }'
```

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

1. Build: `npm run build`
2. Start: `npm start`
3. Set up reverse proxy (nginx/Apache)
4. Configure SSL certificate

## Troubleshooting

### Common Issues

1. **Database connection failed**

   - Check DATABASE_URL format
   - Ensure Neon database is running
   - Verify network access

2. **OAuth not working**

   - Check redirect URIs match exactly
   - Verify client ID/secret
   - Ensure NEXTAUTH_URL is correct

3. **n8n webhook failing**
   - Test webhook URL manually
   - Check API key format
   - Verify response format

### Support

- Check the main README.md for detailed setup
- Review API documentation
- Contact support if needed

---

Happy deploying! 🚀


