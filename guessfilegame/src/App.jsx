import React, { useState, useEffect } from 'react';

const WordGuessGame = () => {
  const words = ['REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'PROGRAMMING', 'DEVELOPER'];
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setRemainingGuesses(6);
    setGameStatus('playing');
  };

  const getMaskedWord = () => {
    return word
      .split('')
      .map(letter => (guessedLetters.has(letter) ? letter : '_'))
      .join(' ');
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newRemainingGuesses = remainingGuesses - 1;
      setRemainingGuesses(newRemainingGuesses);
      
      if (newRemainingGuesses === 0) {
        setGameStatus('lost');
      }
    } else {
      const isWordGuessed = word
        .split('')
        .every(letter => newGuessedLetters.has(letter));
      
      if (isWordGuessed) {
        setGameStatus('won');
      }
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Word Guess Game</h1>
        <p className="text-xl font-mono tracking-wider">{getMaskedWord()}</p>
        <p className="text-lg">Guesses Remaining: {remainingGuesses}</p>
      </div>

      {gameStatus !== 'playing' && (
        <div className={`p-4 rounded ${
          gameStatus === 'won' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {gameStatus === 'won' 
            ? 'Congratulations! You won!' 
            : `Game Over! The word was: ${word}`}
        </div>
      )}

      <div className="grid grid-cols-7 gap-2">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
            className={`p-2 text-center rounded transition-colors
              ${guessedLetters.has(letter)
                ? 'bg-gray-200 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600'}
              disabled:cursor-not-allowed`}
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={startNewGame}
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        New Game
      </button>
    </div>
  );
};

export default WordGuessGame;