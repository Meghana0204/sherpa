// Common error messages and handling functions
export const mapErrorMessages = {
    ZERO_RESULTS: "No results found for this search. Please try a different location.",
    OVER_QUERY_LIMIT: "You've exceeded the API request limit. Please try again later.",
    REQUEST_DENIED: "The request was denied. Please check your API key.",
    INVALID_REQUEST: "Invalid request. Please try again with different parameters.",
    UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
    NOT_FOUND: "The requested resource could not be found."
  };
  
  export const handleApiError = (error, defaultMessage = "An error occurred. Please try again.") => {
    console.error("API Error:", error);
    
    if (error.code && mapErrorMessages[error.code]) {
      return mapErrorMessages[error.code];
    }
    
    return defaultMessage;
  };
  
  export const showErrorAlert = (message) => {
    alert(message); // In a real app, you'd use a more sophisticated alert component
  };