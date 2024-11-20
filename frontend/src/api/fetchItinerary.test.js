import fetchItinerary from './fetchItinerary';
import { makeAuthenticatedRequest } from '../utils/api';

// Mock the entire module
jest.mock('../utils/api', () => ({
  makeAuthenticatedRequest: jest.fn().mockImplementation(async (endpoint, method, token, data) => {
    if (!data.prompt.location) {
      throw new Error('Invalid input data');
    }
    return Promise.resolve(data);
  })
}));

describe('fetchItinerary', () => {
  const mockToken = 'test-token';
  const mockFormData = {
    location: 'Paris',
    startDate: '2024-01-01',
    startTime: '09:00',
    endDate: '2024-01-03',
    endTime: '17:00',
    interests: ['History', 'Food'],
    travelStyle: 'Relaxed'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successfully fetches itinerary', async () => {
    const mockResponse = {
      days: [{ activities: ['Visit Eiffel Tower'] }]
    };
    makeAuthenticatedRequest.mockResolvedValue(mockResponse);

    const result = await fetchItinerary(mockFormData, mockToken);
    
    expect(makeAuthenticatedRequest).toHaveBeenCalledWith(
      '/api/itinerary',
      'POST',
      mockToken,
      { prompt: mockFormData }
    );
    expect(result).toEqual(mockResponse);
  });

  test('handles API errors', async () => {
    makeAuthenticatedRequest.mockRejectedValue(new Error('API error'));

    const result = await fetchItinerary(mockFormData, mockToken);
    expect(result).toEqual({
      introduction: "",
      events: [],
      error: "Failed to generate itinerary",
      travelMethods: ""
    });
  });

  test('handles empty location', async () => {
    const invalidData = { ...mockFormData, location: '' };
    const result = await fetchItinerary(invalidData, mockToken);
    
    expect(result).toEqual({
      introduction: "",
      events: [],
      error: "Failed to generate itinerary",
      travelMethods: ""
    });
  });
}); 