import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCENARIOS, type ScenarioId } from '../scenarios';
import { colors } from '../theme';

type Props = {
  onOpen: (id: ScenarioId) => void;
};

export function HomeScreen({ onOpen }: Props) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.kicker}>Performance lab</Text>
      <Text style={styles.title}>React Native scenarios</Text>
      <Text style={styles.lede}>
        Each topic is a live demo. Start with unnecessary renders — the rest
        unlock as we go.
      </Text>

      <View style={styles.list}>
        {SCENARIOS.map((scenario, index) => {
          const n = String(index + 1).padStart(2, '0');
          return (
            <Pressable
              key={scenario.id}
              disabled={!scenario.enabled}
              onPress={() => onOpen(scenario.id)}
              style={({ pressed }) => [
                styles.row,
                !scenario.enabled && styles.rowDisabled,
                pressed && scenario.enabled && styles.rowPressed,
              ]}
            >
              <Text style={styles.index}>{n}</Text>
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{scenario.title}</Text>
                <Text style={styles.rowSubtitle}>{scenario.subtitle}</Text>
              </View>
              <Text style={styles.meta}>
                {scenario.enabled ? 'Open' : 'Soon'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  lede: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowDisabled: {
    opacity: 0.42,
  },
  rowPressed: {
    backgroundColor: colors.surface,
  },
  index: {
    color: colors.phosphorDim,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
    width: 28,
  },
  rowBody: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  rowSubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  meta: {
    color: colors.phosphor,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
