import React from 'react';
import {PokemonCard} from '../card/card.component';

export const PokemonList = (props) => {
    console.log('props', props);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {props.pokemons.map(card => (
                <PokemonCard key={card.id} card={card} />
            ))}
        </div>
    );
};
