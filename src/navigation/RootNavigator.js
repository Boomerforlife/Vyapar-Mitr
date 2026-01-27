import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { colors } from '../constants/colors';

export const RootNavigator = () => {
    const { user, isLoading: authLoading } = useAuth();
    const { businessProfile, isLoading: dataLoading } = useData();

    if (authLoading || dataLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                businessProfile ? <AppNavigator /> : <OnboardingScreen />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    );
};
