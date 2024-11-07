import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LiveTracking() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [completedStops, setCompletedStops] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  // Simulated stops data
  const [stops] = useState([
    {
      id: 'A',
      title: 'Start Point',
      coordinate: {
        latitude: 12.9716,
        longitude: 77.5946
      },
      weight: '500 kg',
      address: 'Bangalore Central',
      status: 'current',
      time: '09:00 AM'
    },
    {
      id: 'B',
      title: 'Pickup',
      coordinate: {
        latitude: 12.9783,
        longitude: 77.6408
      },
      weight: '250 kg',
      address: 'Koramangala',
      status: 'pending',
      time: '09:30 AM'
    },
    {
      id: 'C',
      title: 'Delivery',
      coordinate: {
        latitude: 12.9592,
        longitude: 77.6974
      },
      weight: '250 kg',
      address: 'HSR Layout',
      status: 'pending',
      time: '10:00 AM'
    }
  ]);

  // Simulate driver movement
  useEffect(() => {
    if (currentStopIndex >= stops.length) return;

    const targetStop = stops[currentStopIndex];
    const movementInterval = setInterval(() => {
      setCurrentLocation(prevLocation => {
        const targetLat = targetStop.coordinate.latitude;
        const targetLng = targetStop.coordinate.longitude;
        
        // Calculate new position (simple linear interpolation)
        const newLat = prevLocation.latitude + (targetLat - prevLocation.latitude) * 0.1;
        const newLng = prevLocation.longitude + (targetLng - prevLocation.longitude) * 0.1;
        
        // Check if we've reached the destination (with some tolerance)
        if (Math.abs(newLat - targetLat) < 0.0001 && Math.abs(newLng - targetLng) < 0.0001) {
          clearInterval(movementInterval);
          setCompletedStops(prev => [...prev, targetStop.id]);
          setCurrentStopIndex(prevIndex => prevIndex + 1);
        }
        
        return { latitude: newLat, longitude: newLng };
      });
    }, 1000); // Update every second

    return () => clearInterval(movementInterval);
  }, [currentStopIndex]);

  // Location permission and initial setup
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleNavigate = (stop) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${stop.coordinate.latitude},${stop.coordinate.longitude}`;
    const label = stop.address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Alert.alert(
      'Start Navigation',
      `Navigate to:\nLatitude: ${stop.coordinate.latitude}\nLongitude: ${stop.coordinate.longitude}`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Open Maps',
          onPress: () => Linking.openURL(url)
        }
      ]
    );
  };

  const getCurrentStop = () => stops[currentStopIndex] || stops[stops.length - 1];

  const getStopColor = (stop) => {
    if (completedStops.includes(stop.id)) return '#34D399';
    if (stop.status === 'current') return '#3B4992';
    return '#9CA3AF';
  };

  const getMarkerContent = (stop) => (
    <View 
      className={`p-2 rounded-full ${
        completedStops.includes(stop.id) 
          ? 'bg-green-500' 
          : stop.status === 'current' 
            ? 'bg-[#3B4992]' 
            : 'bg-gray-400'
      }`}
    >
      <Text className="text-white font-bold px-2">{stop.id}</Text>
    </View>
  );

  // Add restart functionality
  const handleRestartTrip = () => {
    // Reset all states to initial values
    setCompletedStops([]);
    setCurrentStopIndex(0);
    setCurrentLocation({
      latitude: stops[0].coordinate.latitude,
      longitude: stops[0].coordinate.longitude,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header with Restart Button */}
        <View className="absolute top-12 left-0 right-0 z-10 px-4">
          <View className="bg-white rounded-xl p-4 shadow-lg">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="p-2"
              >
                <Ionicons name="arrow-back" size={24} color="#3B4992" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold">Trip #{tripId}</Text>
              <View className="flex-row items-center">
                <View className="bg-green-100 px-3 py-1 rounded-full mr-2">
                  <Text className="text-green-600">Active</Text>
                </View>
                {/* <TouchableOpacity 
                  onPress={handleRestartTrip}
                  className="bg-[#3B4992] p-2 rounded-full"
                >
                  <Ionicons name="refresh" size={20} color="white" />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>

        {/* Trip Progress Header */}
        <View className="absolute top-32 left-0 right-0 z-10 px-4">
          <View className="bg-white rounded-xl p-4 shadow-lg">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold">Trip Progress</Text>
              <View className="flex-row items-center">
                <Text className="text-[#3B4992] mr-2">
                  {completedStops.length}/{stops.length} Stops
                </Text>
                <TouchableOpacity 
                  onPress={handleRestartTrip}
                  className="bg-gray-100 p-1 rounded-full"
                >
                  <Ionicons name="refresh-outline" size={16} color="#3B4992" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-semibold">{getCurrentStop().title}</Text>
                <Text className="text-gray-500">{getCurrentStop().address}</Text>
                <Text className="text-[#3B4992]">{getCurrentStop().time}</Text>
              </View>
              <TouchableOpacity 
                className="bg-[#3B4992] px-4 py-2 rounded-full"
                onPress={() => handleNavigate(getCurrentStop())}
              >
                <Text className="text-white">Navigate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Map View */}
        {location && (
          <MapView
            provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
            style={{ width, height }}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {/* Route line */}
            <Polyline
              coordinates={[currentLocation, ...stops.slice(currentStopIndex).map(stop => stop.coordinate)]}
              strokeColor="#3B4992"
              strokeWidth={3}
            />

            {/* Current location marker */}
            <Marker coordinate={currentLocation}>
              <View className="bg-blue-500 p-2 rounded-full">
                <Ionicons name="car" size={20} color="white" />
              </View>
            </Marker>

            {/* Stop markers */}
            {stops.map((stop) => (
              <Marker
                key={stop.id}
                coordinate={stop.coordinate}
                onPress={() => setSelectedStop(stop)}
              >
                {getMarkerContent(stop)}
              </Marker>
            ))}
          </MapView>
        )}

        {/* Bottom Sheet */}
        <View className="absolute bottom-0 left-0 right-0">
          <View className="bg-white rounded-t-3xl p-4 shadow-lg">
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
            
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Trip Progress</Text>
              <Text className="text-[#3B4992]">
                {completedStops.length}/{stops.length} Stops
              </Text>
            </View>
            
            {stops.map((stop, index) => (
              <TouchableOpacity 
                key={stop.id}
                className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-2"
                onPress={() => setSelectedStop(stop)}
              >
                <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                  completedStops.includes(stop.id) 
                    ? 'bg-green-500' 
                    : index === currentStopIndex
                      ? 'bg-[#3B4992]' 
                      : 'bg-gray-400'
                }`}>
                  <Text className="text-white font-bold">{stop.id}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold">{stop.title}</Text>
                  <Text className="text-gray-500">{stop.address}</Text>
                  <Text className="text-[#3B4992]">{stop.time}</Text>
                </View>
                {completedStops.includes(stop.id) ? (
                  <MaterialIcons name="check-circle" size={24} color="#34D399" />
                ) : index === currentStopIndex && (
                  <TouchableOpacity 
                    className="bg-[#3B4992] px-3 py-1 rounded-full"
                    onPress={() => handleNavigate(stop)}
                  >
                    <Text className="text-white">Navigate</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}