import React, { useState } from 'react';

const AudioPlayer = () => {
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAudioSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    const audioElement = new Audio(audioSrc);

    audioElement.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    audioElement.play();
  };

  return (
    <div>
      <input type="file" accept=".wav" onChange={handleFileChange} />
      <button disabled={!audioSrc || isPlaying} onClick={handlePlay}>
        {isPlaying ? 'Playing...' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
