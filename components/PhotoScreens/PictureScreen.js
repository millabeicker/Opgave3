import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Linking, FlatList,
    Button,TouchableOpacity, Image, } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default class DetailsScreen extends Component {
    cameraRef = React.createRef();

    /*stadier*/
    state = {
        hasCameraPermission: null,
        isClicked:false,
        cameraPosition:Camera.Constants.Type.back,
        hasCameraRollPermission: null,
    };

    componentDidMount() {
        this.updateCameraPermission();
        this.updateCameraRollPermission();
    }

    /*Få adgang til kamera*/
    updateCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    /*Få adgang til galleri*/
    updateCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    };

    /*Tager et billde*/
    handleTakePhoto = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const result = await this.cameraRef.current.takePictureAsync();
        this.setState({ lastPhoto: result.uri });
        this.handleSaveToCameraRoll(this.state.lastPhoto)
    };

    // Gem billedet i galleriet
    handleSaveToCameraRoll = async uri => {
        try {
            await MediaLibrary.createAssetAsync(uri, 'photo');

        } catch (error) {
            console.error(error);
        }
    };

    /*Skift imellem for og bag kameraet*/
    handleChangeCamera = () =>{
        if(this.state.isClicked){
            this.setState({cameraPosition:Camera.Constants.Type.front})
            this.setState({isClicked:false})
        }else{
            this.setState({cameraPosition:Camera.Constants.Type.back})
            this.setState({isClicked:true})
        }
    }

    /*Gå til indstillinger og få permission til at bruge kamera og galleri*/
    handleSettingLink = () =>{
        Linking.openSettings()
    }

    //Render af kameraview
    renderCameraView() {
        //Viser intet hvis der ikke er adgang
        const { hasCameraPermission, type } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }

        //Sender brugeren til settings for at få adgang.
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>Du har ikke adgang til kamera.</Text>
                    <Button onPress={this.handleSettingLink} title='Get permissions to access camera'> </Button>
                </View>
            );
        }

        return (
            <View>
                <Button  color="black" title="Switch camera" onPress={this.handleChangeCamera} />
                <Camera
                    style={Style.cameraView}
                    type={this.state.cameraPosition}
                    ref={this.cameraRef}>
                </Camera>

                <TouchableOpacity
                    style={Style.button}
                    activeOpacity={.7}
                    onPress={this.handleTakePhoto}
                >
                    <Text style={Style.text}> </Text>
                </TouchableOpacity>

            </View>
        );
    }

    /*Main renderr*/
    render() {
        return (
            <SafeAreaView style={Style.container}>
                <View>{this.renderCameraView()}</View>
            </SafeAreaView>);
    }
}

//Styleing
    const Style = StyleSheet.create({
        container: {
            backgroundColor: '#749674',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },


        cameraView: {
            marginTop: 10,
            marginBottom:10,
            width: 315,
            height: 330
        },

        button: {
            backgroundColor: "#343333",
            padding: 10,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 60,
            height: 50,
            width: 50,
            marginLeft: 130,


        },

        text: {
            fontSize: 15,
        }


    });
