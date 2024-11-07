import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  useSharedValue
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const router = useRouter();
  const segments = useSegments();
  const logoScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        logoScale.value = withSpring(1);
        textOpacity.value = withTiming(1, { duration: 1000 });

        // Wait for animations
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (hasSeenOnboarding) {
          router.replace('/(auth)/login');
        } else {
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error(error);
        router.replace('/onboarding');
      }
    };

    checkFirstTime();
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }]
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }));

  return (
    <View className="flex-1 bg-blue-600 items-center justify-center">
      <Animated.View style={logoStyle}>
        <View className="w-40 h-40 bg-white rounded-full items-center justify-center">
          <Text className="text-blue-600 text-4xl font-bold">BHD</Text>
        </View>
      </Animated.View>
      <Animated.Text 
        style={textStyle}
        className="text-white text-3xl font-bold mt-4"
      >
        Buhler Driver App
      </Animated.Text>
      <Animated.Text 
        style={textStyle}
        className="text-white text-lg mt-2"
      >
        Your Delivery Partner
      </Animated.Text>
    </View>
  );
};

export default Splash; 