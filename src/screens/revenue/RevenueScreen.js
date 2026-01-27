import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useData } from '../../context/DataContext';

export const RevenueScreen = () => {
    const { revenue, saveRevenue, isLoading } = useData();
    const [month, setMonth] = useState('');
    const [amount, setAmount] = useState('');
    const [year, setYear] = useState('2023');

    const handleAdd = async () => {
        if (!month || !amount) {
            Alert.alert('Error', 'Please enter Month and Amount');
            return;
        }

        await saveRevenue({ month, amount: parseFloat(amount), year });
        setMonth('');
        setAmount('');
        Alert.alert('Success', 'Revenue added');
    };

    const handleUpload = () => {
        Alert.alert('Mock Upload', 'File uploaded and parsed successfully! (Mock)');
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.month} {item.year}</Text>
            <Text style={styles.cellAmount}>₹{item.amount.toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.formTitle}>Add Monthly Revenue</Text>
                <View style={styles.inputRow}>
                    <View style={{ flex: 1, marginRight: spacing.sm }}>
                        <Input placeholder="Month (e.g. Oct)" value={month} onChangeText={setMonth} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
                    </View>
                </View>
                <Button title="Add Entry" onPress={handleAdd} loading={isLoading} />

                <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                    <Text style={styles.uploadText}>Or Upload Excel/CSV</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.listHeader}>Recent Entries</Text>
                <FlatList
                    data={revenue}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', margin: 20 }}>No mock revenue data loaded yet.</Text>}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
    },
    formCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    formTitle: {
        ...typography.h3,
        marginBottom: spacing.md,
    },
    inputRow: {
        flexDirection: 'row',
    },
    uploadBtn: {
        marginTop: spacing.md,
        alignItems: 'center',
        padding: spacing.sm,
    },
    uploadText: {
        color: colors.primary,
        fontWeight: '600',
    },
    listContainer: {
        flex: 1,
    },
    listHeader: {
        ...typography.h3,
        marginBottom: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    cell: {
        flex: 1,
        ...typography.body,
    },
    cellAmount: {
        ...typography.body,
        fontWeight: 'bold',
    }
});
