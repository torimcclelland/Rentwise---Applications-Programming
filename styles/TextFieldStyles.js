import { StyleSheet } from 'react-native';

const TextFieldStyles = StyleSheet.create({
  wrapper: {
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16
  },
  multilineInput: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16
  },
});

export default TextFieldStyles;
