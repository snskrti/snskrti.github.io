# Production Environment Variables Template

# Copy these to your Netlify dashboard under Site settings → Environment variables

# ===========================================

# STRIPE CONFIGURATION (PRODUCTION)

# ===========================================

# Replace with your actual live Stripe keys from https://dashboard.stripe.com/apikeys

STRIPE_SECRET_KEY=sk_live_your_actual_live_secret_key_here
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_publishable_key_here

# ===========================================

# PAYPAL CONFIGURATION (PRODUCTION)

# ===========================================

# Replace with your live PayPal client ID

REACT_APP_PAYPAL_CLIENT_ID=your_live_paypal_client_id_here

# ===========================================

# FIREBASE/FIRESTORE CONFIGURATION (OPTIONAL)

# ===========================================

# When you implement Firestore, add your service account key as a JSON string

# FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project"...}

# ===========================================

# EMAIL SERVICE CONFIGURATION (OPTIONAL)

# ===========================================

# If you implement SendGrid for email sending

# SENDGRID_API_KEY=your_sendgrid_api_key_here

# SENDGRID_FROM_EMAIL=admin@sanskriti-hamburg.de

# ===========================================

# NOTES

# ===========================================

# 1. These variables should be set in Netlify dashboard, not in this file

# 2. Never commit production keys to version control

# 3. Test keys are safe to commit, live keys are not

# 4. Netlify will automatically inject these during build process
