import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


export async function uploadImage(allowsMultipleSelection = false, selectionLimit = 1){

    // Ask for permission every time (iOS can silently deny if not requested)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        alert("Permission to access the photo library is required!");
        return null;
    }
    
    let manipResultList = [] // initialize empty array to store photos 

    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection,
    selectionLimit,
    quality: 1,
    });

    if (!result.canceled){

        for (let i = 0; i < result.assets.length; i++){

            const uri = result.assets[i].uri 

            const manipResult = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 300 } }],
                { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG, base64: true }
            );

            const base64 = manipResult.base64

            manipResultList.push(`data:image/jpeg;base64,${base64}`)
        }


    }

    return manipResultList
}
