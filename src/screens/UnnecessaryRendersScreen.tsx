import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RenderCountBadge } from '../components/RenderCountBadge';
import { colors } from '../theme';

type Props = {
  onBack: () => void;
};

function burnCpu(ms = 12) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Intentional: make extra renders obvious as hitch.
  }
}

function ExpensiveComponent() {
  burnCpu();

  return (
    <View style={styles.child}>
      <Text style={styles.childKicker}>Child</Text>
      <Text style={styles.childTitle}>ExpensiveComponent</Text>
      <Text style={styles.childBody}>
        I do not read count. I still re-render when Screen does, and I burn
        ~12ms of JS on every render.
      </Text>
      <RenderCountBadge label="Child renders" />
    </View>
  );
}

export function UnnecessaryRendersScreen({ onBack }: Props) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.kicker}>Scenario 01 — broken</Text>
      <Text style={styles.title}>Unnecessary React renders</Text>
      <Text style={styles.note}>
        Screen holds count. Increment re-renders Screen, then ExpensiveComponent
        by default — even though the child never uses that state.
      </Text>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelKicker}>Parent</Text>
          <Text style={styles.countValue}>count {count}</Text>
        </View>
        <RenderCountBadge label="Screen renders" />
        <Pressable
          onPress={() => setCount((c) => c + 1)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </Pressable>
      </View>

      <ExpensiveComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  back: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: colors.phosphor,
    fontSize: 15,
  },
  kicker: {
    color: colors.phosphor,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  note: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  panelKicker: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  countValue: {
    color: colors.text,
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.phosphor,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.bg,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  child: {
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    gap: 10,
  },
  childKicker: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  childTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  childBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
