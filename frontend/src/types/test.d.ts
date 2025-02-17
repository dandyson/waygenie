import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import { AxiosStatic, AxiosResponse } from 'axios';
import { TripFormData, AIResponse } from './api';

declare global {
  namespace jest {
    interface Mock<T = any, Y extends any[] = any> {
      mockReturnValue(value: T): this;
      mockResolvedValue(value: T): this;
      mockRejectedValue(value: any): this;
      mockResolvedValueOnce(value: T): this;
      mockRejectedValueOnce(value: any): this;
      mockImplementation(fn: (...args: Y) => T): this;
    }
  }
}

declare module '@auth0/auth0-react' {
  const useAuth0: jest.Mock<Auth0ContextInterface<User>>;
  export { useAuth0 };
}

declare module 'axios' {
  export interface AxiosStatic {
    get: jest.Mock<Promise<AxiosResponse>>;
    post: jest.Mock<Promise<AxiosResponse>>;
    isAxiosError: jest.Mock<boolean>;
  }
}

declare module '../api/mockfetchItinerary' {
  const mockFetchItinerary: jest.Mock<Promise<AIResponse>, [TripFormData, string]>;
  export default mockFetchItinerary;
}

// Export an empty object to make this a module
export {}; 