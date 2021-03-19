import React from 'react';
import {StyleSheet, Text, View, Modal, Dimensions, Image, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
import Button from './button'
const alert = ({visible, score}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
                  <Image style={{ width: width - width / 4, height: height / 2, position:'absolute', top: 0}} source={require('../src/assets/images/bg.jpg')} />
                  <Text style={styles.textContent}>Your Score:</Text>
                  <Text style={[styles.textContent, { fontSize: 62, color: 'red' }]}>{score}</Text>
                  <TouchableOpacity  activeOpacity = {0.9} style = {styles.button}>
                      <Text style = {[styles.textContent, {color: '#fff'}]}>0K</Text>
                  </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default alert;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'rgba(232, 236, 241, 0.9)',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    width: width - width / 4,
    height: height / 2,
    elevation: 1,
    alignSelf: 'center',
      borderRadius: 8,
      justifyContent: 'center',
    alignItems:'center'
    },
    textContent: {
        fontSize: 32,
        fontFamily: 'PermanentMarker'
    },
    textScore: {
        fontSize: 36,
        fontFamily: 'PermanentMarker'
    },
    button: {
        width: 120, height: 50,
        backgroundColor: 'red',
        borderRadius: 5,
        position: 'absolute',
        bottom: 8,
        justifyContent: 'center',
        alignItems:'center'
    }
});
