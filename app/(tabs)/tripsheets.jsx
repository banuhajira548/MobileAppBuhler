import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

export default function TripSheets() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Sample trip data - would come from API in real app
  const [trips] = useState({
    '2024-11-07': [
      {
        id: 'TR12345678',
        status: 'completed',
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
        stops: 3,
        totalDistance: '150 miles'
      },
      {
        id: 'TR87654321',
        status: 'active',
        pickup: {
          name: 'Global Shipping',
          location: 'Oakland',
          time: '10:00 AM'
        },
        delivery: {
          name: 'Tech Solutions',
          location: 'San Jose',
          time: '03:00 PM'
        },
        stops: 2,
        totalDistance: '120 miles'
      }
    ],
    '2024-03-14': [
      {
        id: 'TR11223344',
        status: 'completed',
        pickup: {
          name: 'Fresh Foods',
          location: 'Berkeley',
          time: '09:00 AM'
        },
        delivery: {
          name: 'Restaurant Supply',
          location: 'Palo Alto',
          time: '01:00 PM'
        },
        stops: 4,
        totalDistance: '80 miles'
      }
    ]
  });

  const getMarkedDates = () => {
    const marked = {};
    Object.keys(trips).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: '#3B4992'
      };
    });
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#3B4992'
      };
    }
    return marked;
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'active':
        return 'bg-blue-100 text-blue-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderTripCard = useCallback((trip) => (
    <TouchableOpacity 
      key={trip.id}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => router.push({
        pathname: '/(tabs)/tripdetails',
        params: { tripId: trip.id }
      })}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#3B4992] font-semibold">#{trip.id}</Text>
        <View className={`px-3 py-1 rounded-full ${getStatusColor(trip.status).split(' ')[0]}`}>
          <Text className={getStatusColor(trip.status).split(' ')[1]}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-2 mb-3">
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

      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text className="text-gray-600 ml-1">{trip.stops} Stops</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="road-variant" size={16} color="gray" />
          <Text className="text-gray-600 ml-1">{trip.totalDistance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Add a function to get filtered trips
  const getFilteredTrips = useCallback(() => {
    if (!selectedDate || !trips[selectedDate]) return [];
    
    return trips[selectedDate].filter(trip => {
      if (filterStatus === 'all') return true;
      return trip.status === filterStatus;
    });
  }, [selectedDate, trips, filterStatus]);

  // Add a function to get counts for each status
  const getStatusCounts = useCallback(() => {
    if (!selectedDate || !trips[selectedDate]) {
      return { all: 0, pending: 0, completed: 0, active: 0 };
    }

    return trips[selectedDate].reduce((acc, trip) => {
      acc.all += 1;
      acc[trip.status] += 1;
      return acc;
    }, { all: 0, pending: 0, completed: 0, active: 0 });
  }, [selectedDate, trips]);

  // Update the filter buttons section
  const renderFilterButtons = () => {
    const counts = getStatusCounts();
    const filters = [
      { id: 'all', icon: 'layers-outline', color: '#3B4992' },
      { id: 'pending', icon: 'time-outline', color: '#F59E0B' },
      { id: 'active', icon: 'play-circle-outline', color: '#3B82F6' },
      { id: 'completed', icon: 'checkmark-circle-outline', color: '#10B981' }
    ];

    return (
      <View className="flex-row justify-between mb-4">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setFilterStatus(filter.id)}
            className={`flex-row items-center px-3 py-2 rounded-lg ${
              filterStatus === filter.id 
                ? 'bg-gray-100' 
                : 'bg-white'
            }`}
            style={{
              borderWidth: 1,
              borderColor: filterStatus === filter.id ? filter.color : '#E5E7EB'
            }}
          >
            <Ionicons 
              name={filter.icon} 
              size={16} 
              color={filter.color}
            />
            <Text className="ml-1 capitalize" style={{ color: filter.color }}>
              {filter.id} ({counts[filter.id]})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-xl font-semibold">Trip Sheets</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity 
              onPress={() => setShowCalendar(!showCalendar)}
              className="bg-gray-100 p-2 rounded-full"
            >
              <Ionicons name="calendar" size={20} color="#3B4992" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {/* Add export functionality */}}
              className="bg-[#3B4992] p-2 rounded-full"
            >
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput 
              placeholder="Search trips..."
              className="ml-2 flex-1"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filter Buttons */}
        {renderFilterButtons()}

        {/* Selected Date Display */}
        {selectedDate && (
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-[#3B4992]">
              {formatDate(selectedDate)}
            </Text>
            <TouchableOpacity 
              onPress={() => setSelectedDate('')}
              className="bg-gray-100 px-3 py-1 rounded-full"
            >
              <Text className="text-gray-600">Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Trip List */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {selectedDate && getFilteredTrips().map(trip => renderTripCard(trip))}
          {!selectedDate && (
            <View className="items-center py-8">
              <TouchableOpacity 
                onPress={() => setShowCalendar(true)}
                className="flex-row items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
              >
                <Ionicons name="calendar-outline" size={20} color="#3B4992" />
                <Text className="text-[#3B4992]">Select a date to view trips</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Calendar Modal */}
        {showCalendar && (
          <View className="absolute top-20 left-0 right-0 z-50 bg-white rounded-xl shadow-lg mx-4">
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={getMarkedDates()}
              theme={{
                selectedDayBackgroundColor: '#3B4992',
                todayTextColor: '#3B4992',
                dotColor: '#3B4992',
                arrowColor: '#3B4992',
                monthTextColor: '#3B4992',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14
              }}
            />
            <TouchableOpacity 
              className="p-4 border-t border-gray-100"
              onPress={() => setShowCalendar(false)}
            >
              <Text className="text-center text-[#3B4992] font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
} 