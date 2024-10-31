import { Stack } from "expo-router";
import "../../global.css";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="phone" options={{ headerShown: false }} />
    </Stack>
  );
}
