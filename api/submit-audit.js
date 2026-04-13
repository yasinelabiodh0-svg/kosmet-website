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

    // Send emails via Resend (free tier)
    // Note: If RESEND_API_KEY is not set, emails will fail but form still works
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      try {
        // Email 1: To support@kosmet.io (lead notification)
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Kosmet <updates@updates.kosmet.io>', // Using your verified subdomain
            to: ['support@kosmet.io'],
            reply_to: formData.email,
            subject: `New AI Audit Request - ${formData.clinicName}`,
            html: `
              <h2>🎯 New AI Audit Request</h2>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              
              <h3>Clinic Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Clinic:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.clinicName}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Contact:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.contactName} (${formData.contactRole})</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Location:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.city}, ${formData.state}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Website:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.website || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Years in Business:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.yearsBusiness}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Monthly Patients:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.monthlyPatients}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Services:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${services.join(', ')}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Marketing Methods:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${marketing.join(', ')}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Additional Info:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${formData.additionalInfo || 'None'}</td></tr>
              </table>
              
              <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e40af;">💡 Action Required</h3>
                <p><strong>Next steps:</strong></p>
                <ol>
                  <li>Add this lead to your CRM</li>
                  <li>Schedule a call: <a href="https://calendly.com/kosmet-support/15-min-ai-audit-review">Calendly Link</a></li>
                  <li>Prepare audit PDF (due in 24 hours)</li>
                </ol>
              </div>
              
              <p style="color: #6b7280; font-size: 14px;">Lead ID: ${Date.now().toString(36)} | Submitted via kosmet.io</p>
            `,
          }),
        });

        // Email 2: Confirmation to visitor
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Kosmet <updates@updates.kosmet.io>', // Using your verified subdomain
            to: [formData.email],
            subject: `Your AI Audit is Being Created - ${formData.clinicName}`,
            html: `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #6B46C1 0%, #805AD5 100%); padding: 32px; border-radius: 12px 12px 0 0; color: white; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px;">Your AI Audit is Being Created</h1>
                  <p style="opacity: 0.9; margin-top: 8px;">Thank you for requesting an AI visibility audit</p>
                </div>
                
                <div style="padding: 32px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                  <p>Hi <strong>${formData.contactName}</strong>,</p>
                  
                  <p>Thank you for requesting an AI visibility audit for <strong style="color: #6B46C1;">${formData.clinicName}</strong>.</p>
                  
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #10B981;">
                    <h3 style="margin-top: 0; color: #065f46;">✅ What happens next:</h3>
                    <ol style="margin: 12px 0; padding-left: 20px;">
                      <li><strong>Our specialists analyze</strong> your clinic's AI visibility (ChatGPT, Perplexity, Claude)</li>
                      <li><strong>We research competitors</strong> in ${formData.city} and identify specific gaps</li>
                      <li><strong>We calculate revenue opportunity</strong> based on missing AI-referred patients</li>
                      <li><strong>We create your 4-page PDF</strong> with personalized insights and action plan</li>
                    </ol>
                  </div>
                  
                  <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #f59e0b;">
                    <h3 style="margin-top: 0; color: #92400e;">⏰ Timeline</h3>
                    <p><strong>You'll receive your audit within 24 hours.</strong></p>
                    <p style="font-size: 14px; color: #78350f;">Why it takes 24 hours: Generic AI-generated audits are worthless for $1,490/month decisions. We manually analyze each clinic.</p>
                  </div>
                  
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="https://calendly.com/kosmet-support/15-min-ai-audit-review" style="background: #6B46C1; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Schedule Free Audit Review</a>
                    <p style="margin-top: 12px; color: #6b7280; font-size: 14px;">15-minute call to discuss your findings</p>
                  </div>
                  
                  <div style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); padding: 20px; border-radius: 8px; border: 2px solid #F59E0B; margin: 24px 0;">
                    <h3 style="margin-top: 0; color: #92400e;">🎁 Special Offer</h3>
                    <p><strong>First 3 clients this month get a FREE AEO-optimized website ($5,000+ value).</strong></p>
                    <p style="font-size: 14px; color: #78350f;">Custom-designed, mobile-optimized, launched in 7 days.</p>
                  </div>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
                  
                  <p style="color: #6b7280; font-size: 14px;">Best regards,<br><strong>The Kosmet Team</strong></p>
                  <p style="color: #9ca3af; font-size: 12px; font-style: italic;">This isn't a generic template. Our specialists will analyze your specific clinic and local market.</p>
                </div>
                
                <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
                  <p>Kosmet · AI Visibility Optimization for Medical Spas</p>
                  <p><a href="https://kosmet.io" style="color: #6B46C1;">kosmet.io</a> · <a href="mailto:support@kosmet.io" style="color: #6B46C1;">support@kosmet.io</a></p>
                </div>
              </div>
            `,
          }),
        });

        console.log('✅ Emails sent via Resend');
      } catch (emailError) {
        console.warn('⚠️ Email sending failed (continuing without email):', emailError.message);
        // Continue even if email fails - at least form submission works
      }
    } else {
      console.log('ℹ️ RESEND_API_KEY not set - skipping email sending');
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