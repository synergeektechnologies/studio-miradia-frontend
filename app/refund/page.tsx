import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund & Return Policy - Studio Miradia",
  description: "Studio Miradia's comprehensive refund and return policy. Learn about our 30-day return window, exchange options, and hassle-free return process for luxury fashion items.",
  keywords: "Studio Miradia refund policy, return policy, fashion returns, luxury fashion returns, exchange policy, customer satisfaction",
  openGraph: {
    title: "Refund & Return Policy - Studio Miradia",
    description: "Studio Miradia's comprehensive refund and return policy. Learn about our 30-day return window, exchange options, and hassle-free return process for luxury fashion items.",
    type: "website",
  },
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">Refund & Return Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Return Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We want you to be completely satisfied with your purchase. You may return most items within 30 days of delivery for a full refund, provided they meet the following conditions:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Items must be in original condition with tags attached</li>
                <li>Items must be unworn, unwashed, and free of damage</li>
                <li>Original packaging and accessories must be included</li>
                <li>Proof of purchase (order number or receipt) is required</li>
                <li>Items must not be personalized or custom-made</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Items Not Eligible for Return</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Personalized or custom-made items</li>
                <li>Items damaged by misuse or normal wear and tear</li>
                <li>Items without original tags or packaging</li>
                <li>Items that have been worn, washed, or altered</li>
                <li>Sale items marked as "Final Sale"</li>
                <li>Gift cards and digital products</li>
                <li>Items returned after 30 days from delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How to Initiate a Return</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To return an item, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Contact our customer service team within 30 days of delivery</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a Return Merchandise Authorization (RMA) number</li>
                <li>Package the item securely with the RMA number clearly visible</li>
                <li>Ship the item using the provided return label or your preferred carrier</li>
                <li>Keep your tracking number for reference</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Return Shipping</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Return shipping costs are handled as follows:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Defective or incorrect items:</strong> We provide a prepaid return label</li>
                <li><strong>Customer-initiated returns:</strong> Customer is responsible for return shipping costs</li>
                <li><strong>Free return shipping:</strong> Available for orders over $100 (domestic only)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We recommend using a trackable shipping method and purchasing insurance for valuable items.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Refund Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Once we receive and inspect your returned item, we will process your refund as follows:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Refunds are processed within 5-7 business days of receiving the return</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Original shipping costs are non-refundable unless the return is due to our error</li>
                <li>Return shipping costs are deducted from refunds for customer-initiated returns</li>
                <li>You will receive an email confirmation once the refund is processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Exchange Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer exchanges for items in different sizes or colors, subject to availability:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Exchanges must be requested within 30 days of delivery</li>
                <li>Items must meet the same return eligibility criteria</li>
                <li>Price differences will be charged or refunded accordingly</li>
                <li>Exchange shipping is free for the first exchange</li>
                <li>Additional exchanges may incur shipping charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Damaged or Defective Items</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you receive a damaged or defective item, please contact us immediately. We will arrange for a replacement or full refund at no cost to you. Please do not return damaged items without first contacting our customer service team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. International Returns</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For international orders, return policies may vary:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Return shipping costs are the customer's responsibility</li>
                <li>Customs duties and taxes are non-refundable</li>
                <li>Processing time may be extended due to customs clearance</li>
                <li>Some countries may have restrictions on certain items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Store Credit</h2>
              <p className="text-muted-foreground leading-relaxed">
                In some cases, we may offer store credit instead of a monetary refund. Store credit:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Never expires</li>
                <li>Can be used for any purchase on our website</li>
                <li>Cannot be transferred to another account</li>
                <li>Cannot be redeemed for cash</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Holiday Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                Items purchased during holiday seasons (November 1st - December 31st) may be returned until January 31st of the following year, regardless of the standard 30-day policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about returns or refunds, please contact our customer service team through our contact page or at the information provided on our website. Include your order number and a detailed description of the issue for faster assistance.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
