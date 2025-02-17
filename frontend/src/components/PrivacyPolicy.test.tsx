import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";

// Wrap component with BrowserRouter for Link component
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>
  );
};

describe("PrivacyPolicy Component", () => {
  test("renders privacy policy title", () => {
    renderWithRouter();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  test("renders back to home link", () => {
    renderWithRouter();
    const backLink = screen.getByText("← Back to Home");
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest("a")).toHaveAttribute("href", "/");
  });

  test("renders all main sections", () => {
    renderWithRouter();
    
    // Check for all section headings
    expect(screen.getByText("1. Overview")).toBeInTheDocument();
    expect(screen.getByText("2. Data Collection")).toBeInTheDocument();
    expect(screen.getByText("3. Data Usage")).toBeInTheDocument();
    expect(screen.getByText("4. Essential Cookies")).toBeInTheDocument();
    expect(screen.getByText("5. Third-Party Services")).toBeInTheDocument();
    expect(screen.getByText("6. Contact")).toBeInTheDocument();
  });

  test("renders contact email", () => {
    renderWithRouter();
    const emailLink = screen.getByText("waygenie@gmail.com");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest("a")).toHaveAttribute("href", "mailto:waygenie@gmail.com");
  });

  test("renders third-party service links", () => {
    renderWithRouter();
    
    // Check for third-party service links
    const auth0Link = screen.getByText("https://auth0.com/docs/secure/data-privacy-and-compliance");
    const openaiLink = screen.getByText("https://openai.com/policies/privacy-policy/");
    const awsLink = screen.getByText("https://aws.amazon.com/privacy/");

    expect(auth0Link.closest("a")).toHaveAttribute("href", "https://auth0.com/docs/secure/data-privacy-and-compliance");
    expect(openaiLink.closest("a")).toHaveAttribute("href", "https://openai.com/policies/privacy-policy/");
    expect(awsLink.closest("a")).toHaveAttribute("href", "https://aws.amazon.com/privacy/");
  });

  test("renders last updated date", () => {
    renderWithRouter();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
}); 