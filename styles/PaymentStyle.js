import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #f5f7fa;
`;

export const Card = styled.View`
  background: white;
  padding: 28px;
  border-radius: 16px;
  elevation: 4;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
`;

export const Amount = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #111;
  text-align: center;
  margin-bottom: 16px;
`;

export const Section = styled.View`
  margin-bottom: 16px;
`;

export const MethodLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

export const MethodSelector = styled.View`
  width: 100%;
`;

export const ButtonGroup = styled.View`
  margin-bottom: 16px;
`;

export const Disclaimer = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
  margin-bottom: 16px;
`;
