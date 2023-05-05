import React from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

import { data } from "../data";
import { useColors } from "./_layout";

export default function Home() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { colors } = useColors();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFocused ? 1 : 0.85) }],
  }));

  return (
    <ScrollView style={[styles.container]}>
      <Animated.View style={animatedStyle}>
        <LinearGradient colors={colors} style={styles.headerGradient} />
        <View style={styles.layout}>
          {Object.keys(data).map((key) => (
            <View style={styles.wrapper} key={key}>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "id",
                    params: { id: key },
                  });
                }}
                style={[styles.layout, styles.gradientContainer]}
              >
                {/* first 3 gradients */}
                {data[key].slice(0, 3).map((colors) => (
                  <AnimatedLinearGradient
                    colors={colors}
                    key={`${key}-${colors[0]}-${colors[1]}`}
                    sharedTransitionTag={`${key}-${colors[0]}-${colors[1]}`}
                    style={styles.large}
                  />
                ))}
                <View style={[styles.layout, styles.smallGradientContainer]}>
                  {/* next 4 gradients */}
                  {data[key].slice(3, 7).map((colors) => (
                    <AnimatedLinearGradient
                      colors={colors}
                      key={`${key}-${colors[0]}-${colors[1]}`}
                      sharedTransitionTag={`${key}-${colors[0]}-${colors[1]}`}
                      style={styles.small}
                    />
                  ))}
                </View>
                {/* rest of the gradients but hidden with scale 0 */}
                {data[key].slice(7, data[key].length).map((colors) => (
                  <AnimatedLinearGradient
                    key={`${key}-${colors[0]}-${colors[1]}`}
                    colors={colors}
                    sharedTransitionTag={`${key}-${colors[0]}-${colors[1]}`}
                    style={styles.hidden}
                  />
                ))}
              </Pressable>
              <Text style={styles.label}>{key}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151e23",
  },
  headerGradient: {
    height: 145,
    width: "100%",
    marginBottom: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  layout: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapper: {
    width: "50%",
    marginBottom: 8,
  },
  label: {
    textTransform: "capitalize",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  gradientContainer: {
    backgroundColor: "#232E35",
    borderRadius: 20,
    padding: 4,
    margin: 8,
  },
  large: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
    width: 76,
    height: 76,
  },
  smallGradientContainer: {
    width: "50%",
  },
  small: {
    width: 34,
    height: 34,
    borderRadius: 14,
    margin: 4,
  },
  hidden: {
    height: 32,
    width: 32,
    borderRadius: 20,
    position: "absolute",
    transform: [{ scale: 0 }],
  },
});
