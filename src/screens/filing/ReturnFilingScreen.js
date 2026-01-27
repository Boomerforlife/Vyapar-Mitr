import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';

export const ReturnFilingScreen = ({ navigation }) => {
    const { compliances } = useData();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCompliances = compliances.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => {
        // Enriched mock data for UI demo purposes not yet in context
        const progress = item.progress || 0.25;
        const totalSteps = item.totalSteps || 4;
        const currentStep = Math.round(progress * totalSteps);
        const priority = item.priority || (item.status === 'Pending' ? 'High Priority' : 'Normal Priority');
        const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ComplianceForm', { complianceId: item.id, title: item.title })}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.iconBox}>
                        <Ionicons name="document-text" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.headerContent}>
                        <View style={styles.titleRow}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.tagsRow}>
                            <View style={styles.pillBlack}>
                                <Text style={styles.pillTextWhite}>{item.type || 'GST'}</Text>
                            </View>
                            <View style={[styles.pillStatus, { backgroundColor: item.status === 'At Risk' ? '#FEE2E2' : '#FEF3C7' }]}>
                                <Text style={[styles.pillTextStatus, { color: item.status === 'At Risk' ? colors.error : colors.warning }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.dateText}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
                    <View style={[styles.daysLeftPill, { backgroundColor: daysLeft < 5 ? '#FEF3C7' : '#EFF6FF' }]}>
                        <Text style={[styles.daysLeftText, { color: daysLeft < 5 ? colors.warning : colors.primary }]}>
                            {daysLeft} days left
                        </Text>
                    </View>
                </View>

                <View style={styles.progressSection}>
                    <View style={styles.progressLabelRow}>
                        <Text style={styles.progressLabel}>Progress</Text>
                        <Text style={styles.progressLabel}>{currentStep}/{totalSteps} steps</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.priorityRow}>
                    <Ionicons name="alert-circle" size={16} color={colors.error} />
                    <Text style={styles.priorityText}>{priority}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search compliance..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="filter" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredCompliances}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: spacing.md,
        gap: spacing.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        height: 48,
    },
    input: {
        flex: 1,
        marginLeft: spacing.sm,
        fontSize: 16,
    },
    filterBtn: {
        width: 48,
        height: 48,
        backgroundColor: '#1E40AF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: spacing.md,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    headerContent: {
        flex: 1,
    },
    titleRow: {
        marginBottom: 4,
    },
    cardTitle: {
        ...typography.h3,
        fontSize: 16,
    },
    tagsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    pillBlack: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    pillTextWhite: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    pillStatus: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    pillTextStatus: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
        fontSize: 14,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dateText: {
        color: colors.textSecondary,
        marginLeft: 6,
        marginRight: spacing.md,
        fontSize: 14,
    },
    daysLeftPill: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    daysLeftText: {
        fontSize: 12,
        fontWeight: '600',
    },
    progressSection: {
        marginBottom: spacing.sm,
    },
    progressLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressLabel: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1E40AF',
        borderRadius: 3,
    },
    priorityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    priorityText: {
        color: colors.error,
        fontSize: 12,
        fontWeight: '500',
    }
});
