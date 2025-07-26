# Production Deployment Guide

## Netlify Dashboard Environment Variables

Add these variables in your Netlify dashboard (Site Settings → Environment Variables):

### Required Environment Variables:

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_production_key
STRIPE_SECRET_KEY=sk_live_your_actual_production_secret_key
NODE_ENV=production
```

### Steps to Add:

1. Go to https://app.netlify.com/sites/[your-site]/settings/deploys
2. Click "Environment variables"
3. Add each variable with "Add variable" button
4. Deploy your site

### Stripe Dashboard Setup:

1. Enable live mode in Stripe Dashboard
2. Go to Settings → Payment methods
3. Enable: Cards, Google Pay, Apple Pay, Link
4. Complete business verification
5. Get your live API keys from Developers → API keys

### Testing Production:

1. Use real (small amount) transactions to test
2. Check Stripe Dashboard for successful payments
3. Verify receipt emails are working
4. Test all payment methods (card, Google Pay, Apple Pay)

### Monitoring:

- Check Netlify Functions logs
- Monitor Stripe Dashboard for any issues
- Set up Stripe webhooks for advanced monitoring (optional)
