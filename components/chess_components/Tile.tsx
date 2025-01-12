import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Piece from "./Piece";
import { PieceObjectType } from "./Board";

interface TileProps {
  tileColor: boolean;
  position: { row: number; col: number };
  piece: PieceObjectType | null;
  isSelected: boolean;
  positionCallBack: (position: { row: number; col: number }) => void;
}

const Tile: React.FC<TileProps> = ({
  position,
  piece,
  tileColor,
  isSelected,
  positionCallBack,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.tile,
        tileColor ? styles.lightTile : styles.darkTile,
        isSelected && styles.selectedTile,
      ]}
      onPress={() => positionCallBack(position)}
    >
      <Piece piece={piece} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  lightTile: {
    backgroundColor: "#9CA3AF",
  },
  darkTile: {
    backgroundColor: "#374151",
  },
  selectedTile: {
    borderWidth: 2,
    borderColor: "#F59E0B",
  },
});

export default Tile;
