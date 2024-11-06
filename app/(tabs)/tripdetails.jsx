import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TripDetails() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#3B4992]">
      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3B4992" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-4">Trip Details</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-[#3B4992] font-semibold text-lg mb-2">#TR12345678</Text>
            
            {/* Stops Section */}
            <View className="space-y-4">
              {/* Stop 1 */}
              <View className="flex-row">
                <View className="items-center mr-4">
                  <View className="w-8 h-8 rounded-full bg-[#3B4992] items-center justify-center">
                    <Text className="text-white font-bold">1</Text>
                  </View>
                  <View className="h-full w-0.5 bg-gray-200 my-1" />
                </View>
                
                <View className="flex-1">
                  <Text className="font-semibold">ABC Logistics</Text>
                  <Text className="text-gray-600">123 Business St, Sacramento</Text>
                  <Text className="text-gray-500">08:00 AM - Pickup</Text>
                  <View className="mt-2">
                    <Text className="text-gray-600">Contact: John Smith</Text>
                    <Text className="text-gray-600">Phone: (555) 123-4567</Text>
                    <Text className="text-gray-600">Load: 2 Pallets</Text>
                  </View>
                </View>
              </View>

              {/* Add more stops here */}
            </View>

            <TouchableOpacity 
              className="bg-[#3B4992] py-3 rounded-full mt-6"
              onPress={() => router.push('/(tabs)/livetracking')}
            >
              <Text className="text-white text-center font-semibold">Start Navigation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 