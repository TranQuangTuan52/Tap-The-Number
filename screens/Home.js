import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import Box from '../components/boxComponent';
import Modal from '../components/alert';
const {width, height} = Dimensions.get('screen');
const limitHeight = height / 2 - 60;
const Colors = [
  '#BC0437',
  '#7F53E3',
  '#1840CE',
  '#16374B',
  '#137F7B',
  '#DC9E35',
  '#F66935',
];
const Home = () => {
  const [boxs, setBoxs] = useState([]);
  const [level, setLevel] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [valueX, setValueX] = useState(new Animated.Value(0))
  
  useEffect(async () => {       
    getData()
  }, []);

  async function getData() {
    const data = await createBoxs(3);
    setBoxs(data);
    console.log(boxs);
  }
  const ranY = () => {
    return (
      Math.random() *
      (width / 2 - 60) *
      (Math.floor(Math.random() * 5) % 2 === 0 ? 1 : -1)
    );
  };
  const ranColor = () => {
    return Colors[Math.floor(Math.random() * Colors.length)];
  };

  const ranX = () => {
    return (
      Math.random() *
      (width / 2 - 60) *
      (Math.floor(Math.random() * 5) % 2 === 0 ? 1 : -1)
    );
  };

  const ok = (newBox, box) => {
    if (box + 42 < newBox - 42) return true;
    if (box - 42 > newBox + 42) return true;
    return false;
  };

  const createBoxs = async (limmitNum) => {
    setBoxs([]);
    let X, Y;
    const boxsTemp = [];

    boxsTemp.push({
      X: ranX(),
      Y: ranY(),
      color: ranColor(),
      number: Math.floor(Math.random()* (1000) ),
      scale: new Animated.Value(0),
    });
    for (var i = 1; i < limmitNum; i++) {
      X = ranX();
      Y = ranY();
      for (var j = 0; j < boxsTemp.length; ) {
        if (ok(X, boxsTemp[j].X) === false || ok(Y, boxsTemp[j].Y) === false) {
          X = ranX();
          Y = ranY();
          j = 0;
        } else {
          j++;
        }
      }
      boxsTemp.push({
        X,
        Y,
        color: ranColor(),
        number: Math.floor(Math.random()* (1000) ),
        scale: new Animated.Value(0),
      });
    }
    return boxsTemp;
  };

  const showAnimation = scale => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const isStupid = num => {
    for (var i = 0; i < boxs.length; i++) {
      if (num > boxs[i].number) {        
        return true;
      }
    }
    console.log('false')
    setBoxs(
      boxs.filter(box=>box.number !== num)
    )          
   
    return false;
    
  };

  const hideAnimation = async (scale) => {
    Animated.spring(scale, {
      toValue: 0,
      friction: 9,
      useNativeDriver: true,
    }).start(() => {
      
    });
  };

  const checkOnPress = (number) => {    
    if (isStupid(number)) {
      Animated.timing(valueX).reset();
      setValueX(new Animated.Value(0))
      alert('fail');
      setLevel(1);
      setshowButton(true);
      getData()
     
    }
    else {
      
      if (boxs.length === 1) {
        Animated.timing(valueX).stop();
        setValueX(new Animated.Value(0))
        setLevel(level + 1);
        getData();
        setshowButton(true)        
      }
      
    }
  }

  const showBoxs = () => {
    boxs.map(box => {
      showAnimation(box.scale);
    });
  };

  const progressBarStart = (timing) => {
    Animated.timing(valueX, {
      toValue: -width,
      duration: timing,
      useNativeDriver: true
    }).start(() => {
      if (boxs.length > 0) {
        alert('time limited');
        setLevel(1);
      setshowButton(true)}
    })
  }
  return (
    <View style={styles.container}>
       <Image style={{ width: width , height: height , position:'absolute', top: 0}} source={require('../src/assets/images/bg.jpg')} />
      <Modal visible={false} score={ 9 }/>
      {boxs.map(box => {
        return (
          <Box
            key={box.X}
            X={box.X}
            Y={box.Y}
            color={box.color}
            number={box.number}
            scale={box.scale}
            onPress={() => {             
              hideAnimation(box.scale, box.number)
              checkOnPress(box.number);
            }}
          />
        );
      })}
      {showButton ?  <TouchableOpacity
        onPress={() => {
          setshowButton(false)
          showBoxs();
          progressBarStart(11000 - level* 1000)
        }}
        style={styles.button}
      >
       <Text style = {styles.textButton} >{ level === 1 ? 'Play' : 'continue'}</Text>
      </TouchableOpacity>: null }
      <View style={styles.background}>
        <Text style={styles.textLevel}>
          {level}
        </Text>
      </View>
  <Animated.View style = {[styles.progressBar, { transform: [{translateX: valueX}] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'red',
    opacity: 0.2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLevel: {
    color: 'red', fontSize: 120, fontWeight: 'bold'
  },
  button:{
    width: 100,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 4,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center'
  },
  textButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight:'bold'
  },
  progressBar: {
    width: width,
    height: 10,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0
  }
});

export default Home;

