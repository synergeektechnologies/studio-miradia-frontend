import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy - Studio Miradia",
  description: "Learn about Studio Miradia's shipping options, delivery times, and international shipping policies. Fast, secure delivery for your luxury fashion purchases.",
  keywords: "Studio Miradia shipping, delivery policy, shipping options, international shipping, fashion delivery, luxury shipping",
  openGraph: {
    title: "Shipping & Delivery Policy - Studio Miradia",
    description: "Learn about Studio Miradia's shipping options, delivery times, and international shipping policies. Fast, secure delivery for your luxury fashion purchases.",
    type: "website",
  },
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">Shipping & Delivery Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Processing Time</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All orders are processed within 1-3 business days (Monday through Friday, excluding holidays). Processing time may be extended during peak seasons or for custom orders.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Standard orders: 1-2 business days</li>
                <li>Custom or personalized items: 3-5 business days</li>
                <li>Orders placed on weekends or holidays: Processed the next business day</li>
                <li>Orders requiring special handling: May take additional time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Shipping Methods & Delivery Times</h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Standard Shipping (5-7 business days)</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Free on orders over $75</li>
                    <li>$8.95 for orders under $75</li>
                    <li>Delivered via USPS or FedEx Ground</li>
                    <li>Includes tracking information</li>
                  </ul>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Express Shipping (2-3 business days)</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>$15.95 flat rate</li>
                    <li>Delivered via FedEx 2-Day or UPS 2nd Day Air</li>
                    <li>Includes tracking and signature confirmation</li>
                    <li>Available for most items</li>
                  </ul>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Overnight Shipping (1 business day)</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>$25.95 flat rate</li>
                    <li>Delivered via FedEx Overnight or UPS Next Day Air</li>
                    <li>Includes tracking and signature confirmation</li>
                    <li>Order must be placed before 2 PM EST</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. International Shipping</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We ship to most countries worldwide. International shipping rates and delivery times vary by destination:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Canada: 7-14 business days, $12.95</li>
                <li>Europe: 10-21 business days, $19.95</li>
                <li>Asia Pacific: 14-28 business days, $24.95</li>
                <li>Other countries: 14-35 business days, $29.95</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Note:</strong> International orders may be subject to customs duties, taxes, and fees imposed by the destination country. These charges are the responsibility of the customer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Order Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Once your order ships, you will receive a tracking number via email. You can track your package using:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The tracking link provided in your shipping confirmation email</li>
                <li>Your account order history page</li>
                <li>The carrier's website using your tracking number</li>
                <li>Our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Delivery Attempts & Failed Deliveries</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If delivery is attempted but unsuccessful:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Carriers typically make 3 delivery attempts</li>
                <li>Packages may be held at a local facility for pickup</li>
                <li>Undeliverable packages will be returned to us after multiple failed attempts</li>
                <li>Return shipping fees may apply for packages returned due to incorrect addresses</li>
                <li>We will contact you to arrange reshipment or refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Address Requirements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To ensure successful delivery, please provide:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Complete and accurate shipping address</li>
                <li>Apartment, suite, or unit number if applicable</li>
                <li>Valid phone number for delivery notifications</li>
                <li>Special delivery instructions if needed</li>
                <li>P.O. Box addresses are accepted for standard shipping only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Shipping Restrictions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some items may have shipping restrictions:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Fragile items may require special handling</li>
                <li>Large or heavy items may have additional shipping fees</li>
                <li>Certain items cannot be shipped internationally</li>
                <li>Hazardous materials are not accepted for shipping</li>
                <li>Some destinations may have import restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Holiday Shipping</h2>
              <p className="text-muted-foreground leading-relaxed">
                During holiday seasons, shipping times may be extended due to increased volume. We recommend placing orders early to ensure delivery by specific dates. Holiday shipping schedules will be posted on our website and communicated via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Lost or Damaged Packages</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If your package is lost or damaged during shipping:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Contact us immediately with your order number</li>
                <li>We will file a claim with the shipping carrier</li>
                <li>We will arrange for a replacement or full refund</li>
                <li>Most claims are resolved within 5-10 business days</li>
                <li>We will keep you updated throughout the process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Shipping to Multiple Addresses</h2>
              <p className="text-muted-foreground leading-relaxed">
                Currently, we can only ship to one address per order. If you need to send items to multiple addresses, please place separate orders for each destination. This ensures accurate tracking and delivery confirmation for each package.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Free Shipping Threshold</h2>
              <p className="text-muted-foreground leading-relaxed">
                Free standard shipping is automatically applied to orders over $75. The free shipping threshold applies to the subtotal before taxes and fees. Express and overnight shipping options are not included in the free shipping offer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about shipping, delivery, or to report issues with your order, please contact our customer service team through our contact page or at the information provided on our website. Include your order number for faster assistance.
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
