import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function TripDetails() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const [tripStatus, setTripStatus] = useState('scheduled');

  // Enhanced trip data with more stops
  const tripDetails = {
    id: tripId,
    status: tripStatus,
    date: '2024-03-15',
    totalStops: 4,
    totalDistance: '150 miles',
    estimatedDuration: '6 hours',
    stops: [
      {
        id: 1,
        type: 'pickup',
        company: 'ABC Logistics',
        address: '123 Business St, Sacramento',
        time: '08:00 AM',
        contact: {
          name: 'John Smith',
          phone: '(555) 123-4567'
        },
        load: {
          type: 'Pallets',
          quantity: 2,
          weight: '500 kg'
        },
        instructions: 'Use dock 5, forklift available'
      },
      {
        id: 2,
        type: 'delivery',
        company: 'XYZ Corp',
        address: '456 Industry Ave, San Francisco',
        time: '10:30 AM',
        contact: {
          name: 'Jane Doe',
          phone: '(555) 987-6543'
        },
        load: {
          type: 'Pallets',
          quantity: 1,
          weight: '250 kg'
        },
        instructions: 'Call upon arrival'
      },
      {
        id: 3,
        type: 'pickup',
        company: 'Global Shipping',
        address: '789 Port Road, Oakland',
        time: '01:00 PM',
        contact: {
          name: 'Mike Johnson',
          phone: '(555) 246-8135'
        },
        load: {
          type: 'Containers',
          quantity: 3,
          weight: '750 kg'
        },
        instructions: 'Security check required at entrance'
      },
      {
        id: 4,
        type: 'delivery',
        company: 'Tech Solutions Inc',
        address: '321 Innovation Blvd, San Jose',
        time: '03:30 PM',
        contact: {
          name: 'Sarah Wilson',
          phone: '(555) 369-1470'
        },
        load: {
          type: 'Containers',
          quantity: 3,
          weight: '750 kg'
        },
        instructions: 'Delivery at rear entrance only'
      }
    ]
  };

  const handleStartTrip = () => {
    setTripStatus('active');
    router.push({
      pathname: '/(tabs)/livetracking',
      params: { tripId }
    });
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3B4992]">
      <View className="flex-1 bg-white rounded-t-3xl">
        {/* Fixed Header */}
        <View className="px-4 pt-4 pb-2 bg-white rounded-t-3xl">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={24} color="#3B4992" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Trip Details</Text>
            <View className={`px-3 py-1 rounded-full ${
              tripStatus === 'active' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <Text className={`${
                tripStatus === 'active' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {tripStatus.charAt(0).toUpperCase() + tripStatus.slice(1)}
              </Text>
            </View>
          </View>

          {/* Quick Stats Row */}
          <View className="flex-row justify-between mt-4 bg-gray-50 p-3 rounded-xl">
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Total Stops</Text>
              <Text className="text-lg font-semibold text-[#3B4992]">{tripDetails.totalStops}</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Distance</Text>
              <Text className="text-lg font-semibold text-[#3B4992]">{tripDetails.totalDistance}</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Duration</Text>
              <Text className="text-lg font-semibold text-[#3B4992]">{tripDetails.estimatedDuration}</Text>
            </View>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Trip Timeline */}
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-4">Trip Timeline</Text>
            {tripDetails.stops.map((stop, index) => (
              <View key={stop.id} className="mb-4">
                <View className="flex-row">
                  {/* Timeline Indicator */}
                  <View className="items-center mr-4 w-8">
                    <View className={`w-8 h-8 rounded-full ${
                      stop.type === 'pickup' ? 'bg-[#3B4992]' : 'bg-green-500'
                    } items-center justify-center`}>
                      <Text className="text-white font-bold">{index + 1}</Text>
                    </View>
                    {index < tripDetails.stops.length - 1 && (
                      <View className="h-24 w-0.5 bg-gray-200 my-1" />
                    )}
                  </View>

                  {/* Stop Details Card */}
                  <View className="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-2">
                      <View>
                        <Text className="font-semibold text-lg">{stop.company}</Text>
                        <Text className="text-[#3B4992]">{stop.time}</Text>
                      </View>
                      <View className={`px-3 py-1 rounded-full ${
                        stop.type === 'pickup' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <Text className={`${
                          stop.type === 'pickup' ? 'text-blue-600' : 'text-green-600'
                        } capitalize`}>
                          {stop.type}
                        </Text>
                      </View>
                    </View>

                    {/* Address */}
                    <Text className="text-gray-600 mb-2">{stop.address}</Text>

                    {/* Contact Info */}
                    <View className="flex-row justify-between items-center bg-gray-50 p-2 rounded-lg mb-2">
                      <View>
                        <Text className="text-gray-600">{stop.contact.name}</Text>
                        <Text className="text-[#3B4992]">{stop.contact.phone}</Text>
                      </View>
                      <TouchableOpacity 
                        onPress={() => handleCall(stop.contact.phone)}
                        className="bg-green-100 p-2 rounded-full"
                      >
                        <Ionicons name="call" size={20} color="green" />
                      </TouchableOpacity>
                    </View>

                    {/* Load Details */}
                    <View className="bg-gray-50 p-2 rounded-lg mb-2">
                      <Text className="font-semibold mb-1">Load Details</Text>
                      <Text className="text-gray-600">
                        {stop.load.quantity} {stop.load.type} - {stop.load.weight}
                      </Text>
                    </View>

                    {/* Instructions */}
                    {stop.instructions && (
                      <View className="bg-yellow-50 p-2 rounded-lg">
                        <Text className="font-semibold mb-1">Instructions</Text>
                        <Text className="text-gray-600">{stop.instructions}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom Action Button */}
        <View className="px-4 py-3 bg-white border-t border-gray-100">
          {tripStatus !== 'active' ? (
            <TouchableOpacity 
              className="bg-[#3B4992] py-3 rounded-full"
              onPress={handleStartTrip}
            >
              <Text className="text-white text-center font-semibold">Start Trip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              className="bg-green-500 py-3 rounded-full"
              onPress={() => router.push({
                pathname: '/(tabs)/livetracking',
                params: { tripId }
              })}
            >
              <Text className="text-white text-center font-semibold">Continue to Live Tracking</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
} 