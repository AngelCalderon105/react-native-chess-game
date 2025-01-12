import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello Terros Team!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Summary</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            My React Web Chess Game has officially been transformed into a fully
            functional React Native project! The entire process was extremely
            enjoyable and rewarding, and I’m thrilled with how it turned out. I
            hope you enjoy exploring it as much as I enjoyed creating it!
          </ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">New Features</ThemedText>
        <ThemedText>- Translated to React Native </ThemedText>
        <ThemedText>- Countdown Timers for both Players</ThemedText>
        <ThemedText>- Sound Effect For Valid Piece Moves</ThemedText>
        <ThemedText>- UI Improvments</ThemedText>
      </ThemedView>
      <ThemedText>
        Press the Arrow Below to get started and dive right in!
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
