import React, {Component} from 'react';
import './App.css';
import {PokemonList} from './components/card-list/card-list.components';
import {SearchBox} from './components/search-box/seach-box.component';

class App extends Component  {
    constructor(){
        super();
        this.state= {
        pokemons: [],
        searchField: ''
        };
    }

    componentDidMount(){
        const api_key = process.env.REACT_APP_API_KEY;
        fetch('https://api.pokemontcg.io/v2/cards', {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        }).then(
            response => response.json()
        ).then(
            data => this.setState({pokemons: data.data})
        ).catch(
            error => console.log('Error fetching data:', error)
        );
    }

    render(){
        const { pokemons, searchField} = this.state;
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchField.toLowerCase()))
        return(
            console.log(filteredPokemons),
            <div className="App">
                <header className="App-header">
                    <h1>Pokémon Cards</h1>
                </header>
                <main>
                    <SearchBox
                        placeholder='search pokémons'
                        handleChange={e => this.setState({ searchField: e.target.value })}
                    />
                    <PokemonList pokemons={filteredPokemons}/>
                </main>
            </div>
        )
    }
}

export default App;
