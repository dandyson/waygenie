import axios from "axios";
import { makeAuthenticatedRequest } from "./api";

jest.mock("axios");

const mockAxiosResponse = {
  data: { test: "data" },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

(axios.get as jest.Mock).mockResolvedValue(mockAxiosResponse);
(axios.post as jest.Mock).mockResolvedValue(mockAxiosResponse);

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
    const result = await makeAuthenticatedRequest(
      mockEndpoint,
      "GET",
      mockToken,
    );

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}${mockEndpoint}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    expect(result).toEqual(mockAxiosResponse.data);
  });

  test("makes successful POST request", async () => {
    const result = await makeAuthenticatedRequest(
      mockEndpoint,
      "POST",
      mockToken,
      mockData,
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}${mockEndpoint}`,
      mockData,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    expect(result).toEqual(mockAxiosResponse.data);
  });
});
