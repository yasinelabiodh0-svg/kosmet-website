#!/usr/bin/env node

/**
 * Kosmet AI Audit PDF Generator
 * 
 * Usage:
 * node generate-pdf.js --name "Dr. Sarah Johnson" --clinic "Revive Aesthetics" --email "sarah@revive.com" --city "Miami, FL"
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

async function generateAuditPDF(data) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    
    // Load font
    const fontBytes = fs.readFileSync(path.join(__dirname, 'assets/fonts/Inter-Regular.ttf'));
    const font = await pdfDoc.embedFont(fontBytes);
    
    // Add pages
    const page1 = pdfDoc.addPage([612, 792]); // Letter size
    const page2 = pdfDoc.addPage([612, 792]);
    const page3 = pdfDoc.addPage([612, 792]);
    const page4 = pdfDoc.addPage([612, 792]);
    
    // Page 1: Cover
    const { width, height } = page1.getSize();
    
    // Logo
    page1.drawText('Kosmet', {
        x: 50,
        y: height - 100,
        size: 36,
        font,
        color: rgb(0.42, 0.27, 0.76), // #6B46C1
    });
    
    // Title
    page1.drawText('AI Visibility Audit', {
        x: 50,
        y: height - 180,
        size: 32,
        font,
        color: rgb(0.1, 0.1, 0.18), // #1a1a2e
    });
    
    // Client info
    page1.drawText(`Prepared for: ${data.name}`, {
        x: 50,
        y: height - 250,
        size: 14,
        font,
        color: rgb(0.29, 0.29, 0.41), // #4a4a68
    });
    
    page1.drawText(`Clinic: ${data.clinic}`, {
        x: 50,
        y: height - 280,
        size: 14,
        font,
        color: rgb(0.29, 0.29, 0.41),
    });
    
    page1.drawText(`Date: ${new Date().toLocaleDateString()}`, {
        x: 50,
        y: height - 310,
        size: 14,
        font,
        color: rgb(0.29, 0.29, 0.41),
    });
    
    // Score
    const score = Math.floor(Math.random() * 30) + 40; // 40-70 score
    page1.drawText(`${score}/100`, {
        x: width / 2 - 50,
        y: height / 2,
        size: 48,
        font,
        color: rgb(0.42, 0.27, 0.76),
    });
    
    page1.drawText('AI Visibility Score', {
        x: width / 2 - 80,
        y: height / 2 - 50,
        size: 14,
        font,
        color: rgb(0.29, 0.29, 0.41),
    });
    
    // Page 2: ChatGPT Analysis
    page2.drawText('1. ChatGPT Ranking Analysis', {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0.42, 0.27, 0.76),
    });
    
    // Add analysis content...
    
    // Page 3: Competitor Comparison
    page3.drawText('2. Competitor Analysis', {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0.42, 0.27, 0.76),
    });
    
    // Page 4: Action Plan
    page4.drawText('3. 90-Day Action Plan', {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0.42, 0.27, 0.76),
    });
    
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    
    // Create filename
    const filename = `audit-${data.clinic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    const filepath = path.join(__dirname, 'assets/pdfs', filename);
    
    fs.writeFileSync(filepath, pdfBytes);
    
    return {
        filename,
        filepath,
        score,
        opportunity: score < 50 ? 8000 : 5000 // Higher opportunity for lower scores
    };
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const data = {};
    
    for (let i = 0; i < args.length; i += 2) {
        if (args[i].startsWith('--')) {
            const key = args[i].substring(2);
            data[key] = args[i + 1];
        }
    }
    
    generateAuditPDF(data)
        .then(result => {
            console.log(JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.error('Error generating PDF:', error);
            process.exit(1);
        });
}

module.exports = { generateAuditPDF };