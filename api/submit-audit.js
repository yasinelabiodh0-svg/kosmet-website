// Vercel Serverless Function for Kosmet Audit Form
// Deploy: vercel --prod
// URL: https://kosmet.io/api/submit-audit

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const formData = req.body;
    
    console.log('Audit form submission received:', {
      clinic: formData.clinicName,
      email: formData.email,
      timestamp: new Date().toISOString()
    });

    // Validate required fields
    const requiredFields = [
      'clinicName', 'yearsBusiness', 'numProviders',
      'city', 'state', 'serviceRadius', 'monthlyPatients',
      'contactName', 'contactRole', 'email'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missing: missingFields
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Check at least one service selected
    const services = Array.isArray(formData.services) ? formData.services : [formData.services];
    if (!services || services.length === 0 || (services.length === 1 && !services[0])) {
      return res.status(400).json({
        error: 'Please select at least one service'
      });
    }

    // Check at least one marketing method selected
    const marketing = Array.isArray(formData.marketing) ? formData.marketing : [formData.marketing];
    if (!marketing || marketing.length === 0 || (marketing.length === 1 && !marketing[0])) {
      return res.status(400).json({
        error: 'Please select at least one marketing method'
      });
    }

    // Check terms agreement
    if (formData.agreeTerms !== 'on') {
      return res.status(400).json({
        error: 'Please agree to the terms'
      });
    }

    // Send email via Resend (free tier)
    try {
      // First email: To support@kosmet.io
      const supportEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kosmet Form <form@kosmet.io>',
          to: ['support@kosmet.io'],
          reply_to: formData.email,
          subject: `New AI Audit Request - ${formData.clinicName}`,
          html: `
            <h2>New AI Audit Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Clinic:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.clinicName}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.contactName} (${formData.contactRole})</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.city}, ${formData.state}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Website:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.website || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Years in Business:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.yearsBusiness}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Monthly Patients:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.monthlyPatients}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Services:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${services.join(', ')}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Marketing Methods:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${marketing.join(', ')}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Additional Info:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.additionalInfo || 'None'}</td></tr>
            </table>
            <p><em>Received: ${new Date().toLocaleString()}</em></p>
            <hr>
            <p><a href="https://calendly.com/kosmet-support/15-min-ai-audit-review">Schedule call with this lead</a></p>
          `,
        }),
      });

      // Second email: Confirmation to visitor
      const visitorEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kosmet <support@kosmet.io>',
          to: [formData.email],
          subject: `Your AI Audit is Being Created - ${formData.clinicName}`,
          html: `
            <h2>Your AI Audit is Being Created</h2>
            <p>Hi ${formData.contactName},</p>
            <p>Thank you for requesting an AI visibility audit for <strong>${formData.clinicName}</strong>.</p>
            
            <h3>What happens next:</h3>
            <ol>
              <li><strong>Our specialists analyze</strong> your clinic's AI visibility (ChatGPT, Perplexity, Claude)</li>
              <li><strong>We research competitors</strong> in ${formData.city} and identify specific gaps</li>
              <li><strong>We calculate revenue opportunity</strong> based on missing AI-referred patients</li>
              <li><strong>We create your 4-page PDF</strong> with personalized insights and action plan</li>
            </ol>
            
            <p><strong>Timeline:</strong> You'll receive your audit within 24 hours.</p>
            
            <p><strong>Why it takes 24 hours:</strong> Generic AI-generated audits are worthless for $1,490/month decisions. We manually analyze each clinic.</p>
            
            <p><strong>Next step:</strong> Once you receive your audit, schedule a free 15-minute review:</p>
            <p><a href="https://calendly.com/kosmet-support/15-min-ai-audit-review" style="background: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Schedule Free Audit Review</a></p>
            
            <p><strong>🎁 Special Offer:</strong> First 3 clients this month get a FREE AEO-optimized website ($5,000+ value).</p>
            
            <hr>
            <p>Best regards,<br>The Kosmet Team</p>
            <p><em>This isn't a generic template. Our specialists will analyze your specific clinic and local market.</em></p>
          `,
        }),
      });

      console.log('Emails sent via Resend');
    } catch (emailError) {
      console.warn('Email sending failed (continuing without email):', emailError.message);
      // Continue even if email fails - at least form submission works
    }
    
    // Log submission (in production, store in database)
    const submission = {
      timestamp: new Date().toISOString(),
      clinicName: formData.clinicName,
      contactName: formData.contactName,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      services: services,
      marketing: marketing
    };

    console.log('Submission validated:', submission);

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      redirect: 'https://kosmet.io/audit-thank-you.html',
      submissionId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

// For Vercel serverless functions
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};