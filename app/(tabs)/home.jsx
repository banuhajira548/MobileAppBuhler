import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-[#3B4992]">
      {/* Header Section */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Image 
              source={{ uri: 'https://placeholder.com/user-avatar.jpg' }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text className="text-white text-sm">Welcome Back!</Text>
              <Text className="text-white font-semibold text-lg">John Driver</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-4">
        <Text className="text-lg font-semibold mb-4">Today's Trip Sheets</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Trip Card */}
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
            onPress={() => router.push('/(tabs)/tripdetails')}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#3B4992] font-semibold">#TR12345678</Text>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-600 text-sm">Active</Text>
              </View>
            </View>

            <View className="flex-row items-center space-x-2 mb-2">
              <View className="flex-1">
                <Text className="text-gray-600">Pickup</Text>
                <Text className="font-semibold">ABC Logistics, Sacramento</Text>
                <Text className="text-sm text-gray-500">08:00 AM</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#3B4992" />
              <View className="flex-1">
                <Text className="text-gray-600">Delivery</Text>
                <Text className="font-semibold">XYZ Company, San Francisco</Text>
                <Text className="text-sm text-gray-500">02:00 PM</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="cube-outline" size={20} color="#3B4992" />
                <Text className="text-gray-600">2 Pallets</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <Ionicons name="location-outline" size={20} color="#3B4992" />
                <Text className="text-gray-600">3 Stops</Text>
              </View>
              <TouchableOpacity 
                className="bg-[#3B4992] px-4 py-2 rounded-full"
                onPress={() => router.push('/(tabs)/livetracking')}
              >
                <Text className="text-white">Start Trip</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Add more trip cards here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 