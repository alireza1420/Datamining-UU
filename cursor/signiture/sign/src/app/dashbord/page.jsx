"use client";

import { useEffect, useState } from 'react';

export default function UploadPage() {
  const [selectedOption, setSelectedOption] = useState('pc');
  const [uploadState, setUploadState]= useState(null)

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (selectedOption === 'pc') {
      console.log("this is pc");
      // You can perform other actions here when selectedOption becomes 'pc'
    }
  }, [selectedOption]); // This effect runs whenever selectedOption changes


  const handleFileUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Create FormData object from the form

    try {
      setUploadState('Uploading...');
      //needs to change during deployment
      const response = await fetch('http://localhost:3001/api/upload-pc', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setUploadState(data.message); // Display success message
        console.log('Upload details:', data.file); // Log file details
      } else {
        const errorData = await response.json(); // Parse error JSON
        setUploadState(`Upload failed: ${errorData.error}`); // Display error message
      }
    } catch (error) {
      setUploadState(`Upload failed: ${error.message}`); // Display error message
    }
  };

  return (
    <div>
      {/* Header Section with Two Options */}
      <div className="header">
        <button onClick={() => handleOptionChange('pc')}>Upload Form PC</button>
        <button onClick={() => handleOptionChange('onedrive')}>Upload from OneDrive</button>
      </div>

      {/* Content Section */}
      <div className="content">

        {selectedOption === 'pc' && (
          <div id="upload-pc">
            <h2>Upload from PC</h2>
            <form onSubmit={handleFileUpload}>
              <input type="file" name="file" required />
              <button value={'pc'} type="submit">Upload</button>
            </form>
          </div>
        )}

        {selectedOption === 'onedrive' && (
          <div id="upload-onedrive">
            <h2>Upload from OneDrive</h2>
            <button onClick={() => alert('OneDrive integration will be here')}>
              Select from OneDrive
            </button>
          </div>
        )}
        {uploadState && <p>{uploadState}</p>} {/* Display upload status */}
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .header button {
          font-size: 18px;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 5px;
        }

        .header button:hover {
          background-color: #555;
        }

        .content {
          padding: 20px;
          text-align: center;
        }

        form input,
        form button {
          margin-top: 10px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}