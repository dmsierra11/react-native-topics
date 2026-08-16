import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const COLLAPSED = 80;
const EXPANDED = 220;

export function ReanimatedSmokeScreen() {
  const [expanded, setExpanded] = useState(false);
  const width = useSharedValue(COLLAPSED);
  const offsetX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    transform: [{ translateX: offsetX.value }],
  }));

  const toggle = (mode: 'timing' | 'spring') => {
    const nextExpanded = !expanded;
    const nextWidth = nextExpanded ? EXPANDED : COLLAPSED;
    const nextOffset = nextExpanded ? 40 : 0;

    if (mode === 'timing') {
      width.value = withTiming(nextWidth, { duration: 400 });
      offsetX.value = withTiming(nextOffset, { duration: 400 });
    } else {
      width.value = withSpring(nextWidth);
      offsetX.value = withSpring(nextOffset);
    }

    setExpanded(nextExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated smoke test</Text>
      <Animated.View style={[styles.box, animatedStyle]} />
      <View style={styles.actions}>
        <Button title="Timing" onPress={() => toggle('timing')} />
        <Button title="Spring" onPress={() => toggle('spring')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  box: {
    height: 80,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
});
