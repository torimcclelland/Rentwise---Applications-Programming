import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Property } from '../models/Property';
import styles from '../styles/DashboardStyle';
import StatsCard from '../components/StatsCard';
import { FixitRequest } from '../models/FixitRequest';
import { getFixitRequestsByPropertyID } from '../database_calls/fixitrequests/GetFixitRequestByProperty';
import { getPropertyByID } from '../database_calls/property/GetPropertyByID';
import InfoCard from '../components/InfoCard';
import {useTheme} from '../ThemeContext';


const LeasedPropertyScreen = () => {
    const route = useRoute();
    const { propertyID } = route.params;
    const [property, setProperty] = useState(new Property ({}));
    const [fixitRequests, setFixitRequests] = useState([]);
    const [payments, setPayments] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        getProperty();
        getFixitRequests();
    }, []);

    const getProperty = async() => {
        const result = await getPropertyByID(propertyID);
        setProperty(result.resultData);
    }

    const getFixitRequests = async() => {
        const result = await getFixitRequestsByPropertyID(propertyID);
        setFixitRequests(result.resultData);
    }

    return (
        <View style = {leased_styles.container}>
            {/* Stats Overview */}
          <View style={styles.statsRow}>
            <StatsCard label="Open Fixit Tickets" value={`${fixitRequests.length}`} />
            <StatsCard label="Rent Price" value={`$${property.monthlyPrice}`} />

        </View>

        <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Fix-it Requests</Text>
        {fixitRequests.length > 0 ? (
            <View>
                {fixitRequests.map(request => (
                    <InfoCard
                        title={request.category}
                        subtitle={`🟡 Pending • Submitted on ${request.submissontime.split("T0")[0]}`}
                    />
                ))}
            </View>
        ) : (
            <Text>No fixit requests found.</Text>
        )}

        <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Payments History</Text>

        {payments.length > 0 ? (
            <View>
                {payments.map(payment => (
                    <InfoCard
                        title={`Payment of $${payment.amount}`}
                        subtitle={`Status: ${payment.status} • Date: ${payment.date}`}
                    />
                ))}
            </View>

        ) : (
                    <Text>No payments found.</Text>
                
        )}

        </View>
    )
}

const leased_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})


export default LeasedPropertyScreen;