import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';

export const ComplianceFormScreen = ({ navigation, route }) => {
    const { complianceId, title } = route.params || {};
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    // Form State
    const [bizName, setBizName] = useState('');
    const [bizType, setBizType] = useState('');
    const [turnover, setTurnover] = useState('');

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigation.goBack();
    };

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else Alert.alert("Success", "Filing Draft Saved!");
    };

    const progress = (step / totalSteps) * 100;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title || 'Compliance Filing'}</Text>
                <TouchableOpacity style={styles.saveExitBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="save-outline" size={18} color={colors.primary} />
                    <Text style={styles.saveExitText}>Save & Exit</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.excludeHeader}>
                <View style={styles.stepRow}>
                    <Text style={styles.stepText}>Step {step} of {totalSteps}</Text>
                    <Text style={styles.percentText}>{progress}% Complete</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {step === 1 && (
                    <View>
                        <Text style={styles.sectionTitle}>Business Information</Text>
                        <Text style={styles.sectionSubtitle}>Let's start with some basic details about your business</Text>

                        <Input
                            label="What is your business name?"
                            placeholder="Enter your registered business name"
                            value={bizName}
                            onChangeText={setBizName}
                            rightIcon="help-circle-outline"
                        />

                        <Input
                            label="What type of business do you run?"
                            placeholder="Select your business type"
                            value={bizType}
                            onChangeText={setBizType}
                            rightIcon="help-circle-outline"
                        />

                        <Input
                            label="What is your annual turnover?"
                            placeholder="Enter amount in rupees"
                            value={turnover}
                            onChangeText={setTurnover}
                            rightIcon="help-circle-outline"
                        />
                    </View>
                )}
                {step > 1 && (
                    <View style={styles.placeholderStep}>
                        <Text style={styles.sectionTitle}>Step {step}</Text>
                        <Text>Form details for step {step}...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button title="Continue" onPress={handleNext} style={styles.continueBtn} />
                <Button title="Save Draft" variant="outline" onPress={() => navigation.goBack()} style={styles.draftBtn} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white", // Image shows white background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backBtn: {
        marginRight: spacing.md,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        color: colors.text,
    },
    saveExitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveExitText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 4,
    },
    excludeHeader: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    stepRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    stepText: {
        color: colors.info,
        fontWeight: '600',
        fontSize: 14,
    },
    percentText: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary, // Blue
        borderRadius: 3,
    },
    content: {
        padding: spacing.md,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
        lineHeight: 22,
    },
    footer: {
        padding: spacing.md,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    continueBtn: {
        backgroundColor: '#E5E7EB', // Disabled/gray look in image initially? Or use primary.
        // The image shows gray "Continue" which implies unchecked state, but "Save Draft" is outline blue.
        // I will use primary for Continue for now or gray if disabled logic added.
        marginBottom: spacing.md,
    },
    draftBtn: {
        borderColor: colors.primary,
    },
    placeholderStep: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    }
});
