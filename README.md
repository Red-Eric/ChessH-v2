#FEN Extractor and Stockfish API Integration

A Chrome extension that extracts the FEN (Forsyth-Edwards Notation) and sends it to a Stockfish API to calculate the best move.

## Features

- Extracts the FEN string directly from a game.
- Sends the FEN to a Stockfish API endpoint to fetch the best move.

## Prerequisites
- A running instance of the [Stockfish REST API](https://github.com/Red-Eric/Stockfish-RestAPI).

## Installation

1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
2. Install the dependencies:
   ```bash
   npm install
3. Build the extension:
   ```bash
   npm run build
