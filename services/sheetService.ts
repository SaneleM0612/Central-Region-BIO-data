import { BioFormData } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

export const submitToGoogleSheet = async (data: BioFormData): Promise<boolean> => {
  // Check if the URL is configured
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
    console.warn("Development Mode: Submitting to placeholder. Data will not be saved to a real sheet.");
    console.log("Payload:", data);
    return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
  }

  // Prepare data: Trim strings to ensure clean data collection without leading/trailing spaces
  const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
    // If it's a string, trim it. Otherwise keep as is.
    acc[key] = typeof value === 'string' ? value.trim() : value;
    return acc;
  }, {} as any);

  try {
    // We use 'no-cors' mode. 
    // IMPORTANT: Content-Type must be 'text/plain' to avoid Preflight (OPTIONS) requests which GAS rejects.
    // The Google Script will still parse this as JSON because the body content is a JSON string.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    // In 'no-cors' mode, we cannot read the response status (it is opaque).
    // We assume success if the network call didn't throw an error.
    return true;
  } catch (error) {
    console.error("Submission error:", error);
    return false;
  }
};