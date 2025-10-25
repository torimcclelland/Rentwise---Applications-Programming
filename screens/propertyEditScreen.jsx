import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import TextField from '../components/TextField'
import { useRoute } from '@react-navigation/native'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import Icon from 'react-native-vector-icons/Feather'
import PrimaryButton from '../components/PrimaryButton'
import { Property } from '../models/Property'
import { updateProperty } from '../database_calls/property/UpdateProperty'
import { useTheme } from '../ThemeContext'



export const PropertyEditScreen = () =>{
    const route = useRoute();
    const {propertyID} = route.params
    const theme = useTheme()

    // variables
    const [property, setProperty] = useState({}) // initialize property to empty

    useEffect(()=>{
        getPropertyInfo();
      }, [])

    const getPropertyInfo = async() =>{
        const property = await getPropertyByID(propertyID)
        setProperty(property.propertyData)
    }

    const updateThisProperty = async() => {
        console.log(property)
        const result = await updateProperty(property)
    }

    return (
        <ScrollView style = {theme.container}>
        <View style={[styles.component, theme.container]}>
            <Pressable style={styles.imageBox}>
                <View style={styles.addImage}>
                <Icon name="plus" size={30} color="#666" />
                <Text>Add images</Text>
                </View>
            </Pressable>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>Street Address</Text>
                <TextField
                placeholder={property.address}
                value={property.address}
                onChangeText={(text) => setProperty({ ...property, address: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>City</Text>
                <TextField
                placeholder={property.city}
                value={property.city}
                onChangeText={(text) => setProperty({ ...property, city: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>State</Text>
                <TextField
                placeholder={property.state}
                value={property.state}
                onChangeText={(text) => setProperty({ ...property, state: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>Zip Code</Text>
                <TextField
                placeholder={property.zipcode}
                value={property.zipcode}
                onChangeText={(text) => setProperty({ ...property, zipcode: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>Rent Price</Text>
                <TextField
                placeholder={property.monthlyPrice}
                value={property.monthlyPrice}
                onChangeText={(text) => setProperty({ ...property, monthlyPrice: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>Description</Text>
                <TextField
                placeholder={property.description}
                value={property.description}
                onChangeText={(text) => setProperty({ ...property, description: text })}
                />
            </View>
            <PrimaryButton
            title="Save"
            size="small"
            onPress={updateThisProperty}
            />
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