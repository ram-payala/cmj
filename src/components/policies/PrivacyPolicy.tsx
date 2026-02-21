import { Home } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export default function PrivacyPolicy({ onNavigateHome }: PrivacyPolicyProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Privacy Statement</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Privacy Statement
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <em>Acta Clinica Croatica</em> is committed to managing personal data with the utmost integrity,
            professionalism, and in compliance with applicable data protection laws and standards.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy outlines how we collect, use, share, and safeguard personal information, and how
            individuals can exercise their rights in relation to their data.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Types of Personal Information Collected
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Personal information refers to any data relating to an identified or identifiable individual.
            Depending on your interaction with us, we may collect the following types of personal data:
          </p>
          <ul className="space-y-3 ml-6">
            <li className="text-gray-700 leading-relaxed">
              <strong>Identifiers:</strong> Name, postal address, email, phone number, social media ID, and other
              contact information.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Demographic Information:</strong> Age, gender, and related data.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Professional Details:</strong> Academic background, institutional affiliations, and other
              professional credentials.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Images and Media:</strong> Photographs, video content, or recorded presentations.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Financial Information:</strong> Bank account details, credit card numbers, and payment
              records.
            </li>
            <li className="text-gray-700 leading-relaxed">
              <strong>Engagement Data:</strong> Article submissions, peer review contributions, survey responses,
              and user feedback.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
