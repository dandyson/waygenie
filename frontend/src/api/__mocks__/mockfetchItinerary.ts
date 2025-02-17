import { TripFormData, AIResponse } from '../../types/api';

const mockFetchItinerary = jest.fn().mockResolvedValue({
  status: 'completed',
  result: {
    introduction: '',
    itinerary: '',
    events: [],
    travelMethods: '',
  },
} as AIResponse);

export default mockFetchItinerary; 