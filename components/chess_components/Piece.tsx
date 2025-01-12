import React from "react";
import { Text, StyleSheet } from "react-native";
import { PieceObjectType } from "./Board";

interface PieceProps {
  piece: PieceObjectType | null;
}

const symbols: Record<PieceObjectType["pieceType"], string> = {
  Pawn: "♙",
  Rook: "♖",
  Knight: "♘",
  Bishop: "♗",
  Queen: "♕",
  King: "♔",
};

const Piece: React.FC<PieceProps> = ({ piece }) => {
  if (!piece) return null;

  return (
    <Text
      style={[
        styles.piece,
        piece.player === "Player 1" ? styles.player1 : styles.player2,
      ]}
    >
      {symbols[piece.pieceType]}
    </Text>
  );
};

const styles = StyleSheet.create({
  piece: {
    fontSize: 40, // Adjust the size of the chess piece
    fontWeight: "medium",
  },
  player1: {
    color: "white",
  },
  player2: {
    color: "black",
  },
});

export default Piece;
