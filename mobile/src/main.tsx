import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Feather } from '@expo/vector-icons';
//import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';


const image = { uri: 'https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }

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

  handleViewRef = (ref: any) => this.view = ref;
  bounce = () => this.view.bounce(800);
  view: any;


  handleNavigateToProfile() {
    console.log('Click happened');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.footer}>
            <Text style={styles.footerText}> Click </Text>
            <RectButton style={styles.icon}>
              <Feather name="coffee" size={25} color="#3835f5" />
            </RectButton>

            <Text style={styles.footerText}> Shop </Text>
            <RectButton style={styles.icon}>
              <Feather name="shopping-cart" size={25} color="#af35f5" />
            </RectButton>

            <Text style={styles.footerText}> Perfil </Text>
            <RectButton style={styles.icon} onPress={this.handleNavigateToProfile}>
              <Feather name="settings" size={25} color="#f53535" />
            </RectButton>
          </View>

          <View>
            <Text style={styles.countText}>{this.state.count} Bits</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.bounce} onPressIn={this.onPress}>
            <Animatable.View ref={this.handleViewRef}>
              <Feather name="cpu" size={200} color="#0aca91" />
            </Animatable.View>
          </TouchableOpacity>
        </ImageBackground>
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
    top: 23,
    fontWeight: 'bold',
    //padding: 4,
  },
  icon: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'stretch',
    right: 40,
    bottom: 5,
  },
  button: {
    alignItems: 'center',
    //backgroundColor: '#DDDDDD',
    padding: 30,
    //width: 300,
    //marginTop: 100,
    //flex: 1,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    //backgroundColor: 'rgba(52,52,52,alpha)',
    backgroundColor: 'grey',
    opacity: 0.7
  },
  countText: {
    textAlign: 'center',
    alignItems: 'center',
    top: -200,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'grey',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default App;