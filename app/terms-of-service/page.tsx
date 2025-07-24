import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Service - Temp Mail Service',
  description: 'Terms of service for our temporary email service',
};

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 23, 2025</p>
          </div>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using our temporary email service, you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the 
                  above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
                <p className="text-gray-700 mb-4">
                  Our service provides temporary email addresses that automatically expire after a 
                  specified time period. The service includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Generation of temporary email addresses</li>
                  <li>Reception and display of incoming messages</li>
                  <li>Automatic deletion of emails after expiration</li>
                  <li>Basic email management features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Acceptable Use</h2>
                <p className="text-gray-700 mb-4">You agree not to use the service to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Engage in illegal activities or violate any applicable laws</li>
                  <li>Send or receive spam, malware, or malicious content</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Violate intellectual property rights</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service for commercial purposes without permission</li>
                  <li>Create excessive load on our servers through abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Service Limitations</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Temporary emails have a maximum lifetime of 5 minutes</li>
                  <li>There are rate limits on email generation and access</li>
                  <li>The service is provided "as is" without warranties</li>
                  <li>We reserve the right to block or limit access</li>
                  <li>Service availability is not guaranteed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Privacy and Data</h2>
                <p className="text-gray-700">
                  All emails and messages are automatically deleted when they expire. We do not 
                  permanently store your communications. Please refer to our Privacy Policy for 
                  detailed information about data handling.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
                <p className="text-gray-700">
                  The service and its original content, features, and functionality are and will 
                  remain the exclusive property of our company and its licensors. The service is 
                  protected by copyright, trademark, and other laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
                <p className="text-gray-700">
                  The service is provided on an "AS IS" and "AS AVAILABLE" basis. We expressly 
                  disclaim all warranties of any kind, whether express or implied, including but 
                  not limited to the implied warranties of merchantability, fitness for a particular 
                  purpose, and non-infringement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
                <p className="text-gray-700">
                  In no event shall our company, its directors, employees, or agents be liable for 
                  any indirect, incidental, special, consequential, or punitive damages, including 
                  without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Termination</h2>
                <p className="text-gray-700">
                  We may terminate or suspend your access immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach 
                  the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms 
                  at any time. If a revision is material, we will try to provide at least 30 days 
                  notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction 
                  in which our company is located, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us at{' '}
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