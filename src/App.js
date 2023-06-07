import React from 'react';
import PdfUploader from './PdfUploader';
import AudioPlayer from './AudioPlayer';
const App = () => {
  // Assuming you have a response byte object named 'responseByteObject'
  
  return (
    <div>
    	<h1> Pdf2Wav Converter </h1>
    	
    	<PdfUploader />
    	<AudioPlayer />
    </div>		
    
  );
};

export default App;

