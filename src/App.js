import React, { Component } from 'react';
import './App.css';
import { PokemonList } from './components/card-list/card-list.components';
import { SearchBox } from './components/search-box/seach-box.component';
import { DropDown } from './components/drop-down-menu/drop-down-menu.component';

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            types: [],
            subtypes: [],
            supertypes: [],
            rarities: [],
            searchField: '',
            pokemonType: ''
        };
    }

    componentDidMount() {
        const api_key = process.env.REACT_APP_API_KEY;
        fetch('https://api.pokemontcg.io/v2/types', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ types: data.data }))
            .catch(error => console.log('Error fetching types:', error));

        fetch('https://api.pokemontcg.io/v2/rarities', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ rarities: data.data }))
            .catch(error => console.log('Error fetching rarities:', error));

        fetch('https://api.pokemontcg.io/v2/subtypes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ subtypes: data.data }))
            .catch(error => console.log('Error fetching subtypes:', error));

        fetch('https://api.pokemontcg.io/v2/supertypes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ supertypes: data.data }))
            .catch(error => console.log('Error fetching supertypes:', error));

        this.fetchAllPokemons(); // Initial fetch
    }

    fetchAllPokemons = () => {
        const { searchField, pokemonType } = this.state;
        const api_key = process.env.REACT_APP_API_KEY;

        let query = [];
        if (searchField) query.push(`name:${searchField}`);
        if (pokemonType) query.push(`types:${pokemonType}`);

        const queryString = query.length ? `?q=${query.join(' ')}` : '';

        fetch(`https://api.pokemontcg.io/v2/cards${queryString}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ pokemons: data.data }))
            .catch(error => console.log('Error fetching Pokémon:', error));
    };

    nameSearchChangehandler = (event) => {
        this.setState({ searchField: event.target.value });
    };

    typeChangehandler = (event) => {
        this.setState({ pokemonType: event.target.value });
    };

    submitPokemon = (event) => {
        event.preventDefault();
        this.fetchAllPokemons();
    };

    render() {
        const { pokemons, searchField, types, pokemonType } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Pokémon Cards</h1>
                </header>
                <main>
                    <form className="search-container" onSubmit={this.submitPokemon}>
                        <SearchBox
                            placeholder="Search Pokémon"
                            value={searchField}
                            handleChange={this.nameSearchChangehandler}
                        />
                        <DropDown
                            types={types}
                            pokemonType={pokemonType}
                            handleTypeChange={this.typeChangehandler}
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    <PokemonList pokemons={pokemons} />
                </main>
            </div>
        );
    }
}

export default App;
