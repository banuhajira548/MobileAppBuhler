import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center">Create Account</Text>
        
        <View className="space-y-4">
          <TextInput
            placeholder="Full Name"
            className="bg-gray-100 p-4 rounded-xl"
          />
          <TextInput
            placeholder="Email"
            className="bg-gray-100 p-4 rounded-xl"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            className="bg-gray-100 p-4 rounded-xl"
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            className="bg-gray-100 p-4 rounded-xl"
            secureTextEntry
          />

          <TouchableOpacity
            className="bg-blue-600 py-4 rounded-xl"
            onPress={() => router.replace('/(app)')}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-center text-gray-600">
              Already have an account? <Text className="text-blue-600">Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp; 