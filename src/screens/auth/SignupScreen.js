import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { spacing } from '../../constants/spacing';
import { colors } from '../../constants/colors';

export const SignupScreen = ({ navigation }) => {
    const { signup } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View style={{ width: '100%', marginBottom: spacing.lg }}>
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email" placeholder="john@example.com" />
                <Input label="Password" placeholder="******" secureTextEntry={true} />
            </View>

            <Button title="Signup (Mock)" onPress={() => signup({ name: 'New User' })} style={styles.btn} />
            <Button title="Back to Login" onPress={() => navigation.goBack()} variant="outline" style={styles.btn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.surface
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.xl,
        color: colors.text
    },
    btn: {
        width: '100%',
        marginBottom: spacing.md,
    }
});
