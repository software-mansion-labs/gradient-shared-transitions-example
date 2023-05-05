import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import React from "react";

const ColorsContext = React.createContext(null);
export const useColors = () => React.useContext(ColorsContext);

export default function Layout() {
  const [colors, setColors] = React.useState(["transparent", "transparent"]);

  return (
    <ColorsContext.Provider value={{ colors, setColors }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Choose mood",
            headerLargeTitle: true,
            headerTransparent: true,
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </ColorsContext.Provider>
  );
}
