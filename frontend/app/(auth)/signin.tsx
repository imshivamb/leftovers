import { Link, useRouter } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Phone } from "lucide-react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <TouchableOpacity className="p-4 " onPress={() => router.back()}>
        <ArrowLeft className="size-6 text-black" />
      </TouchableOpacity>
      <View className="flex-1 px-6 pt-8">
        <Text className="text-2xl font-bold mb-8">Sign in</Text>

        {/* Sign in Options */}
        <View className="space-y-4">
          {/* Phone Number */}
          <Link href="/phone" asChild>
            <TouchableOpacity className="flex-row items-center bg-primary-500 text-white p-4 rounded-full">
              <Phone className="size-6 text-white mr-3" />
              <Text className="text-black font-semibold">
                Sign in with phone number
              </Text>
            </TouchableOpacity>
          </Link>
          {/* Google */}
          <TouchableOpacity className="flex-row items-center bg-white text-black p-4 rounded-full">
            <Text className="text-black font-semibold ml-3">
              Sign in with Google
            </Text>
          </TouchableOpacity>

          {/* Apple (iOS only) */}
          {Platform.OS === "ios" && (
            <TouchableOpacity className="flex-row items-center bg-white text-black p-4 rounded-full">
              <Text className="text-black font-semibold ml-3">
                Sign in with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
