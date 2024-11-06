import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to DeliverEase',
    description: 'Your smart delivery management companion',
    image: require('../assets/onboarding-1.png'),
  },
  {
    id: '2',
    title: 'Efficient Route Planning',
    description: 'Optimize your deliveries with smart navigation',
    image: require('../assets/onboarding-2.png'),
  },
  {
    id: '3',
    title: 'Real-time Updates',
    description: 'Stay connected with live delivery tracking',
    image: require('../assets/onboarding-3.png'),
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View className="flex-1 items-center justify-center px-8">
      <Image source={item.image} className="w-72 h-72" />
      <Text className="text-2xl font-bold text-center mt-8">{item.title}</Text>
      <Text className="text-gray-600 text-center mt-4 text-lg">
        {item.description}
      </Text>
    </View>
  );

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(auth)/login');
    } catch (error) {
      console.error(error);
      router.replace('/(auth)/login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / 
            e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
      />
      
      <View className="flex-row justify-center space-x-2 mb-8">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      <View className="px-8 mb-8">
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl"
          onPress={handleGetStarted}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding; 