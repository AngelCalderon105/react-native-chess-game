import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import Tile from "./Tile";
import ChessButton from "./ChessButton";
import { isValidMove } from "@/scripts/moveValidation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";

// Types
export interface PositionType {
  row: number;
  col: number;
}

export interface PieceObjectType {
  player: "Player 1" | "Player 2";
  pieceType: "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";
  position: PositionType;
}

// The board is a 2D array of PieceObjects or nulls
type Board = (PieceObjectType | null)[][];

interface BoardProps {
  onTurnSwitch: () => void;
  onTurnReset: () => void;
  currentPlayer: string;
}

// Initial Board Layout Set Up
const INITIAL_BOARD: Board = [
  [
    { player: "Player 2", pieceType: "Rook", position: { row: 0, col: 0 } },
    { player: "Player 2", pieceType: "Knight", position: { row: 0, col: 1 } },
    { player: "Player 2", pieceType: "Bishop", position: { row: 0, col: 2 } },
    { player: "Player 2", pieceType: "Queen", position: { row: 0, col: 3 } },
    { player: "Player 2", pieceType: "King", position: { row: 0, col: 4 } },
    { player: "Player 2", pieceType: "Bishop", position: { row: 0, col: 5 } },
    { player: "Player 2", pieceType: "Knight", position: { row: 0, col: 6 } },
    { player: "Player 2", pieceType: "Rook", position: { row: 0, col: 7 } },
  ],
  [
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 0 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 1 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 2 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 3 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 4 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 5 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 6 } },
    { player: "Player 2", pieceType: "Pawn", position: { row: 1, col: 7 } },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 0 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 1 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 2 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 3 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 4 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 5 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 6 } },
    { player: "Player 1", pieceType: "Pawn", position: { row: 6, col: 7 } },
  ],
  [
    { player: "Player 1", pieceType: "Rook", position: { row: 7, col: 0 } },
    { player: "Player 1", pieceType: "Knight", position: { row: 7, col: 1 } },
    { player: "Player 1", pieceType: "Bishop", position: { row: 7, col: 2 } },
    { player: "Player 1", pieceType: "Queen", position: { row: 7, col: 3 } },
    { player: "Player 1", pieceType: "King", position: { row: 7, col: 4 } },
    { player: "Player 1", pieceType: "Bishop", position: { row: 7, col: 5 } },
    { player: "Player 1", pieceType: "Knight", position: { row: 7, col: 6 } },
    { player: "Player 1", pieceType: "Rook", position: { row: 7, col: 7 } },
  ],
];

export default function Board({
  onTurnSwitch,
  onTurnReset,
  currentPlayer,
}: BoardProps) {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [stateRecord, setStateRecord] = useState<Board[]>([INITIAL_BOARD]);
  const [selectedPiece, setSelectedPiece] = useState<{
    piece: PieceObjectType;
    position: PositionType;
  } | null>(null);

  //Timer Functionality:
  // 2 Timers Counting Down, Stopped only when a valid move is made
  // 10 Minutes Each
  const [player1Timer, setPlayer1Timer] = useState(600);
  const [player2Timer, setPlayer2Timer] = useState(600);
  // Use Effect:
  // Manages Countodwn of both timers
  // Triggers when current player switches
  useEffect(() => {
    if (player1Timer === 0) {
      Alert.alert("Player 2 Wins!", "Player 1 ran out of time.");
      return;
    }
    if (player2Timer === 0) {
      Alert.alert("Player 1 Wins!", "Player 2 ran out of time.");
      return;
    }

    const timerInterval = setInterval(() => {
      if (currentPlayer === "Player 1") {
        setPlayer1Timer((prev) => Math.max(prev - 1, 0));
      } else {
        setPlayer2Timer((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentPlayer]);

  // Sound Effect Functionality
  // Manages playing and cleanup of sound effects
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  // Loads the sound when the component mounts
  // Unloads sound when the component unmounts
  useEffect(() => {
    let soundInstance: Audio.Sound;
    const loadSound = async () => {
      try {
        soundInstance = new Audio.Sound();
        await soundInstance.loadAsync(
          require("@/assets/sounds/piece-move.mp3")
        );
        setSound(soundInstance);
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      if (soundInstance) {
        soundInstance.unloadAsync();
      }
    };
  }, []);
  // Function to play the sound effect
  const playSound = async () => {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  //Included Timer Resets for Both Timers
  const handleResetGame = () => {
    setBoard(INITIAL_BOARD);
    onTurnReset();
    setStateRecord([INITIAL_BOARD]);
    setSelectedPiece(null);
    setPlayer1Timer(600);
    setPlayer2Timer(600);
  };

  const handleUndo = () => {
    if (stateRecord.length === 1) return;
    const lastGameState = stateRecord[stateRecord.length - 2];
    setStateRecord((prev) => prev.slice(0, -1));
    setBoard(lastGameState);
    setSelectedPiece(null);
    onTurnSwitch();
  };

  const handleUserClick = (position: PositionType) => {
    const { row, col } = position;
    const clickedPiece = board[row][col];
    if (
      selectedPiece &&
      selectedPiece.position.row === row &&
      selectedPiece.position.col === col
    ) {
      setSelectedPiece(null);
      return;
    }

    if (!selectedPiece && clickedPiece) {
      setSelectedPiece({ piece: clickedPiece, position });
      return;
    }

    if (selectedPiece) {
      const { piece, position: currentPos } = selectedPiece;
      if (isValidMove(piece, currentPos, position, board)) {
        playSound();
        setStateRecord((prev) => [...prev, board]);
        const newBoard = board.map((row) => [...row]);
        newBoard[currentPos.row][currentPos.col] = null;
        newBoard[row][col] = piece;
        setBoard(newBoard);
        setSelectedPiece(null);
        onTurnSwitch();
      } else {
        // Invalid move
        Alert.alert("Invalid move", "That move is not allowed.");
      }
    }
  };
  //Board Render using Tile.tsx
  return (
    <View>
      <View style={styles.timerContainer}>
        <Text
          style={[
            styles.timerText,
            currentPlayer === "Player 1"
              ? styles.activeTimer
              : styles.inactiveTimer,
          ]}
        >
          White Timer: {Math.floor(player1Timer / 60)}:
          {String(player1Timer % 60).padStart(2, "0")}
        </Text>
        <Text
          style={[
            styles.timerText,
            currentPlayer === "Player 2"
              ? styles.activeTimer
              : styles.inactiveTimer,
          ]}
        >
          Black Timer: {Math.floor(player2Timer / 60)}:
          {String(player2Timer % 60).padStart(2, "0")}
        </Text>
      </View>

      <View style={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((tileObject, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                piece={tileObject}
                position={{ row: rowIndex, col: colIndex }}
                tileColor={(rowIndex + colIndex) % 2 === 0}
                isSelected={
                  selectedPiece?.position.row === rowIndex &&
                  selectedPiece?.position.col === colIndex
                }
                positionCallBack={handleUserClick}
              />
            ))}
          </View>
        ))}
        {/* Button Components added for reusablility
        chess_components/ChessButton.tsx for full definition */}
        <View style={styles.buttonContainer}>
          <ChessButton
            onPress={handleResetGame}
            iconName="arrows-rotate"
            text="Reset Board"
            iconLibrary="FontAwesome6"
          />
          <ChessButton
            onPress={handleUndo}
            iconName="undo"
            text="Undo Move"
            iconLibrary="MaterialCommunityIcons"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginTop: 40,
  },

  timerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  timerText: {
    textAlign: "center",
    fontSize: 16,
  },
  activeTimer: {
    fontWeight: "bold",
    color: "black",
  },
  inactiveTimer: {
    fontWeight: "normal",
    color: "gray",
  },
});
