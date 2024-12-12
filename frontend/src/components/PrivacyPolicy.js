import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(0deg,_rgba(0,141,252,1)_0%,_rgba(4,4,247,1)_0%,_rgba(0,99,255,1)_100%)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Overview</h2>
          <p className="mb-4">
            WayGenie is a demo portfolio application that provides AI-powered
            travel itinerary planning. This privacy policy explains how we
            handle your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Data Collection</h2>
          <p className="mb-4">
            We collect only essential data required for authentication:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication data through Auth0</li>
            <li>Travel preferences you input for itinerary generation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Data Usage</h2>
          <p className="mb-4">Your data is used for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication via Auth0</li>
            <li>Generating travel itineraries using OpenAI's API</li>
          </ul>
          <p className="mb-4">We do not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Store your travel preferences permanently</li>
            <li>Share your data with third parties beyond Auth0 and OpenAI</li>
            <li>Use your data for marketing purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Essential Cookies</h2>
          <p className="mb-4">
            We use only essential cookies required for authentication through
            Auth0:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication state</li>
            <li>Session management</li>
            <li>Security tokens</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            5. Third-Party Services
          </h2>
          <p className="mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Auth0 for authentication (See Auth0's privacy & compliance docs
              here:{" "}
              <a
                className="text-blue-600"
                href="https://auth0.com/docs/secure/data-privacy-and-compliance"
              >
                https://auth0.com/docs/secure/data-privacy-and-compliance
              </a>
              )
            </li>
            <li>
              OpenAI for itinerary generation (See OpenAI's privacy & compliance
              docs here:{" "}
              <a
                className="text-blue-600"
                href="https://openai.com/policies/privacy-policy/"
              >
                https://openai.com/policies/privacy-policy/
              </a>
              )
            </li>
            <li>
              AWS CloudFront for content delivery (See AWS's privacy &
              compliance docs here:{" "}
              <a
                className="text-blue-600"
                href="https://aws.amazon.com/privacy/"
              >
                https://aws.amazon.com/privacy/
              </a>
              )
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p className="mb-4">
            For any privacy-related questions, please contact:
            <a
              href="mailto:waygenie@gmail.com"
              className="ms-1 text-blue-500 hover:text-blue-600"
            >
              waygenie@gmail.com
            </a>
          </p>
        </section>

        <footer className="text-sm text-gray-500 mt-8 pt-4 border-t">
          Last updated: December 2024
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
