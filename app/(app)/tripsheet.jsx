import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tripsheet = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold">Tripsheet </Text>
        {/* Add your tripsheet content here below will be components realted to it */}
      </View>
    </SafeAreaView>
  );
};

export default Tripsheet; 