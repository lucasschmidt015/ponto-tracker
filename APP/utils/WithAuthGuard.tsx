// utils/withAuthGuard.tsx
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import React from "react";
import { View, Text } from 'react-native'

export function withAuthGuard<P extends React.PropsWithChildren<{}>>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P): JSX.Element | null {
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        console.log('aaaaaaa')
      return <Redirect href="/(auth)/login" />;
    }

    return <Component {...props} />;
  };
}