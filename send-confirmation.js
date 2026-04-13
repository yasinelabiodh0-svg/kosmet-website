#!/usr/bin/env node

/**
 * Send confirmation email via Resend
 * Run this when FormSubmit.co sends you a lead
 */

const RESEND_API_KEY = 're_XPpaPiXC_7fYT5AW9NRJU4Qi3SfqjYiFA';

async function sendConfirmationEmail(leadData) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kosmet <onboarding@resend.dev>',
        to: [leadData.email],
        subject: `Your AI Audit is Being Created - ${leadData.clinicName}`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #6B46C1 0%, #805AD5 100%); padding: 32px; border-radius: 12px 12px 0 0; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">Your AI Audit is Being Created</h1>
              <p style="opacity: 0.9; margin-top: 8px;">Thank you for requesting an AI visibility audit</p>
            </div>
            
            <div style="padding: 32px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p>Hi <strong>${leadData.contactName}</strong>,</p>
              
              <p>Thank you for requesting an AI visibility audit for <strong style="color: #6B46C1;">${leadData.clinicName}</strong>.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #10B981;">
                <h3 style="margin-top: 0; color: #065f46;">✅ What happens next:</h3>
                <ol style="margin: 12px 0; padding-left: 20px;">
                  <li><strong>Our specialists analyze</strong> your clinic's AI visibility (ChatGPT, Perplexity, Claude)</li>
                  <li><strong>We research competitors</strong> in ${leadData.city} and identify specific gaps</li>
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

    if (response.ok) {
      console.log('✅ Confirmation email sent to:', leadData.email);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Failed to send email:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
}

// Test the function
if (require.main === module) {
  const testLead = {
    clinicName: 'Test Clinic',
    contactName: 'Test Contact',
    email: 'test@example.com',
    city: 'Test City'
  };
  
  console.log('Testing Resend email sending...');
  sendConfirmationEmail(testLead);
}

module.exports = { sendConfirmationEmail };