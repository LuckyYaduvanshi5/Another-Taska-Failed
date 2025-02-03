import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { authService } from '../../src/services/supabase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error: loginError } = await authService.signIn(email, password);
      if (!loginError) {
        router.replace('/(main)/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text: string) => {
          setEmail(text);
          setError('');
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!error}
      />
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
          setError('');
        }}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        error={!!error}
      />
      
      <Button 
        mode="contained" 
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        Login
      </Button>
      
      <Button 
        mode="text" 
        onPress={() => router.push('/(auth)/signup')}
      >
        Don't have an account? Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    marginBottom: 12,
  },
  errorText: {
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 12,
  },
}); 