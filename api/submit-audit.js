// IMPROVED VERSION with spam prevention and deliverability fixes
// Replace the existing submit-audit.js with this

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests for actual submissions
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const formData = req.body;
    
    // Validate required fields
    if (!formData.email || !formData.clinicName || !formData.contactName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: email, clinicName, contactName' 
      });
    }

    console.log('📋 Audit form submission received:', {
      clinic: formData.clinicName,
      email: formData.email,
      timestamp: new Date().toISOString()
    });

    // Note: If RESEND_API_KEY is not set, emails will fail but form still works
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    console.log('🔧 RESEND_API_KEY check:', {
      hasKey: !!RESEND_API_KEY,
      keyLength: RESEND_API_KEY ? RESEND_API_KEY.length : 0,
      keyStartsWith: RESEND_API_KEY ? RESEND_API_KEY.substring(0, 10) + '...' : 'none'
    });
    
    if (RESEND_API_KEY) {
      console.log('📧 RESEND_API_KEY found, sending emails');
      try {
        // Email 1: To support@kosmet.io (lead notification) - IMPROVED
        console.log('📧 Sending lead notification to support@kosmet.io');
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Kosmet <updates@updates.kosmet.io>',
            to: ['support@kosmet.io'],
            reply_to: formData.email, // Important: allows replying to customer
            subject: `New AI Audit Request: ${formData.clinicName}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Audit Request</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #6B46C1 0%, #805AD5 100%); padding: 24px; color: white; text-align: center;">
                  <h1 style="margin: 0; font-size: 20px;">New AI Audit Request</h1>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">Action required within 24 hours</p>
                </div>
                
                <div style="padding: 24px; background: #fff;">
                  <h2 style="color: #6B46C1; margin-top: 0;">Clinic Details</h2>
                  
                  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Clinic:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.clinicName}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Contact:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.contactName} (${formData.contactRole})</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.phone || 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Location:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.city}, ${formData.state}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Years in Business:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.yearsBusiness}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Monthly Patients:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.monthlyPatients}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Services:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.services?.join(', ') || 'None'}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Marketing:</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${formData.marketing?.join(', ') || 'None'}</td></tr>
                  </table>
                  
                  <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #1e40af;">Action Required</h3>
                    <p><strong>Next steps:</strong></p>
                    <ol>
                      <li>Add to CRM</li>
                      <li>Schedule call: <a href="https://calendly.com/kosmet-support/15-min-ai-audit-review">Calendly Link</a></li>
                      <li>Prepare audit PDF (due in 24 hours)</li>
                    </ol>
                  </div>
                  
                  <p style="color: #6b7280; font-size: 14px; text-align: center;">
                    Lead ID: ${Date.now().toString(36)} | Submitted via kosmet.io
                  </p>
                </div>
                
                <div style="padding: 16px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
                  <p style="margin: 0;">
                    Kosmet | AI Visibility for Medical Spas<br>
                    <a href="https://kosmet.io" style="color: #6B46C1;">kosmet.io</a> | 
                    <a href="https://kosmet.io/privacy" style="color: #6B46C1;">Privacy Policy</a>
                  </p>
                </div>
              </body>
              </html>
            `,
          }),
        });

        // Email 2: Confirmation to visitor - IMPROVED with spam prevention
        console.log('📧 Sending confirmation to:', formData.email);
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Kosmet <updates@updates.kosmet.io>',
            to: [formData.email],
            reply_to: 'support@kosmet.io', // Important for deliverability
            subject: `Your AI Visibility Audit Request - ${formData.clinicName}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>AI Audit Confirmation</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; padding: 24px 0;">
                  <h1 style="color: #6B46C1; margin: 0; font-size: 24px;">Kosmet</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI Visibility for Medical Spas</p>
                </div>
                
                <div style="padding: 24px; background: #fff; border-radius: 8px;">
                  <h2 style="color: #6B46C1; margin-top: 0;">Hi ${formData.contactName},</h2>
                  
                  <p>Thank you for requesting an AI visibility audit for <strong>${formData.clinicName}</strong>.</p>
                  
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #10B981;">
                    <h3 style="color: #065f46; margin-top: 0;">What happens next:</h3>
                    <ol style="margin: 12px 0; padding-left: 20px;">
                      <li><strong>Our specialists analyze</strong> your clinic's AI visibility across platforms</li>
                      <li><strong>We research competitors</strong> in ${formData.city} and identify specific gaps</li>
                      <li><strong>We calculate revenue opportunity</strong> based on missing AI-driven patient acquisition</li>
                      <li><strong>You receive a detailed 4-page PDF audit</strong> within 24 hours</li>
                    </ol>
                  </div>
                  
                  <p><strong>Next step:</strong> Our team will review your submission and begin the audit process. You'll receive your personalized PDF via email within 24 hours.</p>
                  
                  <p>If you have any questions, simply reply to this email or contact us at <a href="mailto:support@kosmet.io">support@kosmet.io</a>.</p>
                  
                  <p>Best regards,<br>
                  <strong>The Kosmet Team</strong></p>
                </div>
                
                <div style="padding: 16px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
                  <p style="margin: 0 0 8px 0;">
                    Kosmet | AI Visibility for Medical Spas<br>
                    <a href="https://kosmet.io" style="color: #6B46C1;">kosmet.io</a> | 
                    <a href="https://kosmet.io/privacy" style="color: #6B46C1;">Privacy Policy</a>
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                    This email was sent to ${formData.email} because you requested an AI visibility audit.<br>
                    If you no longer wish to receive emails, please <a href="https://kosmet.io/unsubscribe?email=${encodeURIComponent(formData.email)}" style="color: #6B46C1;">unsubscribe here</a>.
                  </p>
                </div>
              </body>
              </html>
            `,
          }),
        });

        console.log('✅ Both emails sent successfully');
      } catch (emailError) {
        console.error('❌ Email sending failed:', {
          message: emailError.message,
          stack: emailError.stack
        });
        // Don't fail the form submission if emails fail
      }
    } else {
      console.log('ℹ️ RESEND_API_KEY not set - skipping email sending');
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      redirect: 'https://kosmet.io/audit-thank-you.html',
      submissionId: Date.now().toString(36),
    });

  } catch (error) {
    console.error('❌ Form processing error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}