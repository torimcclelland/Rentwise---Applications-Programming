import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import TextField from '../components/TextField'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import Icon from 'react-native-vector-icons/Feather'
import PrimaryButton from '../components/PrimaryButton'
import DropDown from '../components/DropDown'
import { Property } from '../models/Property'
import { updateProperty } from '../database_calls/property/UpdateProperty'
import { useTheme } from '../ThemeContext'
import TextFieldLong from '../components/TextFieldLong'
import ImageCarousel from '../components/ImageCarousel'


export const PropertyEditScreen = () =>{
    
    const route = useRoute();
    const {propertyID} = route.params
    const theme = useTheme()    

    // variables
    const [property, setProperty] = useState(new Property({})) // initialize property to empty
    // create an array to hold state values
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']    

    // navigation
    const navigation = useNavigation();

    useEffect(()=>{
        getPropertyInfo();
      }, [])

    const getPropertyInfo = async() =>{
        const result = await getPropertyByID(propertyID)
        setProperty(result.resultData)
    }

    const updateThisProperty = async() => {
        console.log(property)
        const result = await updateProperty(property)

        if(!result.success){
            console.log(result.errorMsg)
            return;
        }

        navigation.navigate('Landlord Dashboard');
    }

    return (
        <View style={[styles.component, theme.container]}>

            <ScrollView>
            <ImageCarousel images={property.images} imageStyle={{height: 300}}/>
            
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
                <DropDown
                placeholder={property.state}
                options={states}
                value={property.state}
                onSelect={(text) => setProperty({ ...property, state: text })}
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
                placeholder={String(property.monthlyPrice)}
                value={String(property.monthlyPrice)}
                onChangeText={(text) => setProperty({ ...property, monthlyPrice: text })}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, theme.textColor]}>Description</Text>
                <TextFieldLong
                  placeholder={property.description}
                  value={property.description}
                  onChangeText={(text) => setProperty({ ...property, description: text })}
                  maxLength={200}
                  />
            </View>
            <PrimaryButton
            title="Save"
            size="small"
            onPress={updateThisProperty}
            />
            </ScrollView>
        </View>
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