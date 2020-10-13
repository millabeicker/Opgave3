import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Linking,
    FlatList,
    Button,
    Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default class PictureOverview extends React.Component {


    state = {
        isClicked:false,
        hasCameraRollPermission: null,
        galleryImages:null,
        showGallery: false
    };

    componentDidMount() {
        this.updateCameraRollPermission();
    }


    /*Denne metode giver adgang til fotogalleri*/
    updateCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    };

    /*Denne metode sender brugeren til indstillinger og få permission*/
    handleSettingLink = () =>{
        Linking.openSettings()
    }

    // Henter billeder fra galleriet
    handleLoadGalleryImages = async () => {
        try {
            const result =  await MediaLibrary.getAssetsAsync({first:20});
            this.setState({ galleryImages:result.assets });
        }catch (e) {
            console.log(e)
        }
    };

    //Vores render til fotogalleriet
    renderGalleryView() {

        // Viser  ingenting så længe vi venter på input fra bruger
        const { hasCameraRollPermission, galleryImages } = this.state;
        if (hasCameraRollPermission === null) {
            return <View />;
        }
        // Viser en fejlbesked og en knap til settings hvis brugeren ikke har accepteret adgangen
        if (hasCameraRollPermission === false) {
            return (
                <View>
                    <Text>No access to camera roll.</Text>
                    <Button title="Go to settings" onPress={this.handleSettingLink} />
                </View>
            );
        }
        // Her looper vi igennem den liste af 20 billeder som er modtaget fra CameraRoll og stiller dem op som et grid
        return (
            <View>
                <Button color="black" title="Load images" onPress={this.handleLoadGalleryImages} />
                <View style={styles.galleryView}>
                    {galleryImages && (
                        <FlatList
                            styles={styles.Flatlist_render}
                            data={galleryImages}

                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri}}
                                    key={item.uri}
                                    style={styles.FlatList_image}
                                />
                            )}
                            numColumns={3}
                            keyExtractor={item => item.id}
                        />
                    )}
                </View>
            </View>
        );
    }

    /*Main renderr funktionen renderer selve viewet */
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.galleryContainer}>{this.renderGalleryView()}</View>
            </SafeAreaView>);
    }

}

//Styleing
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },

    galleryContainer: {
        marginTop: 11,
        backgroundColor: '#749674',
    },

    FlatList_image:{
        width: 100,
        height: 100,
        margin: 5
    },

    Flatlist_render:{
        width:'100%',
        flexDirection: 'column',
    },

    galleryView: {
        height: "100%",
        width: '100%',
        flexDirection: 'row',
    },

});