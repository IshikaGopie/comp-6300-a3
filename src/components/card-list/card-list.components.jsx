import React from 'react';
import {PokemonCard} from '../card/card.component';

export const PokemonList = (props) => {
    console.log('props', props);
    return (
        // Card list container with a flexbox layout
        // to display the Pokémon cards in a grid-like structure
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {props.pokemons.map(card => (
                <PokemonCard key={card.id} card={card} />
            ))}
        </div>
        // This will render a list of Pokémon cards
    );
};
