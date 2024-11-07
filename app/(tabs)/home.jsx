import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  
  // Sample trip data - in real app, this would come from an API
  const todaysTrips = [
    {
      id: 'TR12345678',
      status: 'active',
      pickup: {
        name: 'ABC Logistics',
        location: 'Sacramento',
        time: '08:00 AM'
      },
      delivery: {
        name: 'XYZ Company',
        location: 'San Francisco',
        time: '02:00 PM'
      },
      load: '2 Pallets',
      stops: 3,
      isStarted: true
    },
    {
      id: 'TR98765432',
      status: 'pending',
      pickup: {
        name: 'Global Shipping Co.',
        location: 'Oakland',
        time: '11:30 AM'
      },
      delivery: {
        name: 'Tech Solutions Inc.',
        location: 'San Jose',
        time: '04:30 PM'
      },
      load: '5 Boxes',
      stops: 2,
      isStarted: false
    },
    {
      id: 'TR45678901',
      status: 'scheduled',
      pickup: {
        name: 'Fresh Foods Market',
        location: 'Berkeley',
        time: '03:00 PM'
      },
      delivery: {
        name: 'Restaurant Supply Co.',
        location: 'Palo Alto',
        time: '06:30 PM'
      },
      load: '3 Containers',
      stops: 4,
      isStarted: false
    }
  ];

  const handleTripPress = (trip) => {
    if (trip.isStarted) {
      router.push({
        pathname: '/(tabs)/livetracking',
        params: { tripId: trip.id }
      });
    } else {
      router.push({
        pathname: '/(tabs)/tripdetails',
        params: { tripId: trip.id }
      });
    }
  };

  const renderTripCard = (trip) => (
    <TouchableOpacity 
      key={trip.id}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => handleTripPress(trip)}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#3B4992] font-semibold">#{trip.id}</Text>
        <View className={`px-3 py-1 rounded-full ${
          trip.status === 'active' ? 'bg-green-100' :
          trip.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
        }`}>
          <Text className={`text-sm ${
            trip.status === 'active' ? 'text-green-600' :
            trip.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-2 mb-2">
        <View className="flex-1">
          <Text className="text-gray-600">Pickup</Text>
          <Text className="font-semibold">{trip.pickup.name}</Text>
          <Text className="text-sm text-gray-500">{trip.pickup.time}</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#3B4992" />
        <View className="flex-1">
          <Text className="text-gray-600">Delivery</Text>
          <Text className="font-semibold">{trip.delivery.name}</Text>
          <Text className="text-sm text-gray-500">{trip.delivery.time}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="cube-outline" size={20} color="#3B4992" />
          <Text className="text-gray-600">{trip.load}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <Ionicons name="location-outline" size={20} color="#3B4992" />
          <Text className="text-gray-600">{trip.stops} Stops</Text>
        </View>
        {!trip.isStarted && (
          <TouchableOpacity 
            className={`px-4 py-2 rounded-full ${
              trip.status === 'pending' ? 'bg-gray-200' : 'bg-[#3B4992]'
            }`}
            disabled={trip.status === 'pending'}
            onPress={() => router.push('/(tabs)/livetracking')}
          >
            <Text className={trip.status === 'pending' ? 'text-gray-600' : 'text-white'}>
              {trip.status === 'pending' ? 'Pending' : 'Start Trip'}
            </Text>
          </TouchableOpacity>
        )}
        {trip.isStarted && (
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600">In Progress</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#3B5992]">
      {/* Header Section */}
      <View className="px-4 pt-2 pb-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Image 
              source={{ uri: 'https://placeholder.com/user-avatar.jpg' }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text className="text-white text-sm">Welcome Back!</Text>
              <Text className="text-white font-semibold text-lg">CMTI</Text>
            </View>
          </View>
          <View className="flex-row space-x-4">
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs">2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-4">
        {/* Quick Stats Section */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-blue-50 p-3 rounded-xl flex-1 mr-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-[#3B4992] font-semibold">Today's Tasks</Text>
              <MaterialCommunityIcons name="truck-delivery" size={24} color="#3B4992" />
            </View>
            <Text className="text-2xl font-bold text-[#3B4992] mt-2">3</Text>
          </View>
          <View className="bg-green-50 p-3 rounded-xl flex-1 ml-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-green-700 font-semibold">Completed</Text>
              <Ionicons name="checkmark-circle" size={24} color="green" />
            </View>
            <Text className="text-2xl font-bold text-green-700 mt-2">1</Text>
          </View>
        </View>

        {/* Search and Filter */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mr-2">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput 
              placeholder="Search trips..."
              className="ml-2 flex-1"
            />
          </View>
          <TouchableOpacity className="bg-[#3B4992] p-2 rounded-xl">
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Weather Alert */}
        <TouchableOpacity className="bg-orange-100 p-4 rounded-xl mb-4">
          <View className="flex-row items-center">
            <Ionicons name="warning-outline" size={24} color="orange" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-orange-800">Weather Alert</Text>
              <Text className="text-orange-700 text-sm">Heavy rain expected on your route to Bengaluru</Text>
            </View>
          </View>
          
        </TouchableOpacity>
{/* 
        <View className="flex-row justify-around bg-gray-50 p-2 rounded-xl mb-4">
            <TouchableOpacity className="items-center">
              <View className="bg-blue-100 w-8 h-8 rounded-full items-center justify-center mb-1">
                <Ionicons name="document-text" size={14} color="#3B4992" />
              </View>
              <Text className="text-xs text-gray-600">Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mb-1">
                <Ionicons name="call" size={24} color="green" />
              </View>
              <Text className="text-xs text-gray-600">Support</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-purple-100 w-8 h-8 rounded-full items-center justify-center mb-1">
                <Ionicons name="stats-chart" size={24} color="purple" />
              </View>
              <Text className="text-xs text-gray-600">Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="bg-orange-100 w-8 h-8 rounded-full items-center justify-center mb-1">
                <Ionicons name="settings" size={24} color="orange" />
              </View>
              <Text className="text-xs text-gray-600">Settings</Text>
            </TouchableOpacity>
          </View> */}

        {/* Trip Sheets Section */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold">Today's Trip Sheets</Text>
          <TouchableOpacity
onPress={() => router.push('/(tabs)/tripsheets')}
className="flex-row items-center"
>
<Text className="text-[#3B4992] mr-1">View All Trips</Text>
<Ionicons name="arrow-forward" size={20} color="#3B4992" />
</TouchableOpacity>

          
        </View>

        {/* Trip Cards ScrollView */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {todaysTrips.map(renderTripCard)}

          {/* Quick Actions Bar */}
          
          </ScrollView>

          {/* Emergency Contact */}
          <TouchableOpacity className="flex-row items-center bg-red-50 p-2 rounded-xl ">
            <View className="bg-red-100 p-2 rounded-full">
              <Ionicons name="call" size={14} color="red" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-red-700">Emergency Contact</Text>
              <Text className="text-red-600 text-sm">24/7 Support Hotline</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="red" />
          </TouchableOpacity>

          
        
      </View>
    </SafeAreaView>
  );
} 