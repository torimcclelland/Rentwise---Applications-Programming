import React, { useState } from 'react';
import {
  Container,
  Card,
  Title,
  Amount,
  MethodSelector,
  Disclaimer,
  Section,
  ButtonGroup,
  MethodLabel,
} from '../styles/PaymentStyle';
import PrimaryButton from '../components/PrimaryButton';
import DropDown from '../components/DropDown';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const paymentOptions = ['Visa ending in *1234', 'Mastercard ending in *5678'];
    const navigation = useNavigation();
  
    const handleConfirm = () => {
      console.log('Payment confirmed with:', selectedMethod);
    };
  
    const handleViewLease = () => {
      console.log('View lease terms');
    };
  
    return (
      <Container>
        <Card>
          <Title>Make a Payment</Title>
  
          <Section>
            <Amount>$1430.00</Amount>
          </Section>
  
          <Section>
            <MethodLabel>Payment Method</MethodLabel>
            <DropDown
              options={paymentOptions}
              value={selectedMethod}
              onSelect={setSelectedMethod}
              placeholder="Select a payment method"
            />
          </Section>
  
          <ButtonGroup>
            <PrimaryButton title="View Lease" onPress={() => navigation.navigate('Lease Info')} />
          </ButtonGroup>
  
          <Disclaimer>
            By clicking confirm, you agree to our Terms of Service and Privacy Policy.
          </Disclaimer>
  
          <PrimaryButton
            title="✔ Confirm"
            onPress={handleConfirm}
            size="medium"
            disabled={!selectedMethod}
          />
        </Card>
      </Container>
    );
  };
  
  export default Payment;