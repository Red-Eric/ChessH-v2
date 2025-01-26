# Chess.com FEN Extractor and Stockfish API Integration

A Chrome extension that extracts the FEN (Forsyth-Edwards Notation) of a chess position from a Chess.com game and sends it to a Stockfish API to calculate the best move.

## Features

- Extracts the FEN string directly from a Chess.com game.
- Sends the FEN to a Stockfish API endpoint to fetch the best move.
- Displays the best move directly within the extension or on the Chess.com interface.

## Prerequisites

- A running instance of the [Stockfish REST API](https://github.com/Red-Eric/Stockfish-RestAPI).
- **Chess.com settings must be configured as follows**:
  1. **Language**: Set to **English**.
  2. **Figure Notation**: Set to **Text** (instead of figurines).  
     To change these settings:
     - Go to `Settings > All Settings > Board and Piece` on Chess.com.
     - Adjust the **Language** and **Figure Notation** settings accordingly.

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
