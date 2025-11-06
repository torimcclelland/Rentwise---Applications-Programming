import React, {useState} from 'react'
import {View, Image, FlatList, StyleSheet, Dimensions} from "react-native"

const {width} = Dimensions.get('window');

const ImageCarousel = ({images, onActiveImageChange, imageStyle}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {

        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);

        // here we send the active index back to the caller if they request it (for deleting the current image in AddPropertyModal)
        if(onActiveImageChange){
            onActiveImageChange(index)
        }

    } 

    return (
        <View style={{width, justifyContent: 'center'}}>
            <FlatList
            data={images}
            horizontal
            pagingEnabled
            nestedScrollEnabled={true}
            scrollEnabled={true}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{width}}>
                    <Image
                    source = {{uri: item}}
                    style = {[{width: '100%'}, imageStyle]}
                    />
                </View>
            )}
            />

            <View style={styles.dots}>
                {images.map((_, index) => (
                    <View
                    key={index}
                    style={[
                        styles.dot,
                        { opacity: index === activeIndex ? 1 : 0.3 }
                    ]}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 4
    },
    dots:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8
    }
})

export default ImageCarousel;