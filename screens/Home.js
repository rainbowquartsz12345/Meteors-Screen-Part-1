import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image,
    ImageBackground,
} from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground style={styles.backgroundImage} source={require('../assets/bg_image.png')}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>ISS Tracker App</Text>
                    </View>

                    <TouchableOpacity style={styles.routeCards} 
                    onPress = {()=> this.props.navigation.navigate("IssLocation") } > 
                        <Text style={styles.routeText}>ISS Location</Text>
                        <Text style={styles.knowMore}> {'know more ---> '} </Text>
                        <Text style={styles.bgDigit}>1</Text>
                        <Image style = {styles.iconImage} source= {require('../assets/iss_icon.png')}   />
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.routeCards} 
                    onPress = {()=> this.props.navigation.navigate("Meteors") } > 
                        <Text style={styles.routeText}>Meteors </Text>
                        <Text style={styles.knowMore}> {'know more ---> '} </Text>
                        <Text style={styles.bgDigit}>2</Text>
                        <Image style = {styles.iconImage} source= {require('../assets/meteor_icon.png')}   />
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
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'red',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    routeCards: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 30,

    },
    routeText: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    iconImage: {
        position: 'absolute',
        height: 190,
        width: 190,
        resizeMode: 'contain',
        right: 20,
        top: -90,
    },
    knowMore: {
        color: 'red',
        fontSize: 20,
        paddingRight: 120,
    },
    bgDigit: {
        position:'absolute',
        color: 'rgba(183, 183,183,0.5)',
        fontSize: 150,
        right: 20,
        bottom:-15,
        zIndex: -1,
    },
});

