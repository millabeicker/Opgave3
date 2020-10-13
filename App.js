import React from 'react';
import {createBottomTabNavigator} from "react-navigation-tabs";
import MapScreen from "./components/MapScreen";
import PictureScreen from "./components/PhotoScreens/PictureScreen";
import SearchScreen from "./components/SearchScreen";
import {createAppContainer} from "react-navigation";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import navStack from "./components/StackNavigation";
import NavStack from "./components/StackNavigation";


const TabNavigator = createBottomTabNavigator(
    {
      /*route 1*/
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarLabel:"Search",
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="search" size={35} color={tintColor} />
                )
            },
        },

      /*Navn på Route 2*/
        MapView: {
            screen: MapScreen,
            /*Instillinger til navigation*/
            navigationOptions: {
                /*Navn*/
                tabBarLabel:"Map View",
                /*Ikon*/
                tabBarIcon: ({ tintColor }) => (
                    <Entypo name="map" size={35} color={tintColor} />
                )
            },
        },

      /*Navn på Route 3*/
        Picture: {
            screen: NavStack,
            navigationOptions: {
                tabBarLabel:"Foto",
                tabBarIcon: ({ tintColor }) => (
                    <Entypo name="camera" size={35} color={tintColor}  />
                )
            },
        },
    },

    /*Generelle label indstillinger*/
    {
      tabBarOptions: {
        showIcon:true,
        labelStyle: {
          fontSize: 1,
        },
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        size:40
      },
    }

)


export default createAppContainer(TabNavigator);