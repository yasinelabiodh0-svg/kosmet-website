#!/bin/bash

# Deploy Kosmet.io to Vercel with Resend API key

echo "🚀 Deploying Kosmet.io to Vercel..."

# Create .env file with Resend API key
cat > .env << EOF
RESEND_API_KEY=re_XPpaPiXC_7fYT5AW9NRJU4Qi3SfqjYiFA
EOF

echo "✅ Created .env file with Resend API key"

# Create vercel.json if not exists
if [ ! -f vercel.json ]; then
  cat > vercel.json << EOF
{
  "functions": {
    "api/submit-audit.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
EOF
  echo "✅ Created vercel.json"
fi

echo "📦 Ready to deploy to Vercel"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import from GitHub: yasinelabiodh0-svg/kosmet-website"
echo "3. Add environment variable: RESEND_API_KEY = re_XPpaPiXC_7fYT5AW9NRJU4Qi3SfqjYiFA"
echo "4. Deploy"
echo ""
echo "Or run: npx vercel --prod"