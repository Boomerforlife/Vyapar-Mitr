import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input';
import { spacing } from '../../constants/spacing';
import { colors } from '../../constants/colors';

export const LoginScreen = ({ navigation }) => {
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
<<<<<<< HEAD
            <Text style={styles.title}>Vyapar Mitra</Text>
=======
            <Text style={styles.title}>Surefile</Text>
>>>>>>> ce015b401b06a41a6e1d10cc3b870c30cf700e96
            <Text style={styles.subtitle}>Login to your account</Text>

            <View style={{ width: '100%', marginBottom: spacing.lg }}>
                <Input
                    label="Email"
                    placeholder="demo@example.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Input
                    label="Password"
                    placeholder="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {error && <Text style={{ color: colors.error, marginTop: 8 }}>{error}</Text>}
            </View>

            <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={() => login(email, password)}
                style={styles.btn}
                disabled={!email || !password || isLoading}
            />
            <Button title="Create Account" onPress={() => navigation.navigate('Signup')} variant="outline" style={styles.btn} />
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
        color: colors.primary
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    btn: {
        width: '100%',
        marginBottom: spacing.md,
    }
});
