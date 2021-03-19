import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Button from '../components/button';
import Box from '../components/boxSplash';
const Colors = [
  '#BC0437',
  '#7F53E3',
  '#1840CE',
  '#16374B',
  '#137F7B',
  '#DC9E35',
  '#F66935',
];
const {width, height} = Dimensions.get('screen');
const Splash = () => {
  React.useEffect(() => {
    containerAnimation();
  }, []);
  
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const xHeader = useRef(new Animated.Value(width / 2 + 100)).current;
  const yHeader = useRef(new Animated.Value(0 + 120)).current;
  const yButton = useRef(new Animated.Value(height / 2 - 300)).current;
  const fadeValue = useRef(new Animated.Value(0.5)).current;
  const [boxColor, setBoxColor] = useState(Colors[0]);
  const [boxNumber, setboxNumber] = useState(1);
  const rotateValue = useRef(new Animated.Value(0)).current;

  const containerAnimation = () => {
    Animated.sequence([
      //translateX 
      Animated.timing(xHeader, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        // translateY Header
        Animated.timing(yHeader, {
          toValue: -height / 2 + 300,
          timing: 500,
          useNativeDriver: true,
        }),
        // translateX button playGame
        Animated.timing(yButton, {
          toValue: height / 2 - 400,
          timing: 500,
          useNativeDriver: true,
        }),
        // opacity button playGame
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      // rotate box
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 360,
          duration: 2000,          
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // counter box to 10
      for (let i = 1; i < 11; i++) {
        setTimeout(() => {
          boxAnimation();
          setboxNumber(i);
          console.log(i);
        }, i * 800);
      }
    });
  };

  const interpolateRotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const boxAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
      duration: 500,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    });
  };

  const changeColorBox = () => {};

  const title = `Tap\nThe\nNumber`;
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require('../src/assets/images/bg.jpg')}
      />
      <Animated.View
        style={[
          styles.header,
          {transform: [{translateX: xHeader}, {translateY: yHeader}]},
        ]}>
        <Box
          backgroundColor={boxColor}
          title={boxNumber}
          scale={scaleValue}
          rotate={interpolateRotate}
        />
        <Text text numberOfLines={3} style={styles.title}>
          {title}
        </Text>
      </Animated.View>
      <View>
        <Button
          onPress={() => {navigation.navigate('Home')}}
          opacity={fadeValue}
          width={200}
          height={50}
          translateY={yButton}
          backgroundColor={'red'}
          title="Play Game"
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  title: {
    width: 100,
    height: 120,
    fontSize: 26,
    marginStart: 30,
    fontFamily: 'PermanentMarker',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    background: {
        width: width, height: height, position: 'absolute', top: 0
    },
});
