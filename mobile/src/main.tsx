import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
//import api from '../services/api';

export default function main() {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <TouchableHighlight>
                <View style={styles.button}>
                    <Feather name="cpu" size={400} color="#F5AB35" />
                    <Text style={styles.buttonText}>TouchableHighlight</Text>
                </View>
            </TouchableHighlight>


            <View style={styles.footer}>
                <Text style={styles.footerText}> Click </Text>
                <RectButton style={styles.createPointButton} onPress={main}>
                    <Feather name="coffee" size={20} color="#F5AB35" />
                </RectButton>

                <Text style={styles.footerText}> Shopping </Text>
                <RectButton style={styles.createPointButton} onPress={main}>
                    <Feather name="shopping-cart" size={20} color="#F5AB35" />
                </RectButton>

                <Text style={styles.footerText}> Perfil </Text>
                <RectButton style={styles.createPointButton} onPress={main}>
                    <Feather name="settings" size={20} color="#F5AB35" />
                </RectButton>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    footer: {
        paddingLeft: 24,
        paddingRight: 84,
        flexDirection: 'row',
        alignItems: 'center',
        width: 450,
        height: 72,
        top: 873,
        left: 0,
        backgroundColor: '#FFF',
        borderRadius: 30,
        elevation: 2,
        justifyContent: 'space-between',

        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomStartRadius: 0,
    },
    footerText: {
        textAlign: 'center',
        //alignItems: 'center',
        color: '#F5AB35',
        //fontFamily: 'Nunito_700Bold',
        //position: 'relative',
        //left: 60,
        //top: 22,
        padding: 20,
    },
    createPointButton: {
        alignItems: 'center',
        left: 3.5,
        right: 3.9,
        height: 36,
        justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
    },
});