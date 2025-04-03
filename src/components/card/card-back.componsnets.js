import React from 'react';

export const CardBack = ({ card, handleFlip }) => {
    return (
        <div className="poke-card-back">
            <p><strong>Type:</strong> {card.types.join(', ')}</p>
            <p><strong>HP:</strong> {card.hp}</p>
            <p><strong>Rarity:</strong> {card.rarity}</p>
            <p><strong>Set:</strong> {card.set.name}</p>
            <p>
                <strong>Weakness:</strong> {card.weaknesses.map(weakness => `${weakness.type} ${weakness.value}`).join(', ')}
            </p>
            <a href={card.tcgplayer.url}  target="_blank" rel="noopener noreferrer">
                <button className="card-button">More Info</button>
            </a>
        </div>
    );
};
