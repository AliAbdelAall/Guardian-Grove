import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './(Auth)/Signup';
import Login from './(Auth)/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
      {/* <Signup/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});