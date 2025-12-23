"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const blogContent: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  content: React.ReactNode;
}> = {
  "how-to-setup-thrift-store-without-clozet-life": {
    title: "How to Setup a Thrift Store Without Clozet.life",
    category: "Guide",
    readTime: "8 min read",
    date: "December 15, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Starting a thrift store without a dedicated platform requires more effort, but it&apos;s absolutely doable. Here&apos;s a comprehensive guide to help you get started.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Source Your Inventory</h2>
        <p className="text-muted-foreground mb-4">
          The first step is finding quality pre-loved items to sell. Here are some popular sourcing methods:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Your own wardrobe - Start with items you no longer wear</li>
          <li>Friends and family - Ask if they have clothes to declutter</li>
          <li>Local thrift stores and garage sales</li>
          <li>Online marketplaces for bulk buying</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Set Up Your Online Presence</h2>
        <p className="text-muted-foreground mb-4">
          Without a dedicated platform, you&apos;ll need to create your own storefront:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Create an Instagram business account</li>
          <li>Set up a WhatsApp business for order management</li>
          <li>Consider building a simple website using Shopify or WooCommerce</li>
          <li>List on marketplaces like OLX or Facebook Marketplace</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Photography and Listings</h2>
        <p className="text-muted-foreground mb-4">
          Good photos are crucial for selling clothes online:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Use natural lighting whenever possible</li>
          <li>Take photos from multiple angles</li>
          <li>Show any flaws or defects clearly</li>
          <li>Include measurements in your descriptions</li>
          <li>Be honest about the condition of items</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">4. Handle Payments</h2>
        <p className="text-muted-foreground mb-4">
          You&apos;ll need to set up your own payment collection:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>UPI payments via Google Pay, PhonePe, or Paytm</li>
          <li>Bank transfers for larger orders</li>
          <li>Cash on Delivery (risky but some customers prefer it)</li>
          <li>Payment gateways like Razorpay if you have a website</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">5. Manage Shipping</h2>
        <p className="text-muted-foreground mb-4">
          Shipping can be the trickiest part:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Partner with courier services like Delhivery, DTDC, or India Post</li>
          <li>Use shipping aggregators like Shiprocket</li>
          <li>Calculate shipping costs beforehand</li>
          <li>Package items securely</li>
          <li>Always provide tracking information</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">6. Customer Service</h2>
        <p className="text-muted-foreground mb-4">
          Building trust is essential in thrift selling:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Respond to queries promptly</li>
          <li>Be transparent about return policies</li>
          <li>Handle complaints professionally</li>
          <li>Ask for reviews and testimonials</li>
        </ul>

        <div className="bg-accent p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-accent-foreground mb-2">The Easier Way</h3>
          <p className="text-accent-foreground mb-4">
            All of this can be overwhelming, especially when you&apos;re just starting out. That&apos;s why we built Clozet.life - to handle payments, shipping, and the technical stuff so you can focus on what you do best: curating amazing fashion.
          </p>
          <Link href="/#waitlist">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Clozet.life Waitlist
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  "how-to-setup-thrift-store-with-clozet-life": {
    title: "How to Setup Your Thrift Store with Clozet.life",
    category: "Tutorial",
    readTime: "5 min read",
    date: "December 14, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Setting up your thrift store on Clozet.life takes less than 10 minutes. Here&apos;s how to get started.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Step 1: Join the Waitlist</h2>
        <p className="text-muted-foreground mb-6">
          We&apos;re currently in early access mode. Join our waitlist to get notified when it&apos;s your turn to set up your store. Early adopters get priority access and special perks!
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Step 2: Complete KYC</h2>
        <p className="text-muted-foreground mb-4">
          Once you&apos;re invited, you&apos;ll need to verify your identity:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Provide your Aadhaar number for identity verification</li>
          <li>Add your PAN card for payment settlements</li>
          <li>Link your bank account for receiving payments</li>
          <li>The entire process takes about 5 minutes</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Step 3: Customize Your Store</h2>
        <p className="text-muted-foreground mb-4">
          Make your store uniquely yours:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Choose your store URL (clozet.life/yourname)</li>
          <li>Add your store name and bio</li>
          <li>Upload a profile picture and banner</li>
          <li>Set your shipping preferences</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Step 4: Add Your First Items</h2>
        <p className="text-muted-foreground mb-4">
          Start listing your pre-loved pieces:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Upload clear photos of your items</li>
          <li>Add descriptions, sizes, and conditions</li>
          <li>Set your prices (we&apos;ll suggest optimal pricing)</li>
          <li>Categorize items for easy browsing</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Step 5: Share & Sell</h2>
        <p className="text-muted-foreground mb-4">
          You&apos;re ready to start selling:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Share your store link on Instagram, Twitter, and other platforms</li>
          <li>We handle all payment processing securely</li>
          <li>When you get an order, just pack and ship</li>
          <li>Money is transferred to your account after delivery</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">What&apos;s Included</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Your own store URL at clozet.life/yourname</li>
          <li>Secure payment processing</li>
          <li>Integrated shipping with tracking</li>
          <li>Customer support for buyers and sellers</li>
          <li>Analytics dashboard to track your sales</li>
          <li>Option to connect your own domain later</li>
        </ul>

        <div className="bg-primary/10 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-4">
            Join our waitlist today and be among the first Indian influencers to launch on Clozet.life.
          </p>
          <Link href="/#waitlist">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Waitlist Now
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  "pricing-your-thrift-items": {
    title: "How to Price Your Thrift Items Right",
    category: "Tips",
    readTime: "6 min read",
    date: "December 13, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Pricing is one of the biggest challenges for thrift sellers. Price too high, and items don&apos;t sell. Price too low, and you leave money on the table. Here&apos;s how to find the sweet spot.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Research the Market</h2>
        <p className="text-muted-foreground mb-6">
          Before pricing anything, spend time researching what similar items sell for. Check Instagram thrift stores, Depop, and other platforms to understand market rates for different brands and conditions.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">The 30-50% Rule</h2>
        <p className="text-muted-foreground mb-6">
          A good starting point is pricing pre-loved items at 30-50% of their original retail price, depending on condition. Designer or rare pieces can command higher percentages, while fast fashion typically sells for less.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Factors That Affect Pricing</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li><strong>Brand:</strong> Premium brands hold value better</li>
          <li><strong>Condition:</strong> Like-new items can be priced higher</li>
          <li><strong>Age:</strong> Vintage pieces may be worth more than recent items</li>
          <li><strong>Rarity:</strong> Limited editions or discontinued styles command premiums</li>
          <li><strong>Season:</strong> Winter clothes sell better before winter</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Leave Room for Negotiation</h2>
        <p className="text-muted-foreground mb-6">
          Indian buyers love to bargain. Consider pricing items 10-15% higher than your target selling price to leave room for negotiation while still hitting your desired margin.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Bundle Deals</h2>
        <p className="text-muted-foreground mb-6">
          Offering discounts on multiple items can help move inventory faster and increase your average order value. Consider &quot;Buy 2 Get 10% Off&quot; or similar promotions.
        </p>

        <div className="bg-accent p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-accent-foreground mb-2">Pro Tip</h3>
          <p className="text-accent-foreground">
            Track which items sell quickly and which sit in your inventory. This data will help you price better over time. On Clozet.life, we provide analytics to help you optimize your pricing strategy.
          </p>
        </div>
      </>
    ),
  },
  "photographing-clothes-for-thrift-store": {
    title: "Photography Tips for Thrift Sellers",
    category: "Tips",
    readTime: "7 min read",
    date: "December 12, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          In thrift selling, photos can make or break a sale. Here&apos;s how to take professional-looking photos using just your smartphone.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Lighting is Everything</h2>
        <p className="text-muted-foreground mb-6">
          Natural light is your best friend. Shoot near a window during daytime for soft, flattering light. Avoid harsh direct sunlight and artificial yellow lighting that can distort colors.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Choose a Clean Background</h2>
        <p className="text-muted-foreground mb-6">
          A plain white or neutral background keeps focus on the item. A simple white bedsheet or wall works perfectly. Avoid cluttered backgrounds that distract from the clothing.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Show Multiple Angles</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Front view (full item)</li>
          <li>Back view</li>
          <li>Close-up of details (buttons, embroidery, labels)</li>
          <li>Any flaws or defects</li>
          <li>Size label</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Flat Lay vs. Hanging</h2>
        <p className="text-muted-foreground mb-6">
          Flat lays work great for tops and accessories. Use hangers for dresses, jackets, and items that need to show their shape. A mannequin or model shot can really elevate your listings.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Edit Thoughtfully</h2>
        <p className="text-muted-foreground mb-4">
          Light editing can improve your photos, but don&apos;t overdo it. Adjust brightness and contrast if needed, but keep colors true to life. Buyers should receive what they see.
        </p>
      </>
    ),
  },
  "building-thrift-store-brand": {
    title: "Building Your Thrift Store Brand",
    category: "Guide",
    readTime: "6 min read",
    date: "December 11, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          A strong brand helps you stand out in the crowded thrift market. Here&apos;s how to create a memorable identity for your store.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Define Your Niche</h2>
        <p className="text-muted-foreground mb-6">
          What makes your store unique? Maybe you specialize in vintage dresses, streetwear, or affordable office wear. Having a clear niche helps attract the right customers.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Choose a Memorable Name</h2>
        <p className="text-muted-foreground mb-6">
          Your store name should be easy to remember, spell, and relate to what you sell. Check if the Instagram handle and domain are available before finalizing.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Consistent Visual Identity</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Choose 2-3 brand colors</li>
          <li>Use consistent fonts in your posts</li>
          <li>Maintain a cohesive photo editing style</li>
          <li>Create templates for your stories and posts</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Tell Your Story</h2>
        <p className="text-muted-foreground mb-6">
          Why did you start thrifting? Share your journey and values. Customers connect with authentic stories and are more likely to support sellers they feel connected to.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Engage Your Community</h2>
        <p className="text-muted-foreground mb-6">
          Building a brand isn&apos;t just about selling - it&apos;s about creating a community. Respond to comments, share styling tips, and celebrate sustainable fashion together.
        </p>
      </>
    ),
  },
  "sourcing-quality-thrift-items": {
    title: "Where to Source Quality Thrift Items",
    category: "Tips",
    readTime: "5 min read",
    date: "December 10, 2024",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          Finding good inventory is half the battle in thrift selling. Here are the best places to source quality pre-loved fashion in India.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Start With Your Own Closet</h2>
        <p className="text-muted-foreground mb-6">
          The easiest place to start is your own wardrobe. Items you no longer wear but are still in good condition are perfect for your first listings.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Friends and Family</h2>
        <p className="text-muted-foreground mb-6">
          Ask around - many people have clothes they want to declutter but don&apos;t want to throw away. Offer to sell on their behalf for a commission or buy items outright.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Local Thrift Markets</h2>
        <p className="text-muted-foreground mb-6">
          Cities like Delhi (Sarojini Nagar), Mumbai (Linking Road), and Bangalore have famous thrift markets. Visit early for the best finds and learn to spot quality pieces.
        </p>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Online Platforms</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>OLX and Facebook Marketplace for individual sellers</li>
          <li>Instagram closet clearouts</li>
          <li>WhatsApp groups for bulk buying</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">Tips for Sourcing</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>Always check for stains, tears, and missing buttons</li>
          <li>Know which brands sell well</li>
          <li>Consider repair costs for damaged items</li>
          <li>Build relationships with consistent sources</li>
        </ul>

        <div className="bg-accent p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-accent-foreground mb-2">Quality Over Quantity</h3>
          <p className="text-accent-foreground">
            It&apos;s better to have fewer high-quality items than lots of mediocre ones. Your reputation depends on delivering value to your customers.
          </p>
        </div>
      </>
    ),
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/blogs">
              <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blogs"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {post.category}
              </span>
              <span className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-8">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
