import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './(Auth)/Signup';
import Login from './(Auth)/Login';
import { Redirect } from 'expo-router';

 const App = () => {
  return (
    <Redirect href={"home"}></Redirect>
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

export default App