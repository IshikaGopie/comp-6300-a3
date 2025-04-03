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
            searchField: '',
            selectedType: ''
        };
    }

    componentDidMount() {
        const api_key = process.env.REACT_APP_API_KEY;
        fetch('https://api.pokemontcg.io/v2/cards', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ pokemons: data.data }))
            .catch(error => console.log('Error fetching data:', error));

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
            .catch(error => console.log('Error fetching data:', error));
    }

    handleTypeChange = (event) => {
        const selectedType = event.target.value;
        this.setState({ selectedType });

        if (selectedType) {
            const api_key = process.env.REACT_APP_API_KEY;
            fetch(`https://api.pokemontcg.io/v2/cards?q=types:${selectedType}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Api-Key': api_key
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ pokemons: data.data }))
                .catch(error => console.log('Error fetching data:', error));
        }
    };

    render() {
        const { pokemons, searchField, types, selectedType } = this.state;

        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Pokémon Cards</h1>
                </header>
                <main>
                    <div className="search-container">
                        <SearchBox
                            placeholder="Search Pokémon"
                            handleChange={e => this.setState({ searchField: e.target.value })}
                        />
                        <DropDown
                            types={types}
                            selectedType={selectedType}
                            handleTypeChange={this.handleTypeChange}
                        />
                    </div>
                    <PokemonList pokemons={filteredPokemons} />
                </main>
            </div>
        );
    }
}

export default App;
