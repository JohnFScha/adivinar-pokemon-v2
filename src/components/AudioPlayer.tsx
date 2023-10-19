import { useState } from 'react'
import myAudio from '/pokemon-opening.mp3';

export default function AudioPlayer() {
  const [audio] = useState(new Audio(myAudio));

  const playAudio = () => {
    audio.play();
  };

  const pauseAudio = () => {
    audio.pause();
  };

  return (
    <article className='nes-container is-rounded' id='audio'>
      <small>Music player</small>
      <div id='controls'>
        <button type='button' onClick={playAudio} className='nes-btn is-primary'>▶</button>
        <button type='button' onClick={pauseAudio} className='nes-btn is-warning'>⏸</button>
      </div>
    </article>
  )
}
