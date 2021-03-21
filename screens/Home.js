import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  Easing
} from 'react-native';

import Box from '../components/boxComponent';
import Modal from '../components/alertComponent';


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
  const [score, setScore] = useState(1);
  const [showButton, setshowButton] = useState(true);  
  const [valueX, setValueX] = useState(new Animated.Value(0))
  const [passAll, setPassAll] = useState(false)
  const [visible, setVisible] = useState(false)
  const refPassAll = useRef(passAll)
  refPassAll.current = passAll

  useEffect(() => {    
    getData();
  }, []);

  useEffect(() => {    
    showBoxs();    
  }, [boxs])

  useEffect(() => {    
 progressBarAnimation();    
  }, [])
 

  async function getData() {
    setPassAll(false)
    const data = await createBoxs(3);
    setBoxs(data);
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
    if (box + 36 < newBox - 36) return true;
    if (box - 36 > newBox + 36) return true;
    return false;
  };

  const createBoxs = async limmitNum => {
    setBoxs([]);
    let X, Y;
    const boxsTemp = [];

    boxsTemp.push({
      X: ranX(),
      Y: ranY(),
      color: ranColor(),
      number: Math.floor(Math.random() * 1000),
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
        number: Math.floor(Math.random() * 1000),
        scale: new Animated.Value(0),
      });
    }
    return boxsTemp;
  };

  const showAnimation = scale => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      
      easing: Easing.bounce
    }).start();
  };

  const isStupid =  box => {
    for (var i = 0; i < boxs.length; i++) {
      if (box.number > boxs[i].number) {
        return true;
      }
    }    
    hideBox(box)
    
    return false;
  };

  const hideBox = box => {
    Animated.timing(box.scale, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,      
    }).start(() => {
      setBoxs(boxs.filter(b => b.X !== box.X));
    })
  };

  const onPressContinue = () => {
    
    getData();
    setScore(1);
    setVisible(false);
    progressBarAnimation()

  }

  const onPressBox = async box => {    
    if (isStupid(box)) {
      Animated.timing(valueX).reset();
     // setVisible(true)
      //setScore(1);     
      // getData();
    } else {
      if (boxs.length === 1) {        
        setScore(score + 1);
        await setPassAll(true)       
        Animated.timing(valueX).reset();        
        getData();       
      }
    }   

  };

  const showBoxs = () => {
    for (let i = 0; i < boxs.length; i++){
      setTimeout(() => {
         showAnimation(boxs[i].scale);
      }, 100 * i);
    }
    
  };
  const progressToZero = (calback) => {
    Animated.timing(valueX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,      
    }).start(calback)
  }

  const progressBarAnimation = () => {   
    Animated.timing(valueX, {
      toValue: -width,
      duration: 11000 - score * 1000,
      useNativeDriver: true,      
    }).start(() => {
      if (refPassAll.current === false)
      {
        setVisible(true)
        progressToZero()
      } 
      else {      
       progressToZero(()=>progressBarAnimation())
      }
    })    
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../src/assets/images/bg.jpg')}
      />
      <Modal visible = {visible} score={score} onPress = {()=>onPressContinue()} />
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
            onPressBox(box);             
            }}
          />
        );
      })}
        <Text style={styles.textScore}>{score}</Text>     
      <Animated.View
        style={[styles.progressBar, {transform: [{translateX: valueX}]}]}
      />
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
  textScore: {
    color: 'red',
    fontSize: 28,
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontFamily: 'PermanentMarker'
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 4,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    color: '#fff',    
    fontFamily: 'PermanentMarker'
  },
  progressBar: {
    width: width,
    height: 10,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0,
  },
  imageBackground: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
  },
});

export default Home;
