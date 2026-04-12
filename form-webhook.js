#!/usr/bin/env node

/**
 * Formspree Webhook + Custom Email Handler
 * 
 * This script:
 * 1. Receives Formspree webhook data
 * 2. Sends email to support@kosmet.io
 * 3. Sends confirmation to visitor
 * 4. Logs submissions
 * 
 * Deploy to Vercel: vercel --prod
 */

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'support@kosmet.io',
    pass: process.env.GMAIL_PASS || 'your-app-password'
  }
});

// Formspree webhook endpoint
app.post('/api/formspree-webhook', async (req, res) => {
  try {
    const formData = req.body;
    
    console.log('Form submission received:', {
      clinic: formData.clinicName,
      email: formData.email,
      timestamp: new Date().toISOString()
    });
    
    // 1. Send email to support@kosmet.io
    await transporter.sendMail({
      from: '"Kosmet Form" <support@kosmet.io>',
      to: 'support@kosmet.io',
      subject: `New AI Audit Request - ${formData.clinicName || 'Unknown Clinic'}`,
      html: `
        <h2>New AI Audit Request</h2>
        <p><strong>Clinic:</strong> ${formData.clinicName}</p>
        <p><strong>Contact:</strong> ${formData.contactName} (${formData.contactRole})</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Location:</strong> ${formData.city}, ${formData.state}</p>
        <p><strong>Website:</strong> ${formData.website || 'Not provided'}</p>
        <p><strong>Years in Business:</strong> ${formData.yearsBusiness}</p>
        <p><strong>Monthly Patients:</strong> ${formData.monthlyPatients}</p>
        <p><strong>Services:</strong> ${Array.isArray(formData.services) ? formData.services.join(', ') : formData.services}</p>
        <p><strong>Additional Info:</strong> ${formData.additionalInfo || 'None'}</p>
        <hr>
        <p><em>Received: ${new Date().toLocaleString()}</em></p>
      `
    });
    
    // 2. Send confirmation email to visitor
    if (formData.email) {
      await transporter.sendMail({
        from: '"Kosmet" <support@kosmet.io>',
        to: formData.email,
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
        `
      });
    }
    
    // 3. Log to console/file
    const logEntry = {
      timestamp: new Date().toISOString(),
      clinic: formData.clinicName,
      email: formData.email,
      ip: req.ip
    };
    
    console.log('Submission processed:', logEntry);
    
    // 4. Return success
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      redirect: 'https://kosmet.io/audit-thank-you.html'
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    service: 'Kosmet Form Webhook',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Form webhook server running on port ${PORT}`);
});

module.exports = app;