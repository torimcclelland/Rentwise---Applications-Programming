import { StyleSheet } from 'react-native';

const login_style = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 84,
        width: 74,
        marginRight: 12,
    },
    name: {
        fontSize: 48,
        fontWeight: '700',
        color: '#034974',
        fontStyle: 'normal',
    },
    card: {
        backgroundColor: 'white',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        gap: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: '#6B7280',
    },
    spacing: {
        flexDirection: 'column',
        gap: 16,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginVertical: 16,
    },
    orText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9CA3AF',
    },
    altButtons: {
        flexDirection: 'column',
        gap: 12,
    },
    footer: {
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
    },
    loginButton: {
        backgroundColor: '#034974',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
});

export { login_style };
