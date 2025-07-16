# Netlify Deployment Checklist for Stripe Integration

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables in Netlify Dashboard

- [ ] **STRIPE_SECRET_KEY** (use `sk_live_...` for production or `sk_test_...` for testing)
- [ ] **REACT_APP_STRIPE_PUBLISHABLE_KEY** (use `pk_live_...` for production or `pk_test_...` for testing)
- [ ] **REACT_APP_PAYPAL_CLIENT_ID** (your PayPal client ID)
- [ ] **NODE_ENV** (automatically set by Netlify contexts)

### 2. Netlify Functions Configuration

- [ ] Functions directory: `netlify/functions` ✅
- [ ] Function files present:
  - [ ] `create-payment-intent.ts` ✅
  - [ ] `confirm-payment.ts` ✅
  - [ ] `create-payment-intent.cjs` ✅ (for CommonJS compatibility)
  - [ ] `confirm-payment.cjs` ✅ (for CommonJS compatibility)

### 3. Build Configuration

- [ ] `netlify.toml` configured with proper settings ✅
- [ ] Build command: `npm run build` ✅
- [ ] Publish directory: `build` ✅
- [ ] Node version: `18` ✅

### 4. API Endpoints Configuration

- [ ] API redirect from `/api/*` to `/.netlify/functions/:splat` ✅
- [ ] Frontend calls updated to use `/api/create-payment-intent` ✅
- [ ] Frontend calls updated to use `/api/confirm-payment` ✅

## 🔧 Deployment Steps

### Step 1: Set Environment Variables

1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Add the following variables:
   ```
   STRIPE_SECRET_KEY = sk_live_your_actual_key (or sk_test_ for testing)
   REACT_APP_STRIPE_PUBLISHABLE_KEY = pk_live_your_actual_key (or pk_test_ for testing)
   REACT_APP_PAYPAL_CLIENT_ID = your_paypal_client_id
   ```

### Step 2: Deploy to Netlify

1. Push your code to your repository
2. Netlify will automatically build and deploy
3. Monitor the deploy log for any errors

### Step 3: Test the Deployment

1. Visit your deployed site
2. Navigate to `/events/durga-puja-2025/dinner-reservations`
3. Test the payment flow with test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
4. Check Netlify function logs for any errors

## 🛠️ Troubleshooting

### Common Issues:

1. **Environment variables not loading**: Check Netlify dashboard settings
2. **Function not found (404)**: Verify function names and paths
3. **CORS errors**: Check function headers configuration
4. **Build failures**: Check Node version and dependencies

### Debug Commands:

```bash
# Local testing
npm run dev

# Build testing
npm run build

# Check environment variables (in Netlify dashboard)
Site settings → Environment variables
```

## 🔒 Security Notes

1. **Never commit live Stripe keys** to version control
2. **Test keys are safe** to commit (they start with `pk_test_` and `sk_test_`)
3. **Live keys are sensitive** (they start with `pk_live_` and `sk_live_`)
4. **Use environment variables** for all sensitive data

## 📧 Email Configuration (Future)

When you implement email sending:

- Add `SENDGRID_API_KEY` environment variable
- Add `SENDGRID_FROM_EMAIL` environment variable
- Update confirm-payment function to send actual emails

## ✅ Success Indicators

- [ ] Site builds successfully
- [ ] Functions are accessible at `/api/create-payment-intent` and `/api/confirm-payment`
- [ ] Payment flow completes without errors
- [ ] Stripe dashboard shows successful transactions
- [ ] Console logs show proper environment variable loading
