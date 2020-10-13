import {createStackNavigator} from "react-navigation-stack";
import PictureScreen from "./PhotoScreens/PictureScreen";
import PictureOverview from "./PhotoScreens/PictureOverview";
import CameraRollScreen from "./PhotoScreens/CameraRollScreen";

const NavStack = createStackNavigator(
    //første del er navnet i appen, anden del er vores view
    {
        PictureOverview: {screen: PictureOverview},
        PictureScreen: {screen: PictureScreen},
        CameraRollScreen: {screen: CameraRollScreen}
    },

    //config af stackken.
    {
        initialRouteName: 'PictureOverview',
        headerMode: "float",
        navigationOptions:{
            title:'Main',
        },

    }



);



export default NavStack;