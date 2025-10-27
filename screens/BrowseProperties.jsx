import { View, Text, FlatList, ScrollView  } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { useNavigation, useTheme } from "@react-navigation/native";
import { styles } from "../styles/LandlordPropertiesStyle";
import { useState } from "react";
import { DocumentSnapshot } from "firebase/firestore";
import { ReturnValue } from "../models/ReturnValue";
import { getProperties } from "../database_calls/property/GetProperties";

const BrowseProperties = () => {
    const theme = useTheme()
    const navigation = useNavigation();
    const [properties, setProperties] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [lastProperty, setLastProperty] = useState(new DocumentSnapshot)

    // called when this window opened, use to call property update
    useEffect(()=>{
        getNextBatch();
    }, [])
    
    const getNextBatch = async () => {

        let result = new ReturnValue();
        
        result = await getProperties(10, lastProperty, "")// ordering field, set here
        console.log(result)

        if(!result.success){
            console.log("Error: " + result.errorMsg)
            return
        }
        setProperties(result.propertyList) // set the properties from result
        
    }

    return (
        <View style={[styles.main, theme.container]}>
          {/* centered content container */}
           <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            /* optional: keyboardShouldPersistTaps="handled" */
          >
            
            
            {propertiesLs.length > 0 ? (
            // map over your items and render PropertyCard
            propertiesLs.map(item => (
                <PropertyCard
                key={item.propertyID?.toString()}
                address={item.address}
                onPress={() => editProperty(item.propertyID)}
                />
            ))
            ) : (
            <View style={styles.noProperties}>
                <Text style={[theme.textColor]}>No properties listed yet</Text>
            </View>
            )}
            </ScrollView>

            {/* Fixed bottom nav bar */}
            <View style={styles.bottomNav}>
                {/* Bottom Navigation Bar */}
                <BottomNavBar  selectedTab="home"/>
            </View>
        </View>
    );
}
export default BrowseProperties;
