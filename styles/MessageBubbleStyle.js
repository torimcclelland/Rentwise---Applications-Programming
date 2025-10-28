import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../theme';

export const BubbleContainer = styled.View`
  align-items: ${({ fromUser }) => (fromUser ? 'flex-end' : 'flex-start')};
  margin-vertical: ${spacing.sm}px;
`;

export const Bubble = styled.View`
  max-width: 80%;
  background-color: ${({ fromUser }) =>
    fromUser ? colors.primary : colors.surface};
  padding: ${spacing.md}px;
  border-radius: ${spacing.sm}px;
  border-top-left-radius: ${({ fromUser }) => (fromUser ? spacing.sm : 0)}px;
  border-top-right-radius: ${({ fromUser }) => (fromUser ? 0 : spacing.sm)}px;
`;

export const TextContent = styled.Text`
  font-size: ${typography.body};
  color: ${colors.onSurface};
`;

export const Timestamp = styled.Text`
  font-size: ${typography.caption};
  color: ${colors.secondaryText};
  margin-top: ${spacing.xs}px;
`;

export const StatusText = styled.Text`
  font-size: ${typography.caption};
  color: ${colors.accent};
  margin-top: ${spacing.xs}px;
`;
