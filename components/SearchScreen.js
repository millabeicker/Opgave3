import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import { TextInput } from 'react-native';


export default class DetailsScreen extends Component {

//Viser et billede og en input box der skal søge i databasen.
    render() {
        return (
            <View style={Style.page}>
                <View style={Style.imageContainer}>
                    <Image source = {{uri:'https://mst.dk/media/113238/logo-mst.png'}}
                       style = {Style.picture}/>
                </View>

                <View style={Style.container}>
                    <TextInput
                        style={{ height: 40, width: 300,
                            borderColor: 'black', borderWidth: 1,
                            backgroundColor: 'lightgrey' }}
                    />

                    <Button color = "black" title = "Search"> </Button>
                </View>
            </View>
        );
    }
}

//Styleing
const Style = StyleSheet.create({
    page: {
        backgroundColor: '#749674',
        borderWidth: 0,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        alignItems: 'center',
        height: 200,
        width: 500,
    },

    picture : {
        width: 300,
        height: 65,
        resizeMode: 'contain',
        marginTop: 150

    },

    container: {
        alignItems: 'center',
        height: 250,
        marginTop: 50
    }

});