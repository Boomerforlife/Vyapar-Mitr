import { MOCK_COMPLIANCES } from '../mockData/compliances';
import { MOCK_USER } from '../mockData/user';

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
    // Authentication (Mock)
    login: async (email, password) => {
        await delay(1000);
        if (email === 'demo@example.com' && password === 'password') {
            // Return a user object without business profile initially if needed,
            // but for simplicity we return the full mock user for now or a basic auth token equivalent
            return { token: 'mock-jwt-token', user: { id: 'u1', email } };
        }
        throw new Error('Invalid credentials');
    },

    signup: async (userData) => {
        await delay(1000);
        return { token: 'mock-jwt-token', user: { id: 'u2', ...userData } };
    },

    // Business Profile
    getBusinessProfile: async () => {
        await delay(800);
        // TODO: Fetch from real backend
        return MOCK_USER;
    },

    updateBusinessProfile: async (data) => {
        await delay(1000);
        // TODO: Send to real backend
        console.log('Updated profile:', data);
        return { ...MOCK_USER, ...data };
    },

    // Compliances
    getComplianceChecklist: async (businessType) => {
        await delay(1000);
        // TODO: Fetch from backend based on businessType
        // Filter mocks for demo
        if (!businessType) return MOCK_COMPLIANCES;
        return MOCK_COMPLIANCES.filter(c => c.businessType.includes(businessType));
    },

    // Revenue
    saveRevenueData: async (revenueData) => {
        await delay(1200);
        // TODO: Send to backend
        console.log('Saved revenue data:', revenueData);
        return { success: true, id: 'rev-' + Date.now() };
    },

    // Return Filing
    getReturnForm: async (formType) => {
        await delay(800);
        // TODO: Fetch form schema/data
        return {
            formId: 'gst-3b',
            fields: [
                { id: 'sales', label: 'Total Sales', type: 'number', required: true },
                { id: 'tax', label: 'Tax Payable', type: 'number', required: true },
                { id: 'itc', label: 'Input Tax Credit', type: 'number', required: true },
            ]
        };
    },

    saveReturnDraft: async (draftData) => {
        await delay(800);
        console.log('Saved draft:', draftData);
        return { success: true, draftId: 'draft-' + Date.now() };
    },

    // Deadlines
    getDeadlines: async () => {
        await delay(600);
        return MOCK_COMPLIANCES.map(c => ({
            id: c.id,
            title: c.title,
            dueDate: c.dueDate,
            status: new Date(c.dueDate) < new Date() ? 'At Risk' : 'Safe' // Simple logic
        }));
    }
};
