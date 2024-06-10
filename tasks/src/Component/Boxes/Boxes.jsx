import React, { useState, useEffect } from 'react';
import './Boxes.css';
import Result from '../Result/Result.jsx';

const Boxes = () => {
    const [numbers, setNumbers] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [playerTurn, setPlayerTurn] = useState(1);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [winner, setWinner] = useState('');
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);

    // shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Generate the array
    useEffect(() => {
        const initialNumbers = shuffleArray([...Array(9).keys()].map((n) => n + 1).flatMap((n) => [n, n]));
        setNumbers(initialNumbers);
    }, []);

    // handle card selection
    const handleCardClick = (index) => {
        if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedPairs.includes(index)) {
            setSelectedCards([...selectedCards, index]);
        }
    };

    // Check if selected cards match and update scores
    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            let outcome = '';
            if (numbers[firstCard] === numbers[secondCard]) {
                if (playerTurn === 1) {
                    setPlayer1Score(player1Score + 1);
                } else {
                    setPlayer2Score(player2Score + 1);
                }
                setMatchedPairs([...matchedPairs, firstCard, secondCard]);
                outcome = 'Success';
            } else {
                outcome = 'Fail';
            }
            setHistory([...history, { player: `Player ${playerTurn}`, cards: `${numbers[firstCard]}, ${numbers[secondCard]}`, outcome }]);
            setTimeout(() => setSelectedCards([]), 1000);
            setPlayerTurn(playerTurn === 1 ? 2 : 1);
        }
    }, [selectedCards]);

    //set the winner , score and the history 
    useEffect(() => {
        if (matchedPairs.length === numbers.length) {
            setWinner(player1Score > player2Score ? "Player 1" : "Player 2");
            setScore(Math.max(player1Score, player2Score));
        }
    }, [player1Score, player2Score, matchedPairs, numbers.length]);


    // Render the Result page if winner and score are available and pass the argument (winner , score and history) as props 
    if (matchedPairs.length === numbers.length && winner !== '' && score !== 0) {
        return <Result winner={winner} score={score} history={history} />;
    }

    // Function to render cards
    const renderCards = () => {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            const cols = [];
            for (let j = 0; j < 6; j++) {
                const index = i * 6 + j;
                const isFlipped = selectedCards.includes(index) || matchedPairs.includes(index);
                cols.push(
                    <div
                        key={index}
                        className={`col d-flex justify-content-center align-items-center box ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        {isFlipped && numbers[index]}
                    </div>
                );
            }
            rows.push(
                <div className="row" key={i}>
                    {cols}
                </div>
            );
        }
        return rows;
    };

    // Render the Boxes component if the game is not finished
    return (
        <div className="container">
            <div className='row mb-5 pb-3' >
                <div className={`col-md-6 px-5 ${playerTurn === 1 ? 'active-player' : ''}`}>
                    <h3 className='permanent-marker-regular'>Player 1 Score: {player1Score}</h3>
                </div>
                <div className={`col-md-6 d-flex justify-content-end px-5 ${playerTurn === 2 ? 'active-player' : ''}`}>
                    <h3 className='permanent-marker-regular'>Player 2 Score: {player2Score}</h3>
                </div>
            </div>
            <div className="row mt-5">
                {renderCards()}
            </div>
        </div>
    );
};

export default Boxes;