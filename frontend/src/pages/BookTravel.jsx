import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';

// Use a direct API key for testing purposes
const API_KEY = "AIzaSyCgIDqvkmJel5SLxe_Vdm-39lowbaNPpj4"; 

function BookTravel() {
  const [startCountry, setStartCountry] = useState('');
  const [endCountry, setEndCountry] = useState('');
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState('');
  const [rawResponse, setRawResponse] = useState('');

  const extractJsonFromText = (text) => {
    // First, try to see if the entire text is valid JSON
    try {
      return JSON.parse(text);
    } catch (e) {
      // Not valid JSON, continue with extraction
    }

    // Try various regex patterns to extract JSON
    const patterns = [
      // Match JSON code blocks with language specifier
      /```(?:json)?\s*([\s\S]*?)\s*```/,
      // Match any {...} structure that might be JSON
      /(\{[\s\S]*?\})/g,
    ];

    for (const pattern of patterns) {
      const matches = text.matchAll(pattern);
      for (const match of Array.from(matches)) {
        const possibleJson = match[1] || match[0];
        try {
          return JSON.parse(possibleJson);
        } catch (e) {
          // Not valid JSON, try next match
          console.log("Failed to parse potential JSON:", possibleJson);
        }
      }
    }

    // If we can't find valid JSON, try to construct our own from the text
    try {
      // Extract key information manually using regex
      const description = text.match(/description[:\s]+(.*?)(?=\n\n|\n[A-Z]|$)/is)?.[1]?.trim() || 
                          "Extracted from raw response";
      
      const estimatedCost = text.match(/(?:estimated\s+costs?|costs?)[:\s]+(.*?)(?=\n\n|\n[A-Z]|$)/is)?.[1]?.trim() || 
                            text.match(/\$[\d,]+\s*-\s*\$[\d,]+/)?.[0] || 
                            "See raw response";
      
      const travelTime = text.match(/(?:travel\s+time|flight\s+time|journey\s+time)[:\s]+(.*?)(?=\n\n|\n[A-Z]|$)/is)?.[1]?.trim() || 
                         text.match(/(?:\d+\s*hours?|\d+\s*days?)/)?.[0] || 
                         "See raw response";
      
      // Extract recommendations as a list
      const recommendationSection = text.match(/recommendations?[:\s]+([\s\S]*?)(?=\n\n\w|$)/is)?.[1];
      let recommendations = [];
      
      if (recommendationSection) {
        // Look for numbered or bullet lists
        const listItems = recommendationSection.match(/(?:^|\n)(?:\d+\.|\*|\-)\s*(.*?)(?=\n(?:\d+\.|\*|\-|$)|$)/g);
        if (listItems && listItems.length > 0) {
          recommendations = listItems.map(item => item.replace(/(?:^|\n)(?:\d+\.|\*|\-)\s*/, '').trim());
        } else {
          // If no list format found, split by newlines
          recommendations = recommendationSection.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        }
      }
      
      if (recommendations.length === 0) {
        recommendations = ["See raw response"];
      }
      
      return {
        description,
        estimatedCost,
        recommendations,
        travelTime,
        rawText: text
      };
    } catch (e) {
      console.error("Failed to extract structured information:", e);
      // Last resort: return a basic structure with the full text
      return {
        description: "Information extracted from AI response:",
        estimatedCost: "See raw response",
        recommendations: ["See full response below"],
        travelTime: "See raw response",
        rawText: text
      };
    }
  };

  const generateTravelGuide = async () => {
    setLoading(true);
    setError('');
    setRawResponse('');
    setGuide(null);
    
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Updated to a supported model

      const prompt = `Generate a travel guide for a trip from ${startCity}, ${startCountry} to ${endCity}, ${endCountry}. Include:

1. Brief description of both locations (what makes them special, climate, general vibe)
2. Estimated travel costs (flights, accommodation, daily expenses)
3. Four specific travel recommendations (places to visit, experiences)
4. Approximate travel time between the locations


IMPORTANT: Format your entire response as clean, human readable text format without any bold or stars `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Store the raw response for debugging
      setRawResponse(text);
      console.log("Raw response:", text);
      
      // Process the response
      const parsedGuide = extractJsonFromText(text);
      setGuide(parsedGuide);
      
      // If we had to use the raw text, show an error message
      if (parsedGuide.rawText) {
        setError("The AI response wasn't in perfect JSON format, but we extracted the information anyway.");
      }
    } catch (error) {
      console.error('Error generating travel guide:', error);
      setError(error.message || 'Failed to generate travel guide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Plan Your Trip</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Country
            </label>
            <input
              type="text"
              value={startCountry}
              onChange={(e) => setStartCountry(e.target.value)}
              placeholder="Enter starting country"
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From City
            </label>
            <input
              type="text"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              placeholder="Enter starting city"
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Country
            </label>
            <input
              type="text"
              value={endCountry}
              onChange={(e) => setEndCountry(e.target.value)}
              placeholder="Enter destination country"
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To City
            </label>
            <input
              type="text"
              value={endCity}
              onChange={(e) => setEndCity(e.target.value)}
              placeholder="Enter destination city"
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={generateTravelGuide}
          disabled={
            loading || !startCountry || !endCountry || !startCity || !endCity
          }
          className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Generating Guide...
            </>
          ) : (
            'Generate Travel Guide'
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {guide && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Travel Guide
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{guide.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Estimated Costs
              </h3>
              <p className="text-gray-600">{guide.estimatedCost}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Travel Time
              </h3>
              <p className="text-gray-600">{guide.travelTime}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Recommendations
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {guide.recommendations && guide.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-600">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {guide.rawText && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Raw Response
                </h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {guide.rawText}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {rawResponse && !guide && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Raw Response (Debug)
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 p-4 bg-gray-100 rounded-md">
            {rawResponse}
          </pre>
        </div>
      )}
    </div>
  );
}

export default BookTravel;