import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformPlayer = ({ responseByteObject }) => {
  const waveformRef = useRef(null);
  const audioButtonRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      barWidth: 2,
      cursorWidth: 1,
      height: 100,
      responsive: true,
    });

    wavesurfer.loadBlob(responseByteObject);

    audioButtonRef.current.addEventListener('click', () => {
      wavesurfer.playPause();
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [responseByteObject]);

  return (
    <div>
      <div ref={waveformRef}></div>
      <button ref={audioButtonRef}>Play/Pause</button>
    </div>
  );
};

export default WaveformPlayer;
