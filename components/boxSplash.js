import React from 'react'
import { StyleSheet, Text, Animated } from 'react-native'

const boxSplash = ({backgroundColor, scale, title, rotate }) => {
    return (
        <Animated.View
          style={[styles.box, {backgroundColor, transform: [{scale}, {rotate}]}]}>
            <Text style={styles.titleBox}>{ title}</Text>
        </Animated.View>
    )
}

export default boxSplash

const styles = StyleSheet.create({
    box: {
        width: 80,
        height: 80,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    titleBox: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'PermanentMarker',
      },
})
