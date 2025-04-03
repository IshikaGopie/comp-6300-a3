import React, { useState } from 'react';
import './card.styles.css';
import { CardBack } from './card-back.componsnets';

export const PokemonCard = ({ card }) => {
    // State to manage the flipped state of the card
    const [isFlipped, setIsFlipped] = useState(false);

    // Function to flip the card when clicked
    const flipCard = () => {
        // toggle ued to flip the card
        setIsFlipped(!isFlipped);
    };

    return (
        // Card container with a class name that changes based on the flipped state
        // works by adding a class to the card container
        // when the card is flipped it adds the class 'flipped' to the card container
        // and triggers the CSS animation to show the back of the card
        // onClick event to flip the card when the card is clicked
        <div className={`poke-card-container ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            <div className="poke-card-front">
                <img src={card.images.small} alt={card.name} />
                <div>
                    <h2 className={`poke-card-name`}>{card.name}</h2>
                </div>
            </div>
            <CardBack card={card} handleFlip={flipCard} />
        </div>
    );
};
