import Link from 'next/link';

export default function AssociatePrivacyStatementPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            Associate Privacy Statement
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: January 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Home Depot Canada ("we," "our," or "us") is committed to protecting the privacy and confidentiality of personal information of our associates, applicants, and candidates. This Associate Privacy Statement explains how we collect, use, disclose, and safeguard your personal information in connection with your employment or application for employment with us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This statement applies to all personal information we collect, use, or disclose in the course of the employment relationship, including during the recruitment and application process.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information that is necessary for employment-related purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Contact information (name, address, phone number, email address)</li>
              <li>Employment application information (resume, cover letter, work history, education, references)</li>
              <li>Government-issued identification (for employment eligibility verification)</li>
              <li>Background check information (with your consent)</li>
              <li>Payroll and benefits information (Social Insurance Number, banking information, tax information)</li>
              <li>Performance and disciplinary records</li>
              <li>Health and safety information (workplace injuries, accommodations)</li>
              <li>Emergency contact information</li>
              <li>Voluntary disclosures (gender, race, veteran status, disability status for equal opportunity purposes)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal information for employment-related purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Processing your employment application and evaluating your qualifications</li>
              <li>Conducting background checks and verifying information</li>
              <li>Managing the employment relationship (payroll, benefits, performance management)</li>
              <li>Complying with legal obligations (tax reporting, workplace safety, employment standards)</li>
              <li>Ensuring workplace safety and security</li>
              <li>Administering benefits and compensation programs</li>
              <li>Managing training and development programs</li>
              <li>Complying with equal opportunity and diversity requirements</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Disclosure of Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose your personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Service providers who assist us with HR functions (payroll, benefits administration, background checks)</li>
              <li>Government agencies as required by law (CRA, Employment Insurance, Workers' Compensation)</li>
              <li>Legal and professional advisors</li>
              <li>Third parties in connection with business transactions (mergers, acquisitions)</li>
              <li>Other parties with your consent or as required by law</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Secure storage systems and databases</li>
              <li>Access controls and authentication procedures</li>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Retention of Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Employment records are typically retained for a minimum period as required by applicable employment and tax laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on applicable privacy laws, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>The right to access your personal information</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information (subject to legal retention requirements)</li>
              <li>The right to object to certain processing activities</li>
              <li>The right to withdraw consent (where processing is based on consent)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact our Privacy Officer using the contact information provided below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Voluntary Disclosures
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              During the application process, we may ask you to provide voluntary information about your gender, race, veteran status, and disability status. This information is collected for equal opportunity and diversity purposes and is:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Completely voluntary</li>
              <li>Not used in hiring decisions</li>
              <li>Kept confidential and separate from your application</li>
              <li>Used only for statistical and reporting purposes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You may choose not to provide this information without affecting your application.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Changes to This Statement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Associate Privacy Statement from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated statement on our careers website and updating the "Last Updated" date. We encourage you to review this statement periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Associate Privacy Statement or our handling of your personal information, please contact:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 font-semibold mb-2">Privacy Officer</p>
              <p className="text-gray-700">The Home Depot Canada</p>
              <p className="text-gray-700">Email: privacy@homedepot.ca</p>
              <p className="text-gray-700">Phone: 1-800-HOME-DEPOT</p>
            </div>
          </section>

          <section className="mb-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This Associate Privacy Statement is effective as of January 2025 and applies to all associates and applicants of The Home Depot Canada.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
