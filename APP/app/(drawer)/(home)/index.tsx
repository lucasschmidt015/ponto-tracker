import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { useEffect } from 'react';

import { Redirect } from "expo-router";

import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useColorScheme } from 'react-native';
import OpenDrawerButton from '@/components/OpenDrawerButton';
import LogoutButton from '@/components/LogoutButton';
import Loading from '@/components/Loading';
import api from '@/utils/axios';


const Home = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth)

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
          <Text style={styles.greeting}>Hello Lucas Torchelsen Schmidt</Text>
          <Text style={styles.date}>Tuesday, March 13 2025</Text>
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Home;