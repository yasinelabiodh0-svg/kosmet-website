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

    // TODO: Send email via Resend/SendGrid
    // For now, just log and return success
    
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