import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { useData } from '../../context/DataContext';

export const DeadlinesScreen = () => {
    const { deadlines, isLoading, refreshData } = useData();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.badge, item.status === 'At Risk' ? styles.atRisk : styles.safe]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                </View>
            </View>
            <Text style={styles.date}>Due Date: {new Date(item.dueDate).toDateString()}</Text>
            <Text style={styles.desc}>Make sure to file before the due date to avoid penalties.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={deadlines}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshData} />}
                ListHeaderComponent={<Text style={styles.header}>Upcoming Deadlines</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        padding: spacing.md,
    },
    header: {
        ...typography.h2,
        marginBottom: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    title: {
        ...typography.h3,
        flex: 1,
    },
    date: {
        ...typography.label,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    desc: {
        ...typography.caption,
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: 4,
    },
    atRisk: {
        backgroundColor: '#FEE2E2',
    },
    safe: {
        backgroundColor: '#D1FAE5',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.text,
    }
});
