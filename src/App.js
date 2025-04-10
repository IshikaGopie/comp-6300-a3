import React, { Component } from 'react';
import './App.css';
import { PokemonList } from './components/card-list/card-list.components';
import { SearchBox } from './components/search-box/seach-box.component';
import { FilterForm } from './components/form/filter-form.components';

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            types: [],
            subtypes: [],
            supertypes: [],
            rarities: [],
            searchField: '', // Search field for Pokémon name
            pokemonType: '',
            pokemonSubtype: '',
            pokemonSupertype: '',
            pokemonRarity: '',
            showFilter: false, // State to control the visibility of the filter form
            loading: false // loading state for the Pokémon data
        };
    }
    // comment

    // Fetching data from the API when the component mounts
    componentDidMount() {
        const api_key = process.env.REACT_APP_API_KEY;
        // initialize the list of types, subtypes, supertypes and rarities from the API for the filter form
        const endpoints = ['types', 'rarities', 'subtypes', 'supertypes'];
        endpoints.forEach(endpoint => {
            fetch(`https://api.pokemontcg.io/v2/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Api-Key': api_key
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ [endpoint]: data.data }))
                .catch(error => console.log(`Error fetching ${endpoint}:`, error));
        });

        this.fetchAllPokemons();
    }

    // Fetching all Pokémon data from the API with filters
    fetchAllPokemons = () => {
        const { searchField, pokemonType, pokemonSubtype, pokemonSupertype, pokemonRarity } = this.state;
        const api_key = process.env.REACT_APP_API_KEY;

        let query = [];
        if (searchField) query.push(`name:${searchField}`);
        if (pokemonType) query.push(`types:${pokemonType}`);
        if (pokemonSubtype) query.push(`subtypes:${pokemonSubtype.replace(/\s+/g, '.')}`);
        if (pokemonSupertype) query.push(`supertype:${pokemonSupertype.replace(/\s+/g, '.')}`);
        if (pokemonRarity) query.push(`rarity:${pokemonRarity.replace(/\s+/g, '.')}`);

        const queryString = query.length > 0 ? `?q=${query.join('+')}` : '';


        //set loading state to true before fetching data
        this.setState({ loading: true });
        console.log('loading', this.state.loading);

        fetch(`https://api.pokemontcg.io/v2/cards${queryString}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': api_key
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ pokemons: data.data, loading: false }))
            .then(() => {
                this.setState({
                    searchField: '',
                    pokemonType: '',
                    pokemonSubtype: '',
                    pokemonSupertype: '',
                    pokemonRarity: ''
                });
            })
            .catch(error => {
                console.log('Error fetching Pokémon:', error);
                alert('Error fetching the Pokémon data. Please try again later.');
                this.setState({ loading: false });
            });
    };

    // handles the change in the input fields of the filter form
    // and update the state accordingly
    changeInput = (e) => {
        const { name, value } = e.target; // Get the name and value of the input
        this.setState({ [name]: value }); // Update the state with the new value
    };

    submitForm = (e) => {
        e.preventDefault(); // Prevent the default form submission
        this.setState({ showFilter: false }, this.fetchAllPokemons); // Fetch Pokémon data after form submission
    };

    formToggle = () => {
        this.setState(formst => ({ showFilter: !formst.showFilter })); // Toggle the visibility of the filter form
    };

    render() {
        const {pokemons, searchField, types, subtypes, supertypes, rarities, pokemonType, pokemonSubtype, pokemonSupertype, pokemonRarity, showFilter} = this.state;
        const filters = { pokemonType, pokemonSubtype, pokemonSupertype, pokemonRarity };

        return (
            <div className="App">
                <header className="App-header">
                    <title>Pokémon Cards</title>
                    <h1>Pokémon Cards</h1>
                    <h2>Select a Card for More Information</h2>
                </header>
                <main>
                    <form className="search-container" onSubmit={this.submitForm}>
                        <SearchBox
                            placeholder="Search Pokémon"
                            value={searchField}
                            handleChange={(e) => this.setState({searchField: e.target.value})}
                        />
                        <button type="submit" className="submit-button">Search</button>
                        <button type="button" onClick={this.formToggle} className="filter-button">
                            {showFilter ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </form>

                    {showFilter && (<FilterForm
                            types={types}
                            subtypes={subtypes}
                            supertypes={supertypes}
                            rarities={rarities}
                            filters={filters}
                            handleChange={this.changeInput}
                            onSubmit={this.submitForm}
                             onClose={this.formToggle}
                        />
                    )}

                    {this.state.loading ? (
                        <div className="loader"></div>
                    ) : pokemons.length > 0 ? (
                        <PokemonList pokemons={pokemons} />
                    ) : (
                        <div className="no-results">
                            <p>No Pokémon found. Please try adjusting your search or filters.</p>
                        </div>
                    )}
                </main>
            </div>
        );
    }
}

export default App;
