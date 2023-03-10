import { StatusBar } from 'expo-status-bar';
import { AppRegistry, ScrollView, StyleSheet, Text, View } from 'react-native';
import Index from './Index';

export default function App() {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Index></Index>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
  text:{
    color:'black',
    fontSize:30,
  }
});

