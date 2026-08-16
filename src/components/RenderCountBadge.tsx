import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
};

export function RenderCountBadge({ label }: Props) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.count}>{renders.current}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 120,
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  count: {
    color: colors.phosphor,
    fontSize: 32,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
    lineHeight: 36,
  },
});
