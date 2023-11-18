import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Canvas, Oval, Group, Circle} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Eye = () => {
  const xPos = useSharedValue(width * 0.425);
  const xPosPatch = useSharedValue(width * 0.4);

  React.useEffect(() => {
    xPos.value = withRepeat(
      withTiming(width * 0.575, {duration: 2500, easing: Easing.linear}),
      -1,
      true,
    );
    xPosPatch.value = withRepeat(
      withTiming(width * 0.575, {duration: 2500, easing: Easing.linear}),
      -1,
      true,
    );
  }, [xPos, xPosPatch]);
  return (
    <Canvas style={{flex: 1}}>
      <Group style={'fill'}>
        <Oval
          x={width * 0.35}
          y={height * 0.016}
          width={width * 0.3}
          height={64}
          color="#000"
        />
        <Oval
          x={width * 0.36}
          y={height * 0.018}
          width={width * 0.28}
          height={60}
          color="#fff"
        />
        <Circle cx={xPos} cy={height * 0.06} r={18} color="#000" />
        <Oval
          x={xPosPatch}
          y={height * 0.065}
          width={16}
          height={6}
          color="#fff"
        />
      </Group>
      {/* <Oval x={64} y={0} width={256} height={108} color="#fff" /> */}
    </Canvas>
  );
};

export default Eye;
