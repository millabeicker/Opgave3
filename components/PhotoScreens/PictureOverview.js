import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

export default class PictureOverview extends Component {

    //Navigations funktioner
    GoToPictureScreen = () => {
        this.props.navigation.navigate('PictureScreen');
    };

    GoToCameraRoll = () => {
        this.props.navigation.navigate('CameraRollScreen');
    }

    //Main render indeholder 2 buttens der leder dig til de andre komponenter i stacken
    render() {
        return(

                <View style = {Style.container}>
                    <TouchableOpacity
                        style={Style.button}
                        onPress={this.GoToPictureScreen}
                    >
                        <Text style={Style.text}> Take new photo </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Style.button}
                        onPress={this.GoToCameraRoll}
                    >
                        <Text style={Style.text}> Get photo from camera roll </Text>
                    </TouchableOpacity>
                </View>
        )
    }
}

//Styleing
const Style = StyleSheet.create({

    container: {
        alignItems: "center",
        backgroundColor: "#749674",
        height: "100%"

    },

    button: {
        alignItems: "center",
        backgroundColor: "lightgrey",
        borderRadius: 50,
        padding: 30,
        marginTop: 80,
        margin: 0,
        width: 200,
        borderColor: "grey",
        borderWidth: 1,
    },

    text: {
        fontSize: 18,
        textAlign: "center",
    }
});