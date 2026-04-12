// Blog posts data for Kosmet.io
const blogPosts = [
    {
        id: 1,
        title: "How AI Search is Revolutionizing Med Spa Marketing in 2026",
        excerpt: "Discover why traditional SEO is no longer enough and how ChatGPT is changing patient discovery for aesthetic clinics.",
        category: "AI Search Trends",
        date: "April 10, 2026",
        readTime: "8 min read",
        slug: "how-ai-search-is-revolutionizing-med-spa-marketing-in-2026"
    },
    {
        id: 2,
        title: "ChatGPT vs Google: Where Patients Search Now for Med Spas",
        excerpt: "Analysis of patient search behavior shows AI tools are becoming the primary discovery method for aesthetic treatments.",
        category: "Patient Behavior",
        date: "April 3, 2026",
        readTime: "7 min read",
        slug: "chatgpt-vs-google-where-patients-search-now-for-med-spas"
    },
    {
        id: 3,
        title: "Answer Engine Optimization (AEO): The Complete Guide for Med Spas",
        excerpt: "Everything med spa owners need to know about optimizing for AI search and getting recommended by ChatGPT.",
        category: "AEO Strategies",
        date: "March 27, 2026",
        readTime: "10 min read",
        slug: "answer-engine-optimization-aeo-the-complete-guide-for-med-spas"
    },
    {
        id: 4,
        title: "Case Study: $15,000 ROI in First Month with AEO Implementation",
        excerpt: "How a Los Angeles med spa generated $15,000 in new patient revenue within 30 days of AEO optimization.",
        category: "Case Studies",
        date: "March 20, 2026",
        readTime: "9 min read",
        slug: "case-study-15000-roi-in-first-month-with-aeo-implementation"
    },
    {
        id: 5,
        title: "5 Signs Your Med Spa is Invisible to AI Search (And How to Fix It)",
        excerpt: "Warning signs that your aesthetic clinic isn't showing up in ChatGPT and other AI search tools.",
        category: "Diagnostics",
        date: "March 13, 2026",
        readTime: "6 min read",
        slug: "5-signs-your-med-spa-is-invisible-to-ai-search-and-how-to-fix-it"
    },
    {
        id: 6,
        title: "The Future of Patient Acquisition: AI Search Dominance by 2027",
        excerpt: "Predictions for how AI search will transform med spa marketing and patient acquisition in the coming year.",
        category: "Industry News",
        date: "March 6, 2026",
        readTime: "8 min read",
        slug: "the-future-of-patient-acquisition-ai-search-dominance-by-2027"
    },
    {
        id: 7,
        title: "Structured Data for Med Spas: What AI Needs to Understand Your Clinic",
        excerpt: "A practical guide to implementing schema markup that helps AI systems recognize and recommend your med spa.",
        category: "Technical Guide",
        date: "February 27, 2026",
        readTime: "11 min read",
        slug: "structured-data-for-med-spas-what-ai-needs-to-understand-your-clinic"
    },
    {
        id: 8,
        title: "Building Authority Signals That ChatGPT Actually Cares About",
        excerpt: "Learn which authority signals matter most to AI systems and how to build them for your med spa.",
        category: "AEO Strategies",
        date: "February 20, 2026",
        readTime: "7 min read",
        slug: "building-authority-signals-that-chatgpt-actually-cares-about"
    },
    {
        id: 9,
        title: "Local SEO vs AEO: Which Should Med Spas Prioritize in 2026?",
        excerpt: "A comparative analysis of local SEO and AEO strategies for med spas, with recommendations for 2026.",
        category: "Marketing Tips",
        date: "February 13, 2026",
        readTime: "9 min read",
        slug: "local-seo-vs-aeo-which-should-med-spas-prioritize-in-2026"
    },
    {
        id: 10,
        title: "How to Optimize Your Google Business Profile for AI Search",
        excerpt: "Step-by-step guide to optimizing your GBP for better visibility in ChatGPT and other AI search tools.",
        category: "Technical Guide",
        date: "February 6, 2026",
        readTime: "8 min read",
        slug: "how-to-optimize-your-google-business-profile-for-ai-search"
    },
    {
        id: 11,
        title: "Patient Testimonials That Boost Your AI Search Visibility",
        excerpt: "How to collect and display patient testimonials in ways that improve your AI search rankings.",
        category: "Marketing Tips",
        date: "January 30, 2026",
        readTime: "6 min read",
        slug: "patient-testimonials-that-boost-your-ai-search-visibility"
    },
    {
        id: 12,
        title: "The Role of Medical Directories in AI Search Rankings",
        excerpt: "Which medical directories matter most for AI search and how to optimize your listings.",
        category: "AEO Strategies",
        date: "January 23, 2026",
        readTime: "7 min read",
        slug: "the-role-of-medical-directories-in-ai-search-rankings"
    },
    {
        id: 13,
        title: "Content Strategy for AI: What Questions Do Patients Ask ChatGPT?",
        excerpt: "Research-based insights into the questions patients ask AI about med spas and aesthetic treatments.",
        category: "Content Strategy",
        date: "January 16, 2026",
        readTime: "8 min read",
        slug: "content-strategy-for-ai-what-questions-do-patients-ask-chatgpt"
    },
    {
        id: 14,
        title: "Technical SEO vs AEO: Key Differences Every Med Spa Should Know",
        excerpt: "Understanding the technical differences between traditional SEO and Answer Engine Optimization.",
        category: "Technical Guide",
        date: "January 9, 2026",
        readTime: "10 min read",
        slug: "technical-seo-vs-aeo-key-differences-every-med-spa-should-know"
    },
    {
        id: 15,
        title: "Measuring AI Search Performance: Metrics That Matter",
        excerpt: "How to track and measure your med spa's performance in AI search results.",
        category: "Analytics",
        date: "January 2, 2026",
        readTime: "7 min read",
        slug: "measuring-ai-search-performance-metrics-that-matter"
    },
    {
        id: 16,
        title: "Competitor Analysis for AI Search: See Who's Winning",
        excerpt: "How to analyze your competitors' AI search presence and identify opportunities.",
        category: "Competitive Analysis",
        date: "December 26, 2025",
        readTime: "8 min read",
        slug: "competitor-analysis-for-ai-search-see-whos-winning"
    },
    {
        id: 17,
        title: "Schema Markup for Aesthetic Clinics: A Practical Guide",
        excerpt: "Step-by-step instructions for implementing schema markup specific to med spas and aesthetic clinics.",
        category: "Technical Guide",
        date: "December 19, 2025",
        readTime: "12 min read",
        slug: "schema-markup-for-aesthetic-clinics-a-practical-guide"
    },
    {
        id: 18,
        title: "Voice Search Optimization for Med Spas: The Next Frontier",
        excerpt: "How voice search through AI assistants is changing patient discovery and what med spas need to do.",
        category: "Emerging Trends",
        date: "December 12, 2025",
        readTime: "7 min read",
        slug: "voice-search-optimization-for-med-spas-the-next-frontier"
    },
    {
        id: 19,
        title: "AI Search Algorithms: How ChatGPT Ranks Local Businesses",
        excerpt: "An inside look at how AI search algorithms evaluate and rank local businesses like med spas.",
        category: "Technical Guide",
        date: "December 5, 2025",
        readTime: "9 min read",
        slug: "ai-search-algorithms-how-chatgpt-ranks-local-businesses"
    },
    {
        id: 20,
        title: "Reputation Management in the Age of AI Search",
        excerpt: "How online reputation affects AI search rankings and strategies for managing it effectively.",
        category: "Reputation Management",
        date: "November 28, 2025",
        readTime: "8 min read",
        slug: "reputation-management-in-the-age-of-ai-search"
    },
    {
        id: 21,
        title: "Social Proof Signals That Boost AI Recommendations",
        excerpt: "Which social proof elements matter most to AI systems when recommending med spas.",
        category: "Marketing Tips",
        date: "November 21, 2025",
        readTime: "6 min read",
        slug: "social-proof-signals-that-boost-ai-recommendations"
    },
    {
        id: 22,
        title: "Mobile Optimization for AI Search Users",
        excerpt: "How mobile user experience affects your med spa's visibility in AI search results.",
        category: "Technical Guide",
        date: "November 14, 2025",
        readTime: "7 min read",
        slug: "mobile-optimization-for-ai-search-users"
    },
    {
        id: 23,
        title: "Video Content and AI Search: Does It Matter?",
        excerpt: "Research on whether video content affects AI search rankings for med spas.",
        category: "Content Strategy",
        date: "November 7, 2025",
        readTime: "6 min read",
        slug: "video-content-and-ai-search-does-it-matter"
    },
    {
        id: 24,
        title: "Patient Education Content That Ranks in AI Answers",
        excerpt: "How to create patient education content that gets featured in AI-generated answers.",
        category: "Content Strategy",
        date: "October 31, 2025",
        readTime: "8 min read",
        slug: "patient-education-content-that-ranks-in-ai-answers"
    },
    {
        id: 25,
        title: "Local Citations: The Foundation of AI Search Visibility",
        excerpt: "The importance of local citations for AI search and how to build them effectively.",
        category: "Local SEO",
        date: "October 24, 2025",
        readTime: "7 min read",
        slug: "local-citations-the-foundation-of-ai-search-visibility"
    },
    {
        id: 26,
        title: "Medical Credentials and AI Search: Why Qualifications Matter",
        excerpt: "How provider credentials and qualifications affect AI search rankings for med spas.",
        category: "Authority Building",
        date: "October 17, 2025",
        readTime: "6 min read",
        slug: "medical-credentials-and-ai-search-why-qualifications-matter"
    },
    {
        id: 27,
        title: "Before & After Photos: Do They Impact AI Recommendations?",
        excerpt: "Research on whether visual proof of results affects AI search rankings.",
        category: "Content Strategy",
        date: "October 10, 2025",
        readTime: "5 min read",
        slug: "before-after-photos-do-they-impact-ai-recommendations"
    },
    {
        id: 28,
        title: "Service Page Optimization for AI Understanding",
        excerpt: "How to structure and optimize service pages for better AI comprehension.",
        category: "Technical Guide",
        date: "October 3, 2025",
        readTime: "9 min read",
        slug: "service-page-optimization-for-ai-understanding"
    },
    {
        id: 29,
        title: "Blog Content That Answers Patient Questions for AI",
        excerpt: "How to structure blog content to answer the questions patients ask AI about med spas.",
        category: "Content Strategy",
        date: "September 26, 2025",
        readTime: "8 min read",
        slug: "blog-content-that-answers-patient-questions-for-ai"
    },
    {
        id: 30,
        title: "FAQ Pages That Dominate AI Search Results",
        excerpt: "How to create FAQ pages that get featured prominently in AI-generated answers.",
        category: "Technical Guide",
        date: "September 19, 2025",
        readTime: "7 min read",
        slug: "faq-pages-that-dominate-ai-search-results"
    },
    {
        id: 31,
        title: "Review Generation Strategies for AI Search Boost",
        excerpt: "Proven strategies for generating reviews that improve your AI search visibility.",
        category: "Reputation Management",
        date: "September 12, 2025",
        readTime: "6 min read",
        slug: "review-generation-strategies-for-ai-search-boost"
    },
    {
        id: 32,
        title: "Price Transparency and AI Search: What to Share",
        excerpt: "How price transparency affects AI search rankings and what information to disclose.",
        category: "Marketing Tips",
        date: "September 5, 2025",
        readTime: "7 min read",
        slug: "price-transparency-and-ai-search-what-to-share"
    },
    {
        id: 33,
        title: "Treatment Descriptions That AI Systems Understand",
        excerpt: "How to write treatment descriptions that AI systems can properly interpret and recommend.",
        category: "Content Strategy",
        date: "August 29, 2025",
        readTime: "8 min read",
        slug: "treatment-descriptions-that-ai-systems-understand"
    },
    {
        id: 34,
        title: "Location Pages for Multi-Clinic Med Spas",
        excerpt: "Best practices for creating location pages that perform well in AI search.",
        category: "Local SEO",
        date: "August 22, 2025",
        readTime: "9 min read",
        slug: "location-pages-for-multi-clinic-med-spas"
    },
    {
        id: 35,
        title: "Provider Bios That Build AI Authority",
        excerpt: "How to structure provider bios to maximize authority signals for AI search.",
        category: "Authority Building",
        date: "August 15, 2025",
        readTime: "7 min read",
        slug: "provider-bios-that-build-ai-authority"
    },
    {
        id: 36,
        title: "Awards and Certifications: AI Search Credibility Boosters",
        excerpt: "Which awards and certifications matter most for AI search credibility.",
        category: "Authority Building",
        date: "August 8, 2025",
        readTime: "6 min read",
        slug: "awards-and-certifications-ai-search-credibility-boosters"
    },
    {
        id: 37,
        title: "Partnerships and Collaborations for AI Visibility",
        excerpt: "How strategic partnerships can boost your med spa's AI search visibility.",
        category: "Marketing Tips",
        date: "August 1, 2025",
        readTime: "7 min read",
        slug: "partnerships-and-collaborations-for-ai-visibility"
    },
    {
        id: 38,
        title: "Event Marketing in the AI Search Era",
        excerpt: "How to promote events in ways that improve your AI search presence.",
        category: "Event Marketing",
        date: "July 25, 2025",
        readTime: "6 min read",
        slug: "event-marketing-in-the-ai-search-era"
    },
    {
        id: 39,
        title: "Email Marketing Integration with AI Search Strategy",
        excerpt: "How to align email marketing with your AI search optimization efforts.",
        category: "Marketing Integration",
        date: "July 18, 2025",
        readTime: "8 min read",
        slug: "email-marketing-integration-with-ai-search-strategy"
    },
    {
        id: 40,
        title: "Social Media Signals That Influence AI Rankings",
        excerpt: "Which social media activities affect AI search rankings for med spas.",
        category: "Social Media",
        date: "July 11, 2025",
        readTime: "7 min read",
        slug: "social-media-signals-that-influence-ai-rankings"
    },
    {
        id: 41,
        title: "Paid Advertising vs Organic AI Search: ROI Comparison",
        excerpt: "Comparative analysis of ROI from paid advertising vs organic AI search optimization.",
        category: "ROI Analysis",
        date: "July 4, 2025",
        readTime: "9 min read",
        slug: "paid-advertising-vs-organic-ai-search-roi-comparison"
    },
    {
        id: 42,
        title: "Patient Journey Mapping for AI Search Optimization",
        excerpt: "How to map the patient journey to optimize for AI search at every stage.",
        category: "Patient Experience",
        date: "June 27, 2025",
        readTime: "8 min read",
        slug: "patient-journey-mapping-for-ai-search-optimization"
    },
    {
        id: 43,
        title: "Conversion Optimization for AI-Referred Traffic",
        excerpt: "How to optimize your website to convert visitors who come from AI recommendations.",
        category: "Conversion Optimization",
        date: "June 20, 2025",
        readTime: "7 min read",
        slug: "conversion-optimization-for-ai-referred-traffic"
    },
    {
        id: 44,
        title: "Retention Strategies for AI-Acquired Patients",
        excerpt: "How to retain patients who discover your med spa through AI search.",
        category: "Patient Retention",
        date: "June 13, 2025",
        readTime: "6