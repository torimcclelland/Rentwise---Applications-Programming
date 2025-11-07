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

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const paymentOptions = ['Visa ending in *1234', 'Mastercard ending in *5678'];
  
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
            <PrimaryButton
              title="View Lease Terms"
              iconName="file-document-outline"
              onPress={handleViewLease}
              size="medium"
            />
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