import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { useEffect, useState } from 'react';

import { Redirect } from "expo-router";

import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useColorScheme } from 'react-native';
import OpenDrawerButton from '@/components/OpenDrawerButton';
import LogoutButton from '@/components/LogoutButton';
import Loading from '@/components/Loading';
import api from '@/utils/axios';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';


const Home = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);
  const { isAuthenticated, isLoading, token, user, company } = useSelector((state: RootState) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);

  // Function to get current location
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Location permission is required to register entries.',
        });
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      };
    } catch (error) {
      console.error('Error getting location:', error);
      Toast.show({
        type: 'error',
        text1: 'Location Error',
        text2: 'Could not get current location. Entry will be registered without location.',
      });
      return null;
    }
  };

  // Function to register entry
  const registerEntry = async () => {
    if (!user?._id || !company?._id || !token) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Missing user or company information.',
      });
      return;
    }

    setIsRegistering(true);
    
    try {
      const location = await getCurrentLocation();
      
      const entryData = {
        user_id: user._id,
        company_id: company._id,
        ...(location && {
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      };

      const response = await api.post('/entries', entryData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Entry registered successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to register entry.',
        });
      }
    } catch (error: any) {
      console.error('Error registering entry:', error);
      const errorMessage = error.response?.data?.message || 'Failed to register entry. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsRegistering(false);
    }
  };

  // Get current date formatted
  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <OpenDrawerButton />
        <Loading/>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <OpenDrawerButton/>
      <LogoutButton/>
      <View style={styles.topContainer}>
        <View style={styles.semiCircle} />
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello {user?.name || 'User'} 🤓</Text>
          <Text style={styles.date}>{getCurrentDate()}</Text>
        </View>
      </View>

      <ScrollView style={styles.timesContainer} nestedScrollEnabled={true}>
        <TimeItem time="07:45" />
        <TimeItem time="12:00" />
        <TimeItem time="13:30" />
        <TimeItem time="18:00" />
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.timeWorkedLabel}>Time Worked Today:</Text>
        <Text style={styles.timeWorked}>05:40</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, isRegistering && styles.buttonDisabled]} 
        onPress={registerEntry}
        disabled={isRegistering}
      >
        {isRegistering ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

function TimeItem({ time }: { time: string }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);
  return (
    <View style={styles.timeItem}>
      <Text style={styles.timeText}>• {time}</Text>
      <Text style={styles.check}>✅</Text>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: isDarkMode ? '#000' : '#f9f9f9',
  },
  
  topContainer: {
    alignItems: 'center',
    width: '100%',
    height: 250
  },
  semiCircle: {
    width: '100%',
    height: '50%',
    backgroundColor: isDarkMode ? '#333' : '#d9d9d9',
    borderBottomLeftRadius: 170,
    borderBottomRightRadius: 170,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    marginTop: 52,
    marginBottom: 32,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: isDarkMode ? '#fff' : '#000',
  },
  date: {
    fontSize: 16,
    color: isDarkMode ? '#ccc' : '#777',
  },
  timesContainer: {
    height: 220,
    marginTop: 120,
    marginBottom: 32,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#111' : '#fff',
    paddingHorizontal: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  timeText: {
    fontSize: 18,
    color: isDarkMode ? '#fff' : '#000',
  },
  check: {
    fontSize: 18,
    marginLeft: 20,
  },
  summary: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timeWorkedLabel: {
    fontSize: 16,
    color: isDarkMode ? '#ccc' : '#777',
  },
  timeWorked: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
    color: isDarkMode ? '#fff' : '#000',
  },
  button: {
    backgroundColor: isDarkMode ? '#355ca9' : '#1a3d7c',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  buttonDisabled: {
    backgroundColor: isDarkMode ? '#2a4a8a' : '#143260',
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Home;