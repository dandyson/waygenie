import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

const mockUseAuth0 = useAuth0 as jest.Mock;

const TestComponent = () => {
  const { isAuthenticated, token } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "true" : "false"}</div>
      <div data-testid="token">{token || "no-token"}</div>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("provides authentication status and token", async () => {
    const mockToken = "test-token";
    const mockGetToken = jest.fn().mockResolvedValue(mockToken);

    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: mockGetToken,
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First, check that isAuthenticated is true immediately
    expect(getByTestId("auth-status")).toHaveTextContent("true");

    // Then wait for the token to be set
    await waitFor(
      () => {
        expect(getByTestId("token")).toHaveTextContent(mockToken);
      },
      { timeout: 3000 }
    );

    expect(mockGetToken).toHaveBeenCalled();
  });

  test("handles authentication errors", async () => {
    const mockError = new Error("Failed to get token");
    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockRejectedValue(mockError),
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Check that isAuthenticated is true
    expect(getByTestId("auth-status")).toHaveTextContent("true");

    // Wait for error handling to complete
    await waitFor(() => {
      expect(getByTestId("token")).toHaveTextContent("no-token");
    });
  });

  test('provides token to children', async () => {
    const mockToken = 'test-token';
    const mockGetToken = jest.fn().mockResolvedValue(mockToken);

    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: mockGetToken,
    });

    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(mockGetToken).toHaveBeenCalled();
  });

  test('handles authentication errors gracefully', async () => {
    const mockError = new Error('Failed to get token');

    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockRejectedValue(mockError),
    });

    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
