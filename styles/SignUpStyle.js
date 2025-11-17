import { StyleSheet } from 'react-native';

const SignUpStyles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    marginBottom: 16,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  typetext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  dropdown: {
    marginTop: 16,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpStyles;
