import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.lg}px ${spacing.md}px 0 ${spacing.md}px;
`;

export const Title = styled.Text`
  font-size: ${typography.title};
  font-weight: bold;
  color: ${colors.primaryText};
  margin-top: ${spacing.md}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.caption};
  color: ${colors.secondaryText};
  margin-bottom: ${spacing.sm}px;
`;

export const MessageSection = styled.View`
  margin-top: ${spacing.md}px;
`;

export const ButtonWrapper = styled.View`
  padding: ${spacing.md}px;
  border-top-width: 1px;
  border-color: ${colors.border};
  background-color: ${colors.surface};
`;
