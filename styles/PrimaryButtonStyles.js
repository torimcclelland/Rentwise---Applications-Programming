import { StyleSheet } from 'react-native';

const PrimaryButtonStyles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  small: {
    paddingVertical: 8,
  },
  medium: {
    paddingVertical: 12,
  },
  large: {
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default PrimaryButtonStyles;
