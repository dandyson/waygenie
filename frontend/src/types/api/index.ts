export interface FormData {
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  interests: string[];
  travelStyle: string;
}

export interface Event {
  title: string;
  time: string;
  description: string;
}

export interface ItineraryData {
  introduction: string;
  itinerary: string;
  events: Event[];
  travelMethods: string;
}

export interface AIResponse {
  status: "completed" | "failed" | "in-progress";
  result: string | ItineraryData; // Can be string because it needs to be parsed
  error?: string;
  jobId?: string;
}