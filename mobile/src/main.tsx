import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

/*export function Main() {
  const navigation = useNavigation();

  function handleNavigateToProfile() {
    navigation.navigate('Profile');
  }
};*/
class App extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  
  handleNavigateToProfile() {
    console.log('Click happened');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
        <Text style={styles.footerText}> Click </Text>
        <RectButton style={styles.icon}>
          <Feather name="coffee" size={25} color="#F5AB35" />
        </RectButton>

        <Text style={styles.footerText}> Shop </Text>
        <RectButton style={styles.icon}>
          <Feather name="shopping-cart" size={25} color="#F5AB35" />
        </RectButton>

        <Text style={styles.footerText}> Perfil </Text>
        <RectButton style={styles.icon} onPress={this.handleNavigateToProfile}>
          <Feather name="settings" size={25} color="#F5AB35" />
        </RectButton>
      </View>

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Feather name="cpu" size={200} color="#F5AB35" />
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    width: 450,
    height: 72,
    top: 873,
    backgroundColor: '#FFF',
    elevation: 4,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  footerText: {
    //alignSelf: 'flex-end',
    justifyContent: 'center',
    left: 35,
    top: 23
    //padding: 4,
  },
  icon: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'stretch',
    right: 40,
    bottom: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 76,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default App;