import React, { ReactElement } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import fetchItinerary from "./api/fetchItinerary";
import { createMemoryRouter, RouterProvider, RouteObject } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "@auth0/auth0-spa-js";

jest.mock("axios");
jest.mock("./api/fetchItinerary");
jest.useFakeTimers();

// Mock Auth0
jest.mock("@auth0/auth0-react");

const mockUseAuth0 = useAuth0 as jest.Mock;
const mockFetchItinerary = fetchItinerary as jest.Mock;

interface RouterOptions {
  route?: string;
}

function renderWithRouter(ui: ReactElement, { route = "/" }: RouterOptions = {}) {
  const routes: RouteObject[] = [
    {
      path: "*",
      element: ui,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  return render(<RouterProvider router={router} />);
}

describe("App Component Authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows login component when not authenticated", () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: new Error("Authentication failed"),
    });

    renderWithRouter(<App />);

    expect(screen.getByTestId("login-component")).toBeInTheDocument();
    expect(
      screen.getByText("Please login to start planning your trip"),
    ).toBeInTheDocument();
  });

  test("shows loading state while Auth0 is initializing", () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    renderWithRouter(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message when authentication fails", () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: new Error("Authentication failed"),
    });

    renderWithRouter(<App />);

    expect(screen.getByTestId("login-component")).toBeInTheDocument();
    expect(
      screen.getByText("Please login to start planning your trip"),
    ).toBeInTheDocument();
  });
});

describe("App Component Form Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Auth0 for an authenticated user
    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        email: "test@example.com",
        name: "Test User",
      },
      getAccessTokenSilently: jest.fn().mockResolvedValue("mock-token"),
    });
  });

  test("navigates through form steps correctly", async () => {
    renderWithRouter(<App />);

    // Step 1: Location Input
    expect(screen.getByText("Where are you going?")).toBeInTheDocument();

    // Select a city using radio button
    fireEvent.click(screen.getByLabelText("London"));
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTime should now be visible
    await waitFor(() => {
      expect(
        screen.getByText(/When will you be visiting?/i),
      ).toBeInTheDocument();
    });
  });

  test("handles API error during itinerary fetch", async () => {
    // Mock the API call to fail
    const mockError = new Error("Failed to fetch itinerary");
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
    mockFetchItinerary.mockRejectedValueOnce(mockError);

    renderWithRouter(<App />);

    // Step 1: Location
    fireEvent.click(screen.getByLabelText("London"));
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTime
    await waitFor(() => {
      expect(
        screen.getByText(/When will you be visiting?/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2024-09-01" },
    });
    fireEvent.change(screen.getByLabelText("Start Time:"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("End Date:"), {
      target: { value: "2024-09-02" },
    });
    fireEvent.change(screen.getByLabelText("End Time:"), {
      target: { value: "15:00" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 3: Interests
    await waitFor(() => {
      expect(screen.getByText(/What are your Interests?/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
      target: { value: "History" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 4: Travel Style
    await waitFor(() => {
      expect(
        screen.getByText(/What's your travelling style?/i),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Let's Go!"));

    // Assert error handling
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error parsing itinerary response:",
        mockError,
      );
    });
  });
});

describe("App Component Error Handling", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Auth0 for an authenticated user
    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        email: "test@example.com",
        name: "Test User",
      },
      getAccessTokenSilently: jest.fn().mockResolvedValue("mock-token"),
    });
  });

  test("handles malformed result field gracefully", async () => {
    const mockResponse = {
      status: "completed",
      result: "{ invalid json }",
    };

    mockFetchItinerary.mockResolvedValueOnce(mockResponse); // Mock the API call

    renderWithRouter(<App />);

    // Step 1: Location
    fireEvent.click(screen.getByLabelText("London"));
    fireEvent.click(screen.getByText("Next"));

    // Step 2: DateTime
    await waitFor(() => {
      expect(
        screen.getByText(/When will you be visiting?/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2024-09-01" },
    });
    fireEvent.change(screen.getByLabelText("Start Time:"), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText("End Date:"), {
      target: { value: "2024-09-02" },
    });
    fireEvent.change(screen.getByLabelText("End Time:"), {
      target: { value: "15:00" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 3: Interests
    await waitFor(() => {
      expect(screen.getByText(/What are your Interests?/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Interest..."), {
      target: { value: "History" },
    });
    fireEvent.click(screen.getByText("Next"));

    // Step 4: Travel Style
    await waitFor(() => {
      expect(
        screen.getByText(/What's your travelling style?/i),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Let's Go!"));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(
          /There was an error generating your itinerary - please try again./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
