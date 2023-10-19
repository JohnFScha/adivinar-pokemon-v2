import { useState, useEffect, useRef } from 'react'
import { Pokemon } from './types'
import api from './api';
import cleanName from './utils/cleanName';
import AudioPlayer from './components/AudioPlayer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import JSConfetti from 'js-confetti';

const confetti = new JSConfetti()
const MySwal = withReactContent(Swal);

function App() {
  const guess = useRef<HTMLInputElement | null>(null)
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [guessed, setGuessed] = useState<boolean>(false)
  const [points, setPoints] = useState<number>(() => {
    const storedPoints = sessionStorage.getItem('guesses')
    return storedPoints ? JSON.parse(storedPoints) : 0
  })

  useEffect(() => {
    async function getPokemon() {
      const poke = await api.random();
      setPokemon(poke);
    }

    setTimeout(() => {
      setGuessed(false)
      getPokemon();
    }, 3000);
  }, [points])


  const handleGuess: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (guess.current) {
      const guessedName = cleanName(guess.current.value)
      if (guessedName === pokemon!.name) {
        setGuessed(true)
        confetti.addConfetti()
        MySwal.fire({
          title: 'Correct!',
          icon: 'success',
          text: 'Play again?',
          showCancelButton: true,
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            setPoints((prevPoints) => prevPoints + 1);
            const newPoints = points + 1;
            sessionStorage.setItem('guesses', JSON.stringify(newPoints));
            guess.current!.value = ''
          }
        })
      } else {
        MySwal.fire({
          title: 'Guess again!',
          icon: 'error',
        })
      }
    }
  }

  return (
    <main>
      <AudioPlayer />
      <div className="nes-container is-rounded">
        <h1>¿Quien es este pokemon?</h1>
        <small className='nes-container is-rounded'>Guesses: {points}</small>
        {pokemon !== undefined && (
          <img src={pokemon!.image} alt="???" draggable='false' className={guessed ? 'active' : 'inactive'} />
          )}
        <form>
          <input type="text" placeholder='Quien es...?' ref={guess} className='nes-input' autoFocus />
          <button onClick={handleGuess} className='nes-btn is-primary'>Adivinar</button>
        </form>
      </div>
    </main>
  );
}

export default App;
