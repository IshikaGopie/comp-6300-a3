import React from 'react';

export const CardBack = ({ card, handleFlip }) => {
    return (
        <div className="poke-card-back">
            <p><strong>Type:</strong> {card.types.join(', ')}</p>
            <p><strong>HP:</strong> {card.hp}</p>
            <p><strong>Rarity:</strong> {card.rarity}</p>
            <p><strong>Set:</strong> {card.set.name}</p>
            <p>
                <strong>Weakness:</strong> {card.weaknesses ? card.weaknesses.map(weakness => `${weakness.type} ${weakness.value}`).join(', ') : 'None'}
            </p>
            {card.tcgplayer && card.tcgplayer.url ? (
                <a href={card.tcgplayer.url} target="_blank" rel="noopener noreferrer">
                    <button className="card-button">More Info</button>
                </a>
            ) : card.cardmarket && card.cardmarket.link ? (
                <a href={card.cardmarket.link} target="_blank" rel="noopener noreferrer">
                    <button className="card-button">More Info</button>
                </a>
            ) : null}
        </div>
    );
};
