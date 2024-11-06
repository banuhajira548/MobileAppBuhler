import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-2">
          <View>
            <Text className="text-gray-500">Location</Text>
            <View className="flex-row items-center space-x-1">
              <Ionicons name="location" size={18} color="#6366F1" />
              <Text className="font-semibold text-gray-800">CMTI, Bangalore</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="notifications-outline" size={24} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Track Package Card */}
        <View className="mx-4 mt-4 bg-indigo-500 rounded-2xl p-4">
          <Text className="text-white text-lg font-semibold mb-2">
            Track your package
          </Text>
          <Text className="text-white opacity-80 mb-4">
            Please enter your tracking number
          </Text>
          <View className="flex-row items-center bg-white rounded-xl p-2">
            <TextInput
              placeholder="Tracking number"
              className="flex-1 px-2"
            />
            <TouchableOpacity className="bg-indigo-500 p-2 rounded-lg">
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-around mx-4 mt-6">
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-orange-100 rounded-xl items-center justify-center mb-1">
              <Ionicons name="cube-outline" size={24} color="#F97316" />
            </View>
            <Text className="text-sm text-gray-600">Track Order</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mb-1">
              <Ionicons name="bookmark-outline" size={24} color="#3B82F6" />
            </View>
            <Text className="text-sm text-gray-600">Book Package</Text>
          </TouchableOpacity>
        </View>

        {/* Current Shipment */}
        <View className="mx-4 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Current Shipment</Text>
            <TouchableOpacity>
              <Text className="text-indigo-500">See all</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="font-semibold text-lg">Collection</Text>
                <Text className="text-gray-500 text-sm">
                  #Tracking ID: COL2313546125
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-3 mb-2">
              <View className="w-2 h-2 bg-indigo-500 rounded-full" />
              <Text className="text-gray-600">CMTI, Bangalore</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-2 h-2 bg-gray-300 rounded-full" />
              <Text className="text-gray-600">3/04 Mirpur 11, </Text>
            </View>

            <View className="mt-3 pt-3 border-t border-gray-100">
              <Text className="text-gray-600">
                Status: <Text className="text-indigo-500">Your package is in transit</Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="mx-4 mt-6">
          

          <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="font-semibold text-lg">Delivery</Text>
                <Text className="text-gray-500 text-sm">
                  #Tracking ID: DEL2313546125
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-3 mb-2">
              <View className="w-2 h-2 bg-indigo-500 rounded-full" />
              <Text className="text-gray-600">Koramangala</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-2 h-2 bg-gray-300 rounded-full" />
              <Text className="text-gray-600">Brigade Road </Text>
            </View>

            <View className="mt-3 pt-3 border-t border-gray-100">
              <Text className="text-gray-600">
                Status: <Text className="text-indigo-500">Your package is in transit</Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="mx-4 mt-6">

        <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="font-semibold text-lg">Collection</Text>
                <Text className="text-gray-500 text-sm">
                  #Tracking ID: COL2313546125
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-3 mb-2">
              <View className="w-2 h-2 bg-indigo-500 rounded-full" />
              <Text className="text-gray-600">M G Road</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-2 h-2 bg-gray-300 rounded-full" />
              <Text className="text-gray-600">Indiranagar </Text>
            </View>

            <View className="mt-3 pt-3 border-t border-gray-100">
              <Text className="text-gray-600">
                Status: <Text className="text-indigo-500">Your package is in transit</Text>
              </Text>
            </View>
        </View>     
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;