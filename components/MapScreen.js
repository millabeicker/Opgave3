import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Accuracy} from "expo-location";

export default class MapScreen extends React.Component {
    mapViewRef = React.createRef();

    state = {
        //Undersøger om der er tilladelse til lokation
        hasLocationPermission: null,
        //Ser på brugerens nuværende lokaltion
        currentLocation: null,

    };

    //får tilladelse til at bruge lokation
    getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ hasLocationPermission: status });
    };

    componentDidMount = async () => {
        await this.getLocationPermission();
    };

    //Opdatere lokationen
    updateLocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced});
        this.setState({ currentLocation: coords });
    };


    //Render af brugerens nuværende lokation
    renderCurrentLocation = () => {
        //Viser ingenting hvis der ikke er adgang.
        const { hasLocationPermission} = this.state;
        if (hasLocationPermission === null) {
            return null;
        }
        //Sender brugeren til settnings for at få adgang.
        if (hasLocationPermission === false) {
            return <Text>No location access. Go to settings to change</Text>;
        }
        return (
            <View>
                <Button color="black" title="update location" onPress={this.updateLocation} />
            </View>
        );
    };

    //Main render viser et map og user lokation. indeholder 3 hardcoded markører til at simulere funktionen.
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderCurrentLocation()}
                <MapView
                    provider="google"
                    style={styles.map}
                    ref={this.mapViewRef}
                    showsUserLocation
                    >

                    <Marker
                        coordinate={{ latitude: 55.676195, longitude: 12.569419 }}
                        title="Måge"
                        description="Mågen lever i dette område"
                    />
                    <Marker
                        coordinate={{ latitude: 55.673035, longitude: 12.568756 }}
                        title="Due"
                        description="Duen lever i dette område"
                    />
                    <Marker
                        coordinate={{ latitude: 55.674082, longitude: 12.598108 }}
                        title="Spurv"
                        description="Spurven lever i dette område"
                    />


                </MapView>
            </SafeAreaView>
        );
    }
}

//Styleing
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },

    map: {
        flex: 1,
    },


});