#!/usr/bin/env node

/**
 * Test Formspree Submission
 * 
 * This tests if Formspree is receiving data correctly
 */

const https = require('https');

const formData = new URLSearchParams({
  'clinicName': 'Diagnostic Test Clinic',
  'yearsBusiness': '1-3',
  'numProviders': '2-3',
  'city': 'Test City',
  'state': 'CA',
  'serviceRadius': '10-25',
  'monthlyPatients': '50-100',
  'contactName': 'Test Diagnostic',
  'contactRole': 'Owner',
  'email': 'diagnostic-test@example.com',
  'agreeTerms': 'on',
  'services': 'Botox',
  'marketing': 'SEO',
  '_subject': 'DIAGNOSTIC TEST - Formspree Check',
  '_replyto': 'support@kosmet.io',
  '_next': 'https://kosmet.io/audit-thank-you.html'
});

const options = {
  hostname: 'formspree.io',
  port: 443,
  path: '/f/meevjale',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': formData.toString().length,
    'User-Agent': 'Kosmet-Diagnostic/1.0'
  }
};

console.log('Testing Formspree submission...');
console.log('Form ID: meevjale');
console.log('Data being sent:', Object.fromEntries(formData));

const req = https.request(options, (res) => {
  console.log('\n=== RESPONSE ===');
  console.log('Status Code:', res.statusCode);
  console.log('Status Message:', res.statusMessage);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse Body (first 500 chars):');
    console.log(data.substring(0, 500));
    
    console.log('\n=== ANALYSIS ===');
    if (res.statusCode === 302) {
      console.log('✅ Formspree accepted submission (302 redirect)');
      console.log('Redirect Location:', res.headers.location);
      
      if (res.headers.location === 'https://kosmet.io/audit-thank-you.html') {
        console.log('✅ Correct redirect to thank you page');
      } else {
        console.log('❌ Wrong redirect location:', res.headers.location);
      }
    } else {
      console.log('❌ Formspree returned unexpected status:', res.statusCode);
    }
    
    // Check for Formspree cookies
    const cookies = res.headers['set-cookie'];
    if (cookies && cookies.some(c => c.includes('fs_'))) {
      console.log('✅ Formspree tracking cookies set');
    } else {
      console.log('⚠️ No Formspree cookies set (might be rate limited)');
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(formData.toString());
req.end();

console.log('\n=== INSTRUCTIONS ===');
console.log('1. Check Formspree dashboard: https://formspree.io/forms/meevjale');
console.log('2. Look for "Diagnostic Test Clinic" in submissions');
console.log('3. Check support@kosmet.io for email (check spam)');
console.log('4. If no email in Formspree dashboard, Formspree is not capturing data');
console.log('5. If email in dashboard but not in inbox, Formspree email is broken');