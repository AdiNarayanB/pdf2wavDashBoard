import React, { useState } from 'react';

const PdfUploader = () => {
  const [inputApiUrl, setInputApiUrl] = useState('');
 	
  const [selectedFile, setSelectedFile] = useState(null);
 
  const [token, setToken] = useState('');
  
  const [loading, setLoading] = useState(false);


  const handleApiUrlChange = (event) => {
  	setInputApiUrl(event.target.value);
  	
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!selectedFile || !token) {
      alert('Please select a file,enter a token or enter a valid API url to hit.');
      return;
    }

    setLoading(true);

    // Convert the file to a byte object
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfBytes = new Uint8Array(fileReader.result);

      // Prepare the request payload
      const formData = new FormData();
      formData.append('pdf', new Blob([pdfBytes]), selectedFile.name);
      formData.append('token', token);
     

      try {
        const response = await fetch(inputApiUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Request successful!');
        } else {
          alert('Request failed!');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pdfFile">Upload PDF: </label>
          <input type="file" id="pdfFile" onChange={handleFileChange} accept=".pdf" />
        </div>
        <div>
        	<label htmlFor = "inputApiUrl">  Enter API Url: </label>
        	<input type = "text" id = "inputApiUrl" value = {inputApiUrl} onChange = {handleApiUrlChange} />
        </div>
        <div>
          <label htmlFor="token">Token: </label>
          <input type="text" id="token" value={token} onChange={handleTokenChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PdfUploader;

