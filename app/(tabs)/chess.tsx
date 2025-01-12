import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Board from "@/components/chess_components/Board";

export default function ChessGame() {
  // State for tracking player's turn
  const [playerTurn, setPlayerTurn] = useState("Player 1");

  const handleTurnSwitch = () => {
    setPlayerTurn((prevTurn) =>
      prevTurn === "Player 1" ? "Player 2" : "Player 1"
    );
  };

  const handleTurnReset = () => {
    setPlayerTurn("Player 1");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terros Chess Assessment</Text>
      <Text
        style={[
          styles.turnText,
          playerTurn === "Player 1" ? styles.whiteTurn : styles.blackTurn,
        ]}
      >
        {playerTurn === "Player 1"
          ? "White Make Your Next Move"
          : "Black Make Your Next Move"}
      </Text>

      <Board
        onTurnSwitch={handleTurnSwitch}
        currentPlayer={playerTurn}
        onTurnReset={handleTurnReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  turnText: {
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    color: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    gap: 10,
    backgroundColor: "white",
    borderStyle: "solid",
  },
  whiteTurn: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  blackTurn: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
});
