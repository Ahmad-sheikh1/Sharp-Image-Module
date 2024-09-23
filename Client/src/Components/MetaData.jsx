import React, { useState } from 'react';
import axios from 'axios';

const MetaDeta = () => {
    const [file, setFile] = useState(null); // To store the selected file
    const [filename, setFilename] = useState("No file chosen");
    const [responseData, setResponseData] = useState(null); // To display the response from the API
    const [loading, setLoading] = useState(false); // Loading state
    const [copySuccess, setCopySuccess] = useState(""); // To show copy success message

    // File input handler
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0]?.name || "No file chosen");
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Set loading state to true while the request is being made

        try {
            // API call (Replace '/api/upload' with your actual API endpoint)
            const response = await axios.post('/Api/Upload/MetaData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResponseData(response.data.text); // Display the response from the API
        } catch (error) {
            console.error("Error uploading the file:", error);
            setResponseData("Failed to upload the file.");
        } finally {
            setLoading(false); // Stop the loading spinner once request is complete
        }
    };

    // Copy response data to clipboard
    const handleCopy = () => {
        if (responseData) {
            navigator.clipboard.writeText(JSON.stringify(responseData, null, 2))
                .then(() => {
                    setCopySuccess("Response copied!");
                    setTimeout(() => setCopySuccess(""), 2000); // Remove message after 2 seconds
                })
                .catch(err => {
                    console.error('Failed to copy response: ', err);
                });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border-2 border-gray-300 rounded-lg p-2 w-full"
                    />
                    <p className="text-gray-600 text-sm">{filename}</p>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Uploading..." : "Upload File"}
                    </button>
                </form>

                {/* Display the response from the API */}
                {responseData && (
                    <div className="mt-6 p-4 bg-white border border-gray-300 rounded-md w-full max-w-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold">Response:</h2>
                            <button
                                onClick={handleCopy}
                                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        <pre className="whitespace-pre-wrap text-gray-700 max-h-60 overflow-auto">
                            {JSON.stringify(responseData, null, 2)}
                        </pre>
                        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetaDeta;
