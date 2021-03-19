import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';

const button = ({
  width = 100,
  height = 50,
  backgroundColor,
  title,
  onPress,
  titleColor = '#ffff',
  fontSize = 18,
  translateY,
  opacity,
}) => {
  return (
    <Animated.View
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          width,
          height,
          opacity,
          backgroundColor,
          onPress,
          transform: [{translateY}],
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.title, {color: titleColor, fontSize}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PermanentMarker',
  },
});
