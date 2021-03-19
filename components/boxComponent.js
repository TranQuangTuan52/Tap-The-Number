import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const boxComponent = ({X, Y, color, number, onPress, scale,}) => {
  //console.log(scale);
  //(Math.floor(math.random() * 10) % 2 === 0 ? -1 : 1)
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          transform: [{translateX: X}, {translateY: Y}, {scale}, ],
          backgroundColor: color,
        },
      ]}>
      <Text style={styles.value}>{number}</Text>
    </TouchableOpacity>
  );
};

export default boxComponent;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute'
  },
  value: {
    fontSize: 28,
    color: '#fff',
  },
});
