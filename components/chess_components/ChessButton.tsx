import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Props:
// onPress: Function to handle button action
// iconName: Name of the icon to display
// text: Button Text
// iconLibrary: Specifies the icon library used
interface ChessButtonProps {
  onPress: () => void;
  iconName: string;
  iconLibrary: "FontAwesome6" | "MaterialCommunityIcons";
  text: string;
}

const ChessButton: React.FC<ChessButtonProps> = ({
  onPress,
  iconName,
  iconLibrary,
  text,
}) => {
  const IconComponent =
    iconLibrary === "FontAwesome6" ? FontAwesome6 : MaterialCommunityIcons;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconComponent name={iconName as any} size={24} color="black" />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderStyle: "solid",
    elevation: 3,
  },
});

export default ChessButton;
