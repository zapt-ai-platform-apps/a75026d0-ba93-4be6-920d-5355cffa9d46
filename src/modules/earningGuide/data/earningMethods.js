const earningMethods = [
  {
    id: 'freelancing',
    title: 'Freelancing',
    icon: '💼',
    description: 'Offer your skills and services to clients around the world.',
    content: `
      <p>Freelancing allows you to leverage your skills to earn money online without a traditional employer. You can work on projects for clients globally, often setting your own hours and rates.</p>

      <h3>Popular freelancing platforms:</h3>
      <ul>
        <li><strong>Upwork</strong> - One of the largest freelancing platforms with opportunities in programming, writing, design, and more.</li>
        <li><strong>Fiverr</strong> - Create "gigs" offering specific services, starting at $5.</li>
        <li><strong>Freelancer</strong> - Bid on projects and compete with other freelancers.</li>
        <li><strong>Toptal</strong> - For top-tier freelancers in development, design, finance, and project management.</li>
      </ul>

      <h3>Common freelancing categories:</h3>
      <ul>
        <li>Web Development</li>
        <li>Graphic Design</li>
        <li>Content Writing</li>
        <li>Digital Marketing</li>
        <li>Virtual Assistance</li>
        <li>Accounting & Bookkeeping</li>
        <li>Translation</li>
        <li>Video Editing</li>
      </ul>

      <h3>Tips for successful freelancing:</h3>
      <ol>
        <li>Create a strong profile highlighting your skills and experience</li>
        <li>Start with lower rates to build reviews, then increase them</li>
        <li>Communicate clearly and promptly with clients</li>
        <li>Deliver high-quality work on time</li>
        <li>Ask satisfied clients for testimonials</li>
        <li>Continuously improve your skills to stay competitive</li>
      </ol>
    `,
    difficulty: 'Medium',
    startupCost: 'Low',
    earningPotential: 'High',
    timeCommitment: 'Flexible'
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    icon: '🎬',
    description: 'Create and monetize content on various platforms.',
    content: `
      <p>Content creation involves producing videos, articles, podcasts, or other media that provides value to an audience. Once you build a following, there are multiple ways to monetize your content.</p>

      <h3>Popular content platforms:</h3>
      <ul>
        <li><strong>YouTube</strong> - Create videos and earn through ads, channel memberships, Super Chat, and more.</li>
        <li><strong>TikTok</strong> - Short-form video content with the TikTok Creator Fund and brand partnerships.</li>
        <li><strong>Instagram</strong> - Share photos and videos, monetize through sponsored posts and affiliate marketing.</li>
        <li><strong>Twitch</strong> - Live streaming platform popular for gaming, with subscriptions and donations.</li>
        <li><strong>Medium</strong> - Write articles and earn through the Partner Program.</li>
        <li><strong>Substack</strong> - Create paid newsletter subscriptions.</li>
      </ul>

      <h3>Monetization methods:</h3>
      <ul>
        <li>Ad revenue sharing</li>
        <li>Sponsored content</li>
        <li>Affiliate marketing</li>
        <li>Merchandise sales</li>
        <li>Direct support (donations, subscriptions)</li>
        <li>Licensing content</li>
      </ul>

      <h3>Tips for content creators:</h3>
      <ol>
        <li>Find your niche and target audience</li>
        <li>Create high-quality, consistent content</li>
        <li>Engage with your audience regularly</li>
        <li>Use multiple platforms to extend your reach</li>
        <li>Be patient - building an audience takes time</li>
        <li>Diversify your income streams</li>
      </ol>
    `,
    difficulty: 'Medium',
    startupCost: 'Low-Medium',
    earningPotential: 'High',
    timeCommitment: 'High'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    icon: '🛒',
    description: 'Sell products online through various platforms and methods.',
    content: `
      <p>E-commerce involves selling products online through your own store or established marketplaces. You can sell physical products, digital downloads, or dropshipped items.</p>

      <h3>E-commerce platforms and marketplaces:</h3>
      <ul>
        <li><strong>Shopify</strong> - Create your own online store with customizable templates.</li>
        <li><strong>Etsy</strong> - Marketplace for handmade, vintage, and unique factory-manufactured items.</li>
        <li><strong>Amazon</strong> - World's largest online marketplace with Fulfillment by Amazon option.</li>
        <li><strong>eBay</strong> - Auction-style and fixed-price marketplace for new and used items.</li>
        <li><strong>Walmart Marketplace</strong> - Reach Walmart's massive customer base.</li>
      </ul>

      <h3>E-commerce business models:</h3>
      <ul>
        <li><strong>Dropshipping</strong> - Sell products without holding inventory by having suppliers ship directly to customers.</li>
        <li><strong>Print on Demand</strong> - Create custom designs for products that are printed when ordered.</li>
        <li><strong>Private Labeling</strong> - Put your brand on generic products manufactured by a third party.</li>
        <li><strong>Handmade Products</strong> - Create and sell your own handcrafted items.</li>
        <li><strong>Digital Products</strong> - Sell ebooks, courses, templates, software, etc.</li>
      </ul>

      <h3>Tips for e-commerce success:</h3>
      <ol>
        <li>Research products and validate market demand before investing</li>
        <li>Focus on product quality and customer service</li>
        <li>Optimize your product listings with quality images and descriptions</li>
        <li>Implement effective marketing strategies (social media, email, SEO)</li>
        <li>Monitor your analytics and adjust your approach based on data</li>
        <li>Start small and scale as you learn what works</li>
      </ol>
    `,
    difficulty: 'Medium-High',
    startupCost: 'Medium',
    earningPotential: 'High',
    timeCommitment: 'High'
  },
  {
    id: 'affiliate-marketing',
    title: 'Affiliate Marketing',
    icon: '🔗',
    description: 'Promote products and earn commissions on sales.',
    content: `
      <p>Affiliate marketing involves promoting other companies' products and earning a commission for each sale or lead generated through your referral link.</p>

      <h3>Popular affiliate programs:</h3>
      <ul>
        <li><strong>Amazon Associates</strong> - Promote millions of products from Amazon's catalog.</li>
        <li><strong>ShareASale</strong> - Network with thousands of merchant programs across various niches.</li>
        <li><strong>CJ Affiliate</strong> - Access to many major brands and retailers.</li>
        <li><strong>ClickBank</strong> - Focus on digital products with high commission rates.</li>
        <li><strong>Awin</strong> - Global affiliate network with 15,000+ advertisers.</li>
      </ul>

      <h3>Promotion channels:</h3>
      <ul>
        <li>Blog or website</li>
        <li>YouTube videos</li>
        <li>Social media platforms</li>
        <li>Email marketing</li>
        <li>Podcasts</li>
        <li>Comparison websites</li>
      </ul>

      <h3>Tips for affiliate marketing:</h3>
      <ol>
        <li>Choose products that align with your audience's interests</li>
        <li>Only promote products you trust and would personally recommend</li>
        <li>Create honest, valuable content around the products</li>
        <li>Disclose your affiliate relationships (legally required in many jurisdictions)</li>
        <li>Track your performance and focus on what converts best</li>
        <li>Build an email list to promote products to engaged subscribers</li>
      </ol>
    `,
    difficulty: 'Medium',
    startupCost: 'Low',
    earningPotential: 'Medium-High',
    timeCommitment: 'Medium'
  },
  {
    id: 'online-courses',
    title: 'Online Courses & Coaching',
    icon: '🎓',
    description: 'Share your knowledge and skills through courses and coaching.',
    content: `
      <p>If you have expertise in a particular subject, you can create online courses or offer coaching services to share your knowledge and help others learn valuable skills.</p>

      <h3>Course platforms:</h3>
      <ul>
        <li><strong>Udemy</strong> - Marketplace with millions of students looking for courses.</li>
        <li><strong>Teachable</strong> - Create and sell courses under your own brand.</li>
        <li><strong>Thinkific</strong> - Platform to create, market, and sell online courses.</li>
        <li><strong>Coursera</strong> - Partner with Coursera to offer courses (selective).</li>
        <li><strong>Podia</strong> - All-in-one platform for courses, memberships, and digital downloads.</li>
      </ul>

      <h3>Coaching platforms:</h3>
      <ul>
        <li><strong>Clarity.fm</strong> - Offer paid advice by the minute.</li>
        <li><strong>Coach.me</strong> - Become a coach in various personal development areas.</li>
        <li><strong>BetterUp</strong> - Professional coaching platform.</li>
        <li><strong>Your own website</strong> - Create a coaching business with your own booking system.</li>
      </ul>

      <h3>Tips for course creators and coaches:</h3>
      <ol>
        <li>Choose a subject you're knowledgeable and passionate about</li>
        <li>Research demand for your topic before creating content</li>
        <li>Break complex subjects into manageable modules</li>
        <li>Include various content formats (video, text, quizzes, assignments)</li>
        <li>Provide genuine value and overdeliver on promises</li>
        <li>Collect and incorporate student feedback to improve your offerings</li>
        <li>Consider offering tiered pricing or subscription models</li>
      </ol>
    `,
    difficulty: 'Medium',
    startupCost: 'Low-Medium',
    earningPotential: 'High',
    timeCommitment: 'High initially, then lower'
  },
  {
    id: 'microtasks',
    title: 'Microtasks & Surveys',
    icon: '✓',
    description: 'Complete small tasks and surveys for quick earnings.',
    content: `
      <p>Microtasks and surveys are small jobs that require minimal time and skill. While the pay per task is low, they can be done in spare time and add up over time.</p>

      <h3>Microtask platforms:</h3>
      <ul>
        <li><strong>Amazon Mechanical Turk</strong> - Complete HITs (Human Intelligence Tasks) for various requesters.</li>
        <li><strong>Clickworker</strong> - Perform small tasks like data categorization, research, and more.</li>
        <li><strong>Appen</strong> - Work on data collection and annotation projects.</li>
        <li><strong>Lionbridge</strong> - Evaluate search results, ads, and other web content.</li>
        <li><strong>Microworkers</strong> - Complete small tasks posted by employers worldwide.</li>
      </ul>

      <h3>Survey sites:</h3>
      <ul>
        <li><strong>Swagbucks</strong> - Take surveys, watch videos, and complete offers for points.</li>
        <li><strong>Survey Junkie</strong> - Focus primarily on surveys with cash and gift card rewards.</li>
        <li><strong>Prolific</strong> - Complete academic research studies.</li>
        <li><strong>Pinecone Research</strong> - Invite-only survey panel with consistent pay.</li>
        <li><strong>YouGov</strong> - Share opinions on brands, politics, and current events.</li>
      </ul>

      <h3>Tips for microtask workers:</h3>
      <ol>
        <li>Sign up for multiple platforms to maximize opportunities</li>
        <li>Focus on tasks that pay well for the time required</li>
        <li>Be honest and attentive to avoid disqualifications</li>
        <li>Complete qualification tests to access higher-paying tasks</li>
        <li>Set realistic expectations - this is supplemental income, not a full-time salary</li>
        <li>Create a schedule to make consistent progress</li>
      </ol>
    `,
    difficulty: 'Low',
    startupCost: 'None',
    earningPotential: 'Low-Medium',
    timeCommitment: 'Low-Medium'
  },
  {
    id: 'investments',
    title: 'Online Investments',
    icon: '📈',
    description: 'Grow your money through various online investment platforms.',
    content: `
      <p>Online investments allow you to grow your money through various financial instruments. These options range from traditional investments to newer alternatives.</p>

      <h3>Investment types and platforms:</h3>
      <ul>
        <li><strong>Stock Market</strong> - Platforms like Robinhood, E*TRADE, and TD Ameritrade for trading stocks.</li>
        <li><strong>Cryptocurrency</strong> - Coinbase, Binance, and Kraken for buying and trading crypto.</li>
        <li><strong>Real Estate Crowdfunding</strong> - Fundrise, RealtyMogul, and Crowdstreet for real estate investment.</li>
        <li><strong>Peer-to-Peer Lending</strong> - Prosper and Funding Circle for lending to individuals or businesses.</li>
        <li><strong>Robo-Advisors</strong> - Betterment, Wealthfront, and M1 Finance for automated investing.</li>
      </ul>

      <h3>Key investment considerations:</h3>
      <ul>
        <li>Risk tolerance - higher risk can mean higher returns but also greater losses</li>
        <li>Time horizon - longer timeframes can help weather market volatility</li>
        <li>Diversification - spreading investments across different assets</li>
        <li>Fees and expenses - these can significantly impact returns over time</li>
        <li>Tax implications - different investments have different tax treatments</li>
      </ul>

      <h3>Tips for online investors:</h3>
      <ol>
        <li>Do thorough research before investing your money</li>
        <li>Start small and increase investments as you gain experience</li>
        <li>Never invest money you can't afford to lose</li>
        <li>Consider consulting with a financial advisor for personalized advice</li>
        <li>Stay informed about market trends and economic news</li>
        <li>Focus on long-term growth rather than short-term gains</li>
        <li>Regularly review and rebalance your portfolio</li>
      </ol>

      <p><strong>Disclaimer:</strong> This information is educational only and not investment advice. All investments involve risk, including the potential loss of principal.</p>
    `,
    difficulty: 'Medium-High',
    startupCost: 'Varies',
    earningPotential: 'Varies',
    timeCommitment: 'Low-Medium'
  }
];

export default earningMethods;