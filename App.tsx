import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { ScreenId } from './src/scenarios';
import { HomeScreen } from './src/screens/HomeScreen';
import { UnnecessaryRendersScreen } from './src/screens/UnnecessaryRendersScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('home');

  return (
    <GestureHandlerRootView style={styles.root}>
      {screen === 'unnecessary-renders' ? (
        <UnnecessaryRendersScreen onBack={() => setScreen('home')} />
      ) : (
        <HomeScreen onOpen={(id) => setScreen(id)} />
      )}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#14120e',
  },
});
