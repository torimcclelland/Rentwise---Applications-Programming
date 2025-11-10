import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View } from 'react-native'

const PropertyMapView = () => {
    return (
        <View style={map_styles.container}>
            <MapView style={map_styles.map} />
        </View>
    )
}

const map_styles = StyleSheet.create({
    container:{
        flex: 1
    },
    map:{
        width: '100%',
        height: '100%'
    }
})

export default PropertyMapView