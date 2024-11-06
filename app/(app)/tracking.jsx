import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Tracking = () => {
  const router = useRouter();

  // Example coordinates - replace with actual tracking data
  const origin = {
    latitude: 40.7282,
    longitude: -73.8987,
    title: 'Pickup Location'
  };
  
  const destination = {
    latitude: 40.7246,
    longitude: -73.8919,
    title: 'Delivery Location'
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-2 bg-white">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2"
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-2">Live Tracking</Text>
      </View>

      {/* Map View */}
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: (origin.latitude + destination.latitude) / 2,
            longitude: (origin.longitude + destination.longitude) / 2,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* Origin Marker */}
          <Marker coordinate={origin}>
            <View className="bg-indigo-500 p-2 rounded-full">
              <Ionicons name="location" size={20} color="white" />
            </View>
          </Marker>

          {/* Destination Marker */}
          <Marker coordinate={destination}>
            <View className="bg-indigo-500 p-2 rounded-full">
              <Ionicons name="flag" size={20} color="white" />
            </View>
          </Marker>

          {/* Route Line */}
          <Polyline
            coordinates={[origin, destination]}
            strokeColor="#6366F1"
            strokeWidth={3}
          />
        </MapView>

        {/* Zoom Controls */}
        <View className="absolute right-4 top-1/3 bg-white rounded-lg shadow-lg">
          <TouchableOpacity className="p-2 border-b border-gray-100">
            <Ionicons name="add" size={24} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons name="remove" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Package Information Card */}
      <View className="absolute bottom-0 w-full">
        <View className="bg-white rounded-t-3xl shadow-lg p-4 space-y-4">
          <Text className="text-lg font-semibold">Package Information</Text>
          
          {/* Delivery Details */}
          <View className="flex-row justify-between">
            <View className="space-y-1">
              <Text className="text-gray-500">Delivery Type:</Text>
              <View className="flex-row items-center space-x-2">
                <Ionicons name="flash" size={20} color="#6366F1" />
                <Text className="font-medium">Express delivery</Text>
              </View>
            </View>
            <View className="space-y-1">
              <Text className="text-gray-500">Package weight:</Text>
              <Text className="font-medium">2.40KG</Text>
            </View>
          </View>

          {/* Delivery Person Info */}
          <View className="flex-row justify-between items-center bg-gray-50 p-3 rounded-xl mt-2">
            <View className="flex-row items-center space-x-3">
              <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                <Ionicons name="person" size={20} color="#6366F1" />
              </View>
              <View>
                <Text className="font-medium">Arlene McCoy</Text>
                <Text className="text-gray-500 text-sm">Delivery man</Text>
              </View>
            </View>
            <View className="flex-row space-x-3">
              <TouchableOpacity className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Ionicons name="chatbubble-ellipses" size={20} color="#6366F1" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Ionicons name="call" size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tracking; 