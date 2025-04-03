import React from 'react';
import './App.css';
import {PokemonList} from './components/card-list/card-list.components';

function App() {
  return (
      <div className="App">
        <header className="App-header">
            <h1>Pokémon Cards</h1>
        </header>


        <main>
          <PokemonList />
        </main>
      </div>
  );
}

export default App;
