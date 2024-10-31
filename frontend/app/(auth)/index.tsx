// app/(auth)/index.tsx
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Phone } from "lucide-react-native";
import { useState, useRef, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const BACKGROUND_IMAGE =
  "https://ik.imagekit.io/gd897zisnh/pexels-ketut-subiyanto-4247817-min%20(2).jpg?updatedAt=1730386933047";

export default function Welcome() {
  const [showSignIn, setShowSignIn] = useState(false);
  // const video = useRef<Video>(null);

  // useEffect(() => {
  //   const playVideo = async () => {
  //     if (video.current) {
  //       try {
  //         await video.current.playAsync();
  //         await video.current.setIsLoopingAsync(true);
  //       } catch (error) {
  //         console.error("Error playing video:", error);
  //       }
  //     }
  //   };

  //   playVideo();
  // }, []);

  const renderMainButtons = () => (
    <Animated.View
      className="space-y-3"
      entering={FadeInDown.springify().mass(0.5)}
      exiting={FadeOutDown.springify().mass(0.5)}
    >
      <Link href="/phone" asChild>
        <AnimatedTouchableOpacity
          className="bg-primary-500 py-4 my-3 rounded-full"
          entering={FadeIn.delay(200).springify()}
        >
          <Text className="text-white font-semibold text-center">
            Create Account
          </Text>
        </AnimatedTouchableOpacity>
      </Link>

      <AnimatedTouchableOpacity
        className="py-4 my-1 rounded-full"
        onPress={() => setShowSignIn(true)}
        entering={FadeIn.delay(400).springify()}
      >
        <Text className="text-white font-semibold text-center">Sign in</Text>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );

  const renderSignInOptions = () => (
    <Animated.View
      className="space-y-3"
      entering={SlideInDown.springify().mass(0.5)}
      exiting={SlideOutDown.springify().mass(0.5)}
    >
      {/* Phone Number */}
      <Link href="/phone" asChild>
        <AnimatedTouchableOpacity
          className="flex-row items-center justify-center mb-3 mt-2 bg-primary-500 py-4 rounded-full space-x-2"
          entering={FadeIn.delay(200).springify()}
        >
          <Phone size={16} color="black" />
          <Text className="text-white ml-2 font-semibold">
            Sign in with phone number
          </Text>
        </AnimatedTouchableOpacity>
      </Link>

      {/* Google */}
      <AnimatedTouchableOpacity
        className="flex-row items-center mb-3 justify-center bg-white py-4 rounded-full space-x-2"
        entering={FadeIn.delay(300).springify()}
      >
        <Text className="text-black font-semibold">Sign in with Google</Text>
      </AnimatedTouchableOpacity>

      {/* Apple (iOS only) */}
      {Platform.OS === "ios" && (
        <AnimatedTouchableOpacity
          className="flex-row items-center justify-center bg-white py-4 rounded-full space-x-2"
          entering={FadeIn.delay(400).springify()}
        >
          <Text className="text-black font-semibold">Sign in with Apple</Text>
        </AnimatedTouchableOpacity>
      )}

      {/* Back Button */}
      <AnimatedTouchableOpacity
        className="py-3 my-1 rounded-full"
        onPress={() => setShowSignIn(false)}
        entering={FadeIn.delay(600).springify()}
      >
        <Text className="text-white font-semibold text-center">Back</Text>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1">
      {/* Background Video */}
      {/* <Video
        ref={video}
        source={require("../../assets/videos/welcome-video.mp4")}
        className="absolute w-full h-full"
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      /> */}
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE }}
        className="absolute w-full h-full object-contain"
        resizeMode="cover"
      ></ImageBackground>

      {/* Semi-transparent overlay */}
      <View className="absolute w-full h-full bg-black/40" />

      <SafeAreaView className="flex-1">
        <View className="flex-1">
          {/* Absolutely positioned title and tagline */}
          <View className="absolute inset-x-0 top-1/3 -translate-y-1/2">
            <Animated.View
              entering={FadeIn.duration(1000)}
              className="items-center px-6"
            >
              <Animated.Text
                className="text-4xl font-bold text-white mb-2"
                entering={FadeIn.duration(1000)}
              >
                leftovers
              </Animated.Text>
              <Animated.Text
                className="text-lg text-white/90"
                entering={FadeIn.delay(400).duration(1000)}
              >
                Missing connections, found again!
              </Animated.Text>
            </Animated.View>
          </View>

          {/* Bottom content */}
          <View className="absolute inset-x-0 bottom-0 px-6">
            {/* Disclaimer Text */}
            <Animated.View
              className="mb-6"
              entering={FadeIn.delay(200).duration(1000)}
            >
              <Text className="text-center text-sm text-white/80">
                By tapping Create Account or Sign In, you agree to our
                <Text className="text-white font-semibold"> Terms</Text>. Learn
                how we process your data in our
                <Text className="text-white font-semibold">
                  {" "}
                  Privacy Policy{" "}
                </Text>
                and{" "}
                <Text className="text-white font-semibold">Cookies Policy</Text>
                .
              </Text>
            </Animated.View>

            {/* Buttons Section */}
            <View className="mb-8">
              {showSignIn ? renderSignInOptions() : renderMainButtons()}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
