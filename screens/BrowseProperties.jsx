import { View, Text, FlatList, ScrollView , StyleSheet} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import TextField from "../components/TextField";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../ThemeContext";
import Filter from "../components/PropertyFilters";
import BrowsePropertyCard from "../components/BrowsePropertyCard";
import { useNavigation }from "@react-navigation/native";
import { styles } from "../styles/LandlordPropertiesStyle";
import { useState, useEffect } from "react";
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
        getAllProperties();
    }, [])
    
    const getAllProperties = async () => {

        let result = new ReturnValue();
        
        result = await getProperties()
        if(!result.success){
            console.log("Error: " + result.errorMsg)
            return
        }
        setProperties(result.propertyList)
    }

    const viewProperty = async(propertyID) => {
        navigation.navigate('View Property', {'propertyID': propertyID}) // navigate to the property view page 
    }

    return (
        <View style={[browse.container, theme.dashboardContainer]}>
            <View style={browse.content}>
                <View style={browse.searchbar}>
                    <Icon name="search" size={24} color={theme.textColor.color} style={browse.searchIcon}/>
                    <TextField
                    placeholder="Search"
                    style={[browse.customTextField]}
                    />
                </View>
                <View style={browse.filters}>
                    <Filter
                    text="Favorites"
                    iconName="heart"
                    />
                    <Filter
                    text="History"
                    iconName="clock"
                    />
                    <Filter
                    text="Following"
                    iconName="user-check"
                    />
                </View>
                
                {/* Here we want to use a flatlist */}
                <ScrollView>

                {properties.length > 0 ? (
                // map over your items and render PropertyCard
                properties.map(item => (
                    <BrowsePropertyCard
                    key={item.propertyID?.toString()}
                    address={item.address}
                    price={item.monthlyPrice}
                    onPress={() => viewProperty(item.propertyID)}
                    />
                ))
                ) : (
                <View style={styles.noProperties}>
                    <Text style={[theme.textColor]}>No properties listed yet</Text>
                </View>
                )}
                </ScrollView>

                {/* Fixed bottom nav bar */}
            </View>
                <View style={styles.bottomNav}>
                    {/* Bottom Navigation Bar */}
                    <BottomNavBar  selectedTab="home"/>
                </View>
        </View>
    );
}
export default BrowseProperties;

const browse = StyleSheet.create({
    container:{
        flex: 1,
    },
    content:{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    searchbar:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    searchIcon:{
        paddingRight: 10,
        alignContent: 'center'
    },
    customTextField:{
        flex: 1,
    },
    filters:{
        flexDirection: 'row',
        gap: 10,
        paddingLeft: 10,
        paddingBottom: 23,
    }
})