import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInLeft } from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

import { data } from "../data";
import { useColors } from "./_layout";

export default function Emoji() {
  const router = useRouter();
  const { id } = useSearchParams();
  const { setColors } = useColors();

  return (
    <BlurView intensity={80} tint="dark" style={styles.container}>
      <Pressable
        style={styles.container}
        onPress={() => {
          router.back();
        }}
      >
        <Animated.Text entering={FadeInLeft.duration(600)} style={styles.title}>
          {id}
        </Animated.Text>
        <View style={styles.layout}>
          {data[id].map((colors) => (
            <TouchableOpacity
              key={`${id}-${colors[0]}-${colors[1]}`}
              onPress={() => {
                setColors(colors);
                router.back();
              }}
            >
              <AnimatedLinearGradient
                colors={colors}
                sharedTransitionTag={`${id}-${colors[0]}-${colors[1]}`}
                style={styles.gradient}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "white",
  },
  layout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    marginBottom: 16,
    borderRadius: 20,
    width: 76,
    height: 76,
    opacity: 1,
  },
});
