import axios from 'axios';
import { makeAuthenticatedRequest } from './api';

// Make sure axios is properly mocked
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('makeAuthenticatedRequest', () => {
  const mockToken = 'test-token';
  const mockEndpoint = '/api/test';
  const mockData = { test: 'data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('makes successful GET request', async () => {
    const mockResponse = { data: mockData };
    axios.get.mockResolvedValue(mockResponse);

    const result = await makeAuthenticatedRequest(mockEndpoint, 'GET', mockToken);
    
    expect(axios.get).toHaveBeenCalledWith(mockEndpoint, {
      headers: { 
        Authorization: `Bearer ${mockToken}`,
        'Content-Type': 'application/json'
      }
    });
    expect(result).toEqual(mockData);
  });

  test('makes successful POST request', async () => {
    const mockResponse = { data: mockData };
    axios.post.mockResolvedValue(mockResponse);

    const result = await makeAuthenticatedRequest(mockEndpoint, 'POST', mockToken, mockData);
    
    expect(axios.post).toHaveBeenCalledWith(mockEndpoint, mockData, {
      headers: { 
        Authorization: `Bearer ${mockToken}`,
        'Content-Type': 'application/json'
      }
    });
    expect(result).toEqual(mockData);
  });
}); 