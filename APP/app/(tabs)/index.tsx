import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Redirect } from "expo-router";

import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store';
import { withAuthGuard } from '@/utils/WithAuthGuard';

const TabOneScreen = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreToken());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


export default TabOneScreen;