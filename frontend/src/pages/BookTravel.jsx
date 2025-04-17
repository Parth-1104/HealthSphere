import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';
import { MapPin, DollarSign, Clock, Tag, Hospital, Bed, Info, FileText, ChevronDown, ChevronUp } from 'lucide-react';

// --- IMPORTANT: Secure your API Key ---
// Consider using environment variables instead of hardcoding
const API_KEY = "AIzaSyCgIDqvkmJel5SLxe_Vdm-39lowbaNPpj4"; // Replace with your actual key

// --- Helper: Collapsible Section (No changes needed here) ---
function CollapsibleSection({ title, icon: Icon, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
      <button
        className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 mb-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <Icon className="h-5 w-5 mr-3 text-blue-600" />
          {title}
        </span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="text-gray-700 prose prose-sm sm:prose lg:prose-base max-w-none">
          {/* Content passed as children will be rendered here */}
          {children}
        </div>
      )}
    </div>
  );
}


// --- Main Component ---
function BookTravel() {
  const [startCountry, setStartCountry] = useState('');
  const [endCountry, setEndCountry] = useState('');
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [treatment, setTreatment] = useState('');
  const [loading, setLoading] = useState(false);
  const [guideData, setGuideData] = useState(null);
  const [error, setError] = useState('');
  const [rawResponseVisible, setRawResponseVisible] = useState(false);

  // --- Refined Extraction Logic ---
  const extractInfoFromText = (text) => {

    // Define keywords that signal the start of the *next* section
    const nextSectionKeywords = [
        'LOCATION\\s+INFORMATION', 'LOCATIONS?',
        'TRAVEL\\s+COSTS', 'ESTIMATED\\s+COSTS?', 'COSTS?',
        'TRAVEL\\s+TIME', 'JOURNEY\\s+TIME', 'FLIGHT\\s+TIME',
        'HOSPITALS?', 'MEDICAL\\s+FACILITIES', 'HEALTHCARE\\s+PROVIDERS',
        'ACCOMMODATIONS?', 'HOTELS?', 'PLACES\\s+TO\\s+STAY',
        'TREATMENT\\s+PRICES?', 'SURGERY\\s+COSTS?', 'MEDICAL\\s+COSTS?', 'PRICES?',
        'RECOMMENDATIONS?', 'PRACTICAL\\s+TIPS',
        'Disclaimer', 'Note' // Common ending words
    ].join('|');

    // Pattern to detect the start of ANY numbered or keyword-based section heading
    // Looks for double newline, optional marker (#, number, *), potential spacing, and keywords
    const nextSectionStartPattern = `\\n\\n(?:#+\\s*|\\d+\\.\\s*|\\*\\s*)?(?:${nextSectionKeywords})[:\\s]`;

    // Helper function to get a section, stopping before the next one
    const getSection = (currentSectionKeywords, sectionNumber = null) => {
        const keywordsPattern = Array.isArray(currentSectionKeywords) ? currentSectionKeywords.join('|') : currentSectionKeywords;
        // Pattern for the current section heading (e.g., "1. LOCATION INFORMATION:")
        const headingPattern = sectionNumber
            ? `(?:${sectionNumber}\\.\\s*)?(?:${keywordsPattern})[:\\s]+`
            : `(?:\\d+\\.\\s*|#+\\s*)?(?:${keywordsPattern})[:\\s]+`; // Fallback if no number provided

        // Main Regex: Find the heading, capture everything until the next section start or end of text
        const sectionRegex = new RegExp(
            `${headingPattern}([\\s\\S]*?)(?=${nextSectionStartPattern}|\\Z)`, // Use \Z for absolute end of string
            'is' // Case-insensitive, dot matches newline
        );

        const match = text.match(sectionRegex);

        // Debugging log
        // console.log(`REGEX for ${keywordsPattern}:`, sectionRegex);
        // console.log(`MATCH for ${keywordsPattern}:`, match ? match[1]?.trim().substring(0, 50) + '...' : 'No Match');

        if (match && match[1]) {
            // Further trim potentially leading/trailing newlines that might be captured
            return match[1].trim();
        }

        // --- Fallback: Try finding JUST the keywords if numbered/structured heading fails ---
        const fallbackRegex = new RegExp(
            `(?:${keywordsPattern})[:\\s]+([\\s\\S]*?)(?=${nextSectionStartPattern}|\\Z)`,
             'is'
         );
         const fallbackMatch = text.match(fallbackRegex);
         // console.log(`FALLBACK REGEX for ${keywordsPattern}:`, fallbackRegex);
         // console.log(`FALLBACK MATCH for ${keywordsPattern}:`, fallbackMatch ? fallbackMatch[1]?.trim().substring(0, 50) + '...' : 'No Match');
         if (fallbackMatch && fallbackMatch[1]) {
            return fallbackMatch[1].trim();
         }


        return null; // Return null if not found by either method
    };

    // Extract each section using the refined getSection helper
    const locationInfo = getSection(['LOCATION\\s+INFORMATION', 'LOCATIONS?'], 1);
    const travelCosts = getSection(['TRAVEL\\s+COSTS', 'ESTIMATED\\s+COSTS?', 'COSTS?'], 2);
    const travelTime = getSection(['TRAVEL\\s+TIME', 'JOURNEY\\s+TIME', 'FLIGHT\\s+TIME'], 3) || text.match(/(?:\d+\s*hours?|\d+\s*days?)/)?.[0]; // Keep simple fallback for time
    const hospitalsSection = getSection(['HOSPITALS?', 'MEDICAL\\s+FACILITIES', 'HEALTHCARE\\s+PROVIDERS'], 4);
    const accommodationsSection = getSection(['ACCOMMODATIONS?', 'HOTELS?', 'PLACES\\s+TO\\s+STAY'], 5);
    const treatmentPrices = getSection(['TREATMENT\\s+PRICES?', 'SURGERY\\s+COSTS?', 'MEDICAL\\s+COSTS?', 'PRICES?'], 6);
    const recommendationSectionText = getSection(['RECOMMENDATIONS?', 'PRACTICAL\\s+TIPS'], 7);

    // --- Process Recommendations into a list (Remains the same) ---
    let recommendationsList = [];
    if (recommendationSectionText) {
        recommendationsList = recommendationSectionText.split('\n')
            .map(line => line.trim().replace(/^\s*(\*|\-|\d+\.)\s*/, ''))
            .filter(line => line.length > 0);
    }

    // --- Helper to prepare display content (Handles null/empty) ---
    const createDisplayContent = (textContent) => {
        if (!textContent || textContent.trim() === '') {
            return <p className="text-gray-500 italic">Information not specifically found for this section.</p>;
        }
        // Let the prose class handle the internal structure (paragraphs, lists)
        // We split by double newline just as a basic paragraph separator fallback
        return textContent.split(/\n\s*\n+/).map((paragraph, index) => (
            <p key={index} className="mb-3 last:mb-0">{paragraph.trim()}</p>
        ));
         // Alternative: If you trust the AI produces markdown:
         // import ReactMarkdown from 'react-markdown';
         // return <ReactMarkdown>{textContent}</ReactMarkdown>;
    };

    const createDisplayList = (items) => {
        if (!items || items.length === 0) {
            return <p className="text-gray-500 italic">Recommendations not specifically found.</p>;
        }
        return (
            <ul className="list-disc space-y-1 pl-5">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    };

    // Return structured data ready for rendering
    return {
        locationInfo: createDisplayContent(locationInfo),
        travelCosts: createDisplayContent(travelCosts),
        travelTime: createDisplayContent(travelTime),
        hospitalsSection: createDisplayContent(hospitalsSection),
        accommodationsSection: createDisplayContent(accommodationsSection),
        treatmentPrices: createDisplayContent(treatmentPrices),
        recommendations: createDisplayList(recommendationsList),
        rawText: text || "No response text received."
    };
  };


  // --- Generation Function (with slightly enhanced prompt) ---
  const generateTravelGuide = async () => {
    setLoading(true);
    setError('');
    setGuideData(null);
    setRawResponseVisible(false);

    try {
      if (!API_KEY || API_KEY === "YOUR_API_KEY") {
          throw new Error("API Key not configured.");
      }
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Refined Prompt
      const prompt = `Generate a comprehensive medical travel guide without any bold or stars and give the details in point wise switch lines while describing a thing  for a patient traveling from ${startCity}, ${startCountry} to ${endCity}, ${endCountry} for ${treatment} treatment.
Organize your response using the EXACT numbered headings below. Ensure the content under each heading is **strictly relevant only to that specific heading**. Use bullet points within sections for lists (like hospitals, accommodations, recommendations). Be concise but informative.

1. LOCATION INFORMATION: Provide details relevant to the travel locations. Include: Brief overview of ${startCity}, brief overview of ${endCity}, climate in ${endCity}, best time to travel to ${endCity}, general overview of medical facilities standard in ${endCity}, ease of local transportation in ${endCity}.
2. TRAVEL COSTS: Estimate costs related to the journey. Include: Round-trip flights (${startCity} to ${endCity} range), local transportation in ${endCity} (options/costs), accommodation price ranges near medical areas (budget, mid-range, luxury examples), estimated daily expenses in ${endCity} (food/incidentals range).
3. TRAVEL TIME: Detail the journey duration. Include: Typical total flight duration (including layovers), estimated local transfer time (airport to city/medical area in ${endCity}).
4. HOSPITALS: List top 5-10 well-regarded hospitals/clinics and specific doctors in ${endCity} for ${treatment}, brief notes on specialties/reputation for this treatment, mention international patient services if known.
5. ACCOMMODATIONS: Suggest nearby places to stay. Include: 3-5 options (hotels, apartments) near mentioned medical facilities in ${endCity}, note amenities useful for medical travelers (accessibility, kitchenettes), categorize by price range if possible.
6. TREATMENT PRICES: Give approximate cost information. Include: Approximate price range for ${treatment} in ${endCity}, brief comparison to general cost level in ${startCountry} (e.g., "significantly lower," "comparable"). Do not give exact guarantees.
7. RECOMMENDATIONS: Offer practical advice. Include: 5-7 tips for medical travelers to ${endCity} covering documents (visa, medical records), travel insurance (clauses to check), communication (language, SIM), currency/payments, recovery time planning.

IMPORTANT: Adhere strictly to the numbered structure and ensure content is relevant only to its section heading. Do not add introductory or concluding paragraphs outside of these sections unless specifically part of a section's content (like an overview).`;

      // console.log("Sending refined prompt:", prompt);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // console.log("Raw AI response text:", text);

      const extractedData = extractInfoFromText(text);
      setGuideData(extractedData);

    } catch (error) {
      console.error('Error generating travel guide:', error);
      let errorMessage = 'Failed to generate travel guide. ';
      // ... (error handling as before)
      if (error.message && error.message.includes('API key not valid')) {
           errorMessage = 'API Key is invalid. Please check your API key configuration.';
      } else if (error.message && error.message.includes('quota')) {
          errorMessage = 'API quota exceeded. Please check your usage limits.';
      } else {
          errorMessage += error.message || 'An unknown error occurred.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- JSX Rendering (No major changes needed here) ---
  return (
    <div className="max-w-4xl mx-auto p-4 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Plan Your Medical Trip</h1>

      {/* Input Form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
         {/* Input fields (same as before) */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="startCountry" className="block text-sm font-medium text-gray-700 mb-1">From Country</label>
            <input id="startCountry" type="text" value={startCountry} onChange={(e) => setStartCountry(e.target.value)} placeholder="e.g., USA" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
          </div>
          <div>
             <label htmlFor="startCity" className="block text-sm font-medium text-gray-700 mb-1">From City</label>
             <input id="startCity" type="text" value={startCity} onChange={(e) => setStartCity(e.target.value)} placeholder="e.g., New York" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
           </div>
           <div>
             <label htmlFor="endCountry" className="block text-sm font-medium text-gray-700 mb-1">To Country</label>
             <input id="endCountry" type="text" value={endCountry} onChange={(e) => setEndCountry(e.target.value)} placeholder="e.g., Mexico" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
           </div>
           <div>
             <label htmlFor="endCity" className="block text-sm font-medium text-gray-700 mb-1">To City</label>
             <input id="endCity" type="text" value={endCity} onChange={(e) => setEndCity(e.target.value)} placeholder="e.g., Tijuana" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
           </div>
           <div className="md:col-span-2">
             <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">Treatment Type</label>
             <input id="treatment" type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} placeholder="e.g., Dental Implants" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
           </div>
        </div>

        {/* Generate Button (same as before) */}
        <button onClick={generateTravelGuide} disabled={ loading || !startCountry || !endCountry || !startCity || !endCity || !treatment } className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium">
          {loading ? ( <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Generating Guide...</> ) : ( 'Generate Medical Travel Guide' )}
        </button>

        {/* Error Message (same as before) */}
        {error && ( <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"> <strong>Error:</strong> {error} </div> )}
      </div>

      {/* Results Area */}
      {loading && (
        <div className="text-center py-6">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="text-gray-600 mt-2">Generating your personalized guide...</p>
        </div>
      )}

      {/* Display Guide Data using Collapsible Sections */}
      {guideData && !loading && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
            Your Medical Travel Guide: {startCity} to {endCity} for {treatment}
          </h2>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner mt-8">
             <button className="flex items-center justify-between w-full text-left text-base font-medium text-gray-700 mb-3 focus:outline-none hover:text-gray-900" onClick={() => setRawResponseVisible(!rawResponseVisible)}>
               <span className="flex items-center"><FileText className="h-5 w-5 mr-3 text-gray-500" />Complete Details </span>
               {rawResponseVisible ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
             </button>
             {rawResponseVisible && (
                <div className="text-gray-600 mt-4">
                  <pre className="whitespace-pre-wrap text-xs p-3 bg-white border border-gray-200 rounded-md overflow-auto max-h-96">
                    {guideData.rawText}
                  </pre>
                </div>
             )}
          </div>

          {/* Each section uses the CollapsibleSection helper */}
          {guideData.locationInfo && <CollapsibleSection title="Location Information" icon={MapPin}>{guideData.locationInfo}</CollapsibleSection>}
          {/* {guideData.travelCosts && <CollapsibleSection title="Estimated Travel Costs" icon={DollarSign}>{guideData.travelCosts}</CollapsibleSection>} */}
          {guideData.travelTime && <CollapsibleSection title="Estimated Travel Time" icon={Clock}>{guideData.travelTime}</CollapsibleSection>}
          {guideData.hospitalsSection && <CollapsibleSection title="Hospitals & Clinics" icon={Hospital}>{guideData.hospitalsSection}</CollapsibleSection>}
          {guideData.accommodationsSection && <CollapsibleSection title="Accommodations Near Medical Facilities" icon={Bed}>{guideData.accommodationsSection}</CollapsibleSection>}
          {/* {guideData.treatmentPrices && <CollapsibleSection title="Approximate Treatment Prices" icon={Tag}>{guideData.treatmentPrices}</CollapsibleSection>} */}
          {/* {guideData.recommendations && <CollapsibleSection title="Recommendations & Tips" icon={Info}>{guideData.recommendations}</CollapsibleSection>} */}


          {/* Raw Response Section (Collapsible) */}
          
        </div>
      )}
    </div>
  );
}

export default BookTravel;