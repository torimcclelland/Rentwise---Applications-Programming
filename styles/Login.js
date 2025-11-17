import { StyleSheet } from 'react-native';

const login_style = StyleSheet.create({
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4
  },
  typetext: {
    fontFamily: 'Inter, System',
    fontSize: 16,
    fontWeight: '600',
    color: '#034974',
    lineHeight: 24,
    textAlign: 'left'
  },
  headerText: {
    fontFamily: 'Inter, System',
    fontSize: 28,
    fontWeight: '700',
    color: '#034974',
    marginBottom: 4,
    textAlign: 'center'
  },
  subText: {
    fontFamily: 'Inter, System',
    fontSize: 18,
    fontWeight: '500',
    color: '#034974',
    marginBottom: 16,
    textAlign: 'center'
  },
  name: {
    fontFamily: 'Inter, System',
    fontSize: 48,
    fontWeight: '700',
    color: '#034974',
    marginBottom: 8
  },
  spacing: {
    flexDirection: 'column',
    gap: 20,
    paddingVertical: 32
  },
  logo: {
    height: 84,
    width: 74
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    paddingHorizontal: 24,
    flexDirection: 'column',
    gap: 23
  },
  loginButton: {
    backgroundColor: '#034974',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 4,
    elevation: 3
  },
  loginButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9
  },
  altLoginButton: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 1 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 2,
    elevation: 2
  },
  inputField: {
    backgroundColor: '#F0F4F8',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    borderColor: '#D0D7DE',
    borderWidth: 1
  }
});

export { login_style };
