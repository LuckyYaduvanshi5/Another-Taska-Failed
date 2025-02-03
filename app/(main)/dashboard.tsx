import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => router.push('/(main)/tasks')}
        style={styles.button}
      >
        Tasks
      </Button>
      
      <Button
        mode="contained"
        onPress={() => router.push('/(main)/focus')}
        style={styles.button}
      >
        Focus Mode
      </Button>
      
      <Button
        mode="contained"
        onPress={() => router.push('/(main)/analytics')}
        style={styles.button}
      >
        Analytics
      </Button>
      
      <Button
        mode="contained"
        onPress={() => router.push('/(main)/settings')}
        style={styles.button}
      >
        Settings
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 8,
  },
}); 