import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold">Profile</Text>
        {/* Add your profile content here */}
      </View>
    </SafeAreaView>
  );
};

export default Profile; 