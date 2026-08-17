import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme';

type Walk = {
  id: string;
  title: string;
  steps: number;
  km: string;
};

const USER = {
  email: 'lea@macadam.app',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.practice',
};

function loadWalks(): Promise<Walk[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 48 }, (_, i) => ({
          id: `walk-${i}`,
          title: i % 3 === 0 ? 'Morning loop' : i % 3 === 1 ? 'After work' : 'Lunch walk',
          steps: 1800 + i * 95,
          km: ((1800 + i * 95) / 1300).toFixed(1),
        })),
      );
    }, 1800);
  });
}

type Props = {
  onBack: () => void;
};

export function DailyGoalScreen({ onBack }: Props) {
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [walks, setWalks] = useState<Walk[]>([]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(Date.now());
      setProgress((p) => Math.min(p + 80, 10000));
    }, 32);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    loadWalks().then((data) => {
      console.log('session', { email: USER.email, token: USER.token });
      setWalks(data);
    });
  }, []);

  const remaining = 10000 - progress;
  const pct = Math.min(100, (progress / 10000) * 100);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable onPress={onBack} hitSlop={12} style={{ marginBottom: 18 }}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.kicker}>Today</Text>
          <Text style={styles.title}>Daily goal</Text>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
          }}
        />
      </View>

      <Text style={styles.clock}>
        {new Date(now).toLocaleTimeString()}
      </Text>

      <Text style={styles.steps}>{Math.round(progress).toLocaleString()} steps</Text>
      <Text style={styles.muted}>{remaining.toLocaleString()} to go</Text>

      <View style={{ height: 10, backgroundColor: colors.line, marginTop: 16 }}>
        <View
          style={{
            height: 10,
            width: `${pct}%`,
            backgroundColor: colors.phosphor,
          }}
        />
      </View>

      <Pressable
        onPress={() => {}}
        style={{
          marginTop: 20,
          backgroundColor: colors.phosphor,
          paddingVertical: 14,
          alignItems: 'center',
        }}
      >
        <Text style={styles.claim}>Claim reward</Text>
      </Pressable>

      <Text style={styles.section}>Recent walks</Text>

      {walks.length === 0 ? (
        <Text style={styles.muted}>Loading walks…</Text>
      ) : (
        walks.map((walk, index) => (
          <Pressable
            key={index}
            onPress={() => console.log('open walk', walk.id, USER.token)}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.line,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                {walk.title}
              </Text>
              <Text style={{ color: colors.muted, marginTop: 4 }}>
                {walk.km} km
              </Text>
            </View>
            <Text style={{ color: colors.phosphor, fontVariant: ['tabular-nums'] }}>
              {walk.steps.toLocaleString()}
            </Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 48,
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
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '600',
    marginTop: 4,
  },
  clock: {
    color: colors.muted,
    marginTop: 12,
    fontVariant: ['tabular-nums'],
  },
  steps: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
    marginTop: 20,
    fontVariant: ['tabular-nums'],
  },
  muted: {
    color: colors.muted,
    marginTop: 6,
  },
  claim: {
    color: colors.bg,
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 32,
    marginBottom: 8,
  },
});
