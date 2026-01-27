import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ProfileScreen = () => {
    const { logout, user } = useAuth();
    const { businessProfile } = useData();

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>User Profile</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{user?.name || 'Guest'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user?.email || 'N/A'}</Text>
                </View>
            </View>

            {businessProfile && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Business Details</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Business Name</Text>
                        <Text style={styles.value}>{businessProfile.businessName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{businessProfile.businessType}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>GSTIN</Text>
                        <Text style={styles.value}>{businessProfile.gstNumber || 'Not Registered'}</Text>
                    </View>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Push Notifications</Text>
                    <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: "#767577", true: colors.primary }} />
                </View>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: "#767577", true: colors.primary }} />
                </View>
            </View>

            <Button title="Logout" onPress={logout} variant="secondary" style={styles.logoutBtn} />

            <Text style={styles.version}>Version 1.0.0 (Frontend Only)</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        backgroundColor: colors.background,
        flexGrow: 1,
    },
    section: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...typography.h3,
        marginBottom: spacing.md,
        color: colors.primary,
    },
    infoRow: {
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    value: {
        ...typography.body,
        fontWeight: '500',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    settingLabel: {
        ...typography.body,
    },
    logoutBtn: {
        marginTop: spacing.lg,
        backgroundColor: colors.error,
    },
    version: {
        textAlign: 'center',
        marginTop: spacing.xl,
        ...typography.caption,
    }
});
