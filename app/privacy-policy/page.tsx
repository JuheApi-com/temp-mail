import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy - Temp Mail Service',
  description: 'Privacy policy for our temporary email service',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 23, 2025</p>
          </div>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Matters</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  Our temporary email service is designed with privacy in mind. We collect minimal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Temporary email addresses generated through our service</li>
                  <li>Incoming messages to temporary email addresses</li>
                  <li>Basic usage analytics (anonymous)</li>
                  <li>IP addresses for rate limiting and abuse prevention</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To provide temporary email services</li>
                  <li>To display received messages in your session</li>
                  <li>To prevent abuse and maintain service quality</li>
                  <li>To improve our service through anonymous analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Data Retention</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Temporary emails expire after 5 minutes by default</li>
                  <li>All messages are automatically deleted when emails expire</li>
                  <li>No permanent storage of personal communications</li>
                  <li>Session data is cleared when you close your browser</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or share your personal information with third parties, except:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>When required by law or legal process</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who help operate our platform (under strict confidentiality)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Security</h2>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your information against unauthorized 
                  access, alteration, disclosure, or destruction. However, no method of transmission over 
                  the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h2>
                <p className="text-gray-700">
                  We use minimal cookies for essential functionality and anonymous analytics. We do not 
                  use tracking cookies for advertising purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Third-Party Services</h2>
                <p className="text-gray-700">
                  Our service is powered by JuheAPI. Please review their privacy policy for information 
                  about how they handle data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
                <p className="text-gray-700">
                  Our service is not intended for children under 13. We do not knowingly collect 
                  personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this privacy policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this privacy policy, please contact us at{' '}
                  <a href="mailto:support@juheapi.com" className="text-blue-600 hover:underline">
                    support@juheapi.com
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}