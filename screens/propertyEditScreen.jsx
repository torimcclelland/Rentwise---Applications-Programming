import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import TextField from '../components/TextField'
import { useRoute } from '@react-navigation/native'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import Icon from 'react-native-vector-icons/Feather'



export const PropertyEditScreen = () =>{
    const route = useRoute();
    const {propertyID} = route.params

    // variables
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [rentPrice, setRentPrice] = useState("");
    const [description, setDescription] = useState("");
    const [avgRating, setAvgRating] = useState(0.0)
    const [property, setProperty] = useState({}) // initialize property to empty

    // this.propertyID = propertyID;
    //     this.landlordID = landlordID;
    //     this.address = address;
    //     this.monthlyPrice = monthlyPrice;
    //     this.city = city;
    //     this.state = state;
    //     this.zipccode = zipcode;
    //     this.images = images;
    //     this.description = description;
    //     this.reviews = reviews;
    //     this.avgRating = avgRating;

    useEffect(()=>{
        getPropertyInfo();
      }, [])

    const getPropertyInfo = async() =>{
        const property = await getPropertyByID(propertyID)
        setProperty(property)
        setStreetAddress(property.address)
        setCity(property.city)
        setState(property.state)
        setZip(property.zipcode)
        setRentPrice(property.monthlyPrice)
        setDescription(property.description)

    }
    return (
        <ScrollView>
        <View style={styles.component}>
            <Pressable style={styles.imageBox}>
                <View style={styles.addImage}>
                <Icon name="plus" size={30} color="#666" />
                <Text>Add images</Text>
                </View>
            </Pressable>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Street Address</Text>
                <TextField
                placeholder={streetAddress}
                value={streetAddress}
                onChangeText={setStreetAddress}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>City</Text>
                <TextField
                placeholder={city}
                value={city}
                onChangeText={setCity}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>State</Text>
                <TextField
                placeholder={state}
                value={state}
                onChangeText={setState}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Zip Code</Text>
                <TextField
                placeholder={zip}
                value={zip}
                onChangeText={setZip}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Rent Price</Text>
                <TextField
                placeholder={rentPrice}
                value={rentPrice}
                onChangeText={setRentPrice}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Description</Text>
                <TextField
                placeholder={description}
                value={description}
                onChangeText={setDescription}
                />
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    component:{
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    fieldContainer: {
    marginBottom: 10, 
    },
    imageBox: {
    width: '100%',                
    height: 150,
    borderWidth: 2,
    borderColor: '#aaa',
    borderStyle: 'dashed',     
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 10,
    marginTop: 10
  },
  addImage:{
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PropertyEditScreen;