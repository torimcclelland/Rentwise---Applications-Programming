import { StyleSheet } from 'react-native';
const login_style = StyleSheet.create ({
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
    },
    typetext: {
        font: 'inter',
        fontSize: 16,
        fontWeight: 600,
        color: '#034974',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    spacing:{
        flexDirection: 'column',
        gap: 16
    },
    logo: {
        height: 84,
        width: 74
    },
    welcome: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name:{
        color: '#034974',
        font: "Inter",
        fontSize: 64,
        fontStyle: 'normal',
        fontWeight: 600,
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 },
        // textShadowRadius: 4

    },
    app:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    input:{
        flex: 1,
        paddingHorizontal: 24,
        flexDirection: 'column',
        gap: 23
    },
    loginButton:{
        backgroundColor: '#034974'
    },
    altLoginButton:{
        backgroundColor: '#EEEEEE',
        marginBottom: 10
    }
});

export {login_style}