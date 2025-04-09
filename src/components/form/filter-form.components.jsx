import React from 'react';
import './filter-form.styles.css';

export const FilterForm = ({types, subtypes, supertypes, rarities, filters, handleChange, onSubmit, onClose}) => {
    return (
        // Filter form container
        // to filter Pokémon cards based on certain fields
        // the form contains select elements for each filter type
        <div className="filter-form">
            <form className="filter-form-filters" onSubmit={onSubmit}>
                <h2>Filter Pokémon</h2>

                <label>
                    Type:
                    <select name="pokemonType" value={filters.pokemonType} onChange={handleChange}>
                        <option value="">Any</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Subtype:
                    <select name="pokemonSubtype" value={filters.pokemonSubtype} onChange={handleChange}>
                        <option value="">Any</option>
                        {subtypes.map(subtype => (
                            <option key={subtype} value={subtype}>{subtype}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Supertype:
                    <select name="pokemonSupertype" value={filters.pokemonSupertype} onChange={handleChange}>
                        <option value="">Any</option>
                        {supertypes.map(supertype => (
                            <option key={supertype} value={supertype}>{supertype}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Rarity:
                    <select name="pokemonRarity" value={filters.pokemonRarity} onChange={handleChange}>
                        <option value="">Any</option>
                        {rarities.map(rarity => (
                            <option key={rarity} value={rarity}>{rarity}</option>
                        ))}
                    </select>
                </label>

                <div className="filter-buttons">
                    <button className="filter-button-2" type="submit">Apply Filters</button>
                    <button className="filter-button-2" type="button" onClick={onClose}>Close</button>
                </div>
            </form>
        </div>
    );
};
