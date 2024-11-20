import axios from "axios";
import { makeAuthenticatedRequest } from "./api";

jest.mock("axios");

describe("makeAuthenticatedRequest", () => {
  const mockToken = "test-token";
  const mockEndpoint = "/api/test";
  const mockData = { test: "data" };

  // Mock environment variable
  beforeAll(() => {
    process.env.REACT_APP_API_URL = "http://localhost:5000";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes successful GET request", async () => {
    const mockResponse = { data: mockData };
    axios.get.mockResolvedValue(mockResponse);

    const result = await makeAuthenticatedRequest(mockEndpoint, "GET", mockToken);

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}${mockEndpoint}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockData);
  });

  test("makes successful POST request", async () => {
    const mockResponse = { data: mockData };
    axios.post.mockResolvedValue(mockResponse);

    const result = await makeAuthenticatedRequest(
      mockEndpoint,
      "POST",
      mockToken,
      mockData
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}${mockEndpoint}`,
      mockData,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockData);
  });
});
