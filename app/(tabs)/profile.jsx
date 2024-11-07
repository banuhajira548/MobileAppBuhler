import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileSection = ({ title, children }) => (
  <View className="mt-6">
    <View className="flex-row items-center space-x-2 mb-4">
      <Ionicons name="settings-outline" size={20} color="#4B5563" />
      <Text className="text-lg font-semibold text-indigo-500">{title}</Text>
      <Ionicons name="chevron-down" size={20} color="#4B5563" />
    </View>
    {children}
  </View>
);

const ProfileOption = ({ title, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row justify-between items-center py-4 border-b border-gray-100"
  >
    <Text className="text-gray-700">{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#4B5563" />
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: 'Mr Sheikh',
    rating: 4.9,
    deliveries: 10,
    // Add other user data
  });

  const handleLogout = () => {
    // Add logout logic here
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2C3E50]">
      {/* Header */}
      <View className="p-4 pb-8 bg-[#2C3E50]">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Driver Profile</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Image and Rating */}
        <View className="items-center">
          <View className="relative">
            <Image
              source={require('../../assets/profile-placeholder.png')}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-xs">10</Text>
            </View>
          </View>
          <Text className="text-white text-xl font-semibold mt-4">DM Nihal</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-white ml-1">4.9</Text>
          </View>
        </View>
      </View>

      {/* Profile Content */}
      <ScrollView className="flex-1 bg-white rounded-t-3xl -mt-4 px-4">
        {/* Personal Info Section */}
        <ProfileSection title="Personal Info">
          <ProfileOption 
            title="Update Mobile No" 
            onPress={() => {/* Handle press */}}
          />
          <ProfileOption 
            title="Update Password" 
            onPress={() => {/* Handle press */}}
          />
        </ProfileSection>

        {/* Driving Info Section */}
        <ProfileSection title="Driving Info">
          <ProfileOption 
            title="Update Driving Info" 
            onPress={() => {/* Handle press */}}
          />
          <ProfileOption 
            title="Assigned Vehicles" 
            onPress={() => {/* Handle press */}}
          />
        </ProfileSection>

        {/* Support Section */}
        <TouchableOpacity 
          className="flex-row items-center space-x-2 mt-6 py-4 border-b border-gray-100"
          onPress={() => {/* Handle support press */}}
        >
          <Ionicons name="help-circle-outline" size={20} color="#4B5563" />
          <Text className="text-gray-700">Support and enquiry</Text>
          <Ionicons name="chevron-forward" size={20} color="#4B5563" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-8 mb-6 mx-4"
        >
          <View className="border-2 border-red-500 rounded-xl py-3">
            <Text className="text-red-500 text-center font-semibold">Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;