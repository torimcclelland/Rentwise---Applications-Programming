import React, {useState} from 'react'
import {View, Image, FlatList, StyleSheet, Dimensions} from "react-native"

const {width} = Dimensions.get("window");

const ImageCarousel = ({images, imageStyle}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    } 

    return (
        <View style={{width: 300}}>
            <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{width: 300}}>
                    <Image
                    source = {{uri: item}}
                    style = {[{width: 300}, imageStyle]}
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