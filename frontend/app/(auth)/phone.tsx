import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhoneAuth() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <TouchableOpacity className="p-4" onPress={() => router.back()}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <View className="flex-1 px-6 pt-8">
        <Text className="text-2xl font-bold mb-2">My phone number is</Text>
        <Text className="text-gray-500 mb-8">
          We'll send you a code to verify your number
        </Text>

        {/* Phone Input */}
        <View className="space-y-6">
          <TextInput
            className="text-lg border-b-2 border-gray-200 pb-2"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            autoFocus
          />
          <TouchableOpacity
            className={`py-4 rounded-full ${
              phoneNumber.length >= 10 ? "bg-primary-500" : "bg-gray-200"
            }`}
            disabled={phoneNumber.length < 10}
            onPress={() => {}}
          >
            <Text
              className={`text-center font-semibold ${
                phoneNumber.length >= 10 ? "text-white" : "text-gray-400"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
