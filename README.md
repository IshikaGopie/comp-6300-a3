
# System Information
- **Operating System**: MacOS Sequoia 15.0.1
- **Node Version**: v20.13.1
- **NPM Version**: 10.5.2
- **IDE**: WebStorm Professional Edition 2024.1.5

# Pokémon Cards

## Overview
A React application that allows users to browse, search, and filter Pokémon Trading Card Game (TCG) cards using the Pokémon TCG API.

## Features
- **Search Functionality**: Easily search for Pokémon cards by name
- **Advanced Filtering**: Filter cards by:
    - Type (Fire, Water, Grass, etc.)
    - Subtype (Stage 1, Stage 2, Basic, etc.)
    - Supertype (Pokémon, Trainer, Energy)
    - Rarity (Common, Uncommon, Rare, etc.)
- **Responsive Design**: Works well on both desktop and mobile devices
- **Interactive UI**: Toggle filter visibility with a simple button click
- **Loading States**: Visual feedback when data is being loaded
- **Error Handling**: Graceful error messages when API requests fail

## Technologies Used
- React.js
- Pokémon TCG API
- CSS

## Installation

### Prerequisites
- Node.js (v20.13.1 or later)
- npm or yarn
- Pokémon TCG API key (obtainable from [pokemontcg.io](https://pokemontcg.io/))

### Steps
1. Clone the repository:
   ``` bash
   git clone https://github.com/IshikaGopie/comp-6300-a3
   ```

2. Install dependencies:
   ``` bash
   npm install
   ```
   or
   ``` bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```
   REACT_APP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ``` bash
   npm start
   ```
   or
   ``` bash
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage
1. The homepage displays a collection of Pokémon cards
2. Use the search box to find cards by Pokémon name
3. Click "Show Filters" to display additional filtering options
4. Select filters and click "Apply Filter" to narrow down your search
5. Click on any card to view more detailed information

## Project Structure
```
comp-6300-a3/
├── public/
├── src/
│   ├── components/
│   │   ├── card/               # Individual Pokémon card component
│   │   ├── card-list/          # Displays the grid of Pokémon cards
│   │   └── form/               # Filter form component
│   │   ├── search-box/         # Search input component
│   ├── App.js                  # Main application component
│   ├── App.css                 # Global styles
│   └── index.js               
├── .env                        # Environment variables (not in repo)
└── README.md
```

## API Integration
This application uses the Pokémon TCG API (v2) to fetch card data. The API requires an API key which should be stored in your environment variables. The application makes requests to the following endpoints:
- `/cards` - To fetch card data and search results using query parameters
- `/types` - To fetch Pokémon types for filtering
- `/subtypes` - To fetch card subtypes for filtering
- `/supertypes` - To fetch card supertypes for filtering
- `/rarities` - To fetch card rarities for filtering

## References
- [Pokémon TCG API](https://pokemontcg.io/)
- [API Documentation](https://docs.pokemontcg.io/)
- [React.js](https://reactjs.org/)
- [CSS](https://www.w3.org/Style/CSS/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 