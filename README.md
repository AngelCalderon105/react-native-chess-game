# Chess Game: React Native Edition

**Angel Calderon**

---

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Start the App

```bash
npx expo start
```

---

### Component Structure

#### **index.tsx**

- **Role**: Intro page for the Chess Game app.

#### **chess.tsx**

- **Role**: Main game component that manages the Chess Game.

#### **Board.tsx**

- **Role**: Container and state manager for the chessboard.

#### **Tile.tsx**

- **Role**: Represents an individual chessboard and Renders Tile and Piece.

---

## Features

### Newly Added Features

- **Translated to React Native for Full Compatibility**
- **Countdown Timers for Both Players**
- **Sound Effect For Valid Piece Moves**
- **UI Improvements **

### Features Completed and Finished in Prior Interview Rounds

- Render the board
- Render the pieces
- Allow selecting a piece and moving it to another tile
- Move validation for basic rules
- Update the board state on valid moves
- Reset Button to restart the entire board
- Undo Button to revert last move until the start of the game

---

## Folder Structure

```
react-native-chess-game/
  app/
    index.tsx
    chess.tsx
  components/
    __tests__/
    chess_components/
      Board.tsx
      Tile.tsx
      ChessButton.tsx
  assets/
    images/
    sounds/
```

---

Thank you for your time!
