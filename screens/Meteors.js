import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    Dimensions,
} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    getMeteors = () => {
        axios
            .get(
                'https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ'
            )
            .then((response) => {
                this.setState({
                    meteors: response.data.near_earth_objects,
                });
            })

            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    componentDidMount() {
        this.getMeteors();
    }

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text> Loading !</Text>
                </View>
            );
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map((mdate) => {
                return this.state.meteors[mdate]
            })
            let meteors = [].concat.apply([], meteor_arr)

            meteors.forEach(function (e) {
                //threat_score = diameter/distance
                // average diameter = min + max /2 

                let diameter = (e.estimated_diameter.miles.estimated_diameter_min + e.estimated_diameter.miles.estimated_diameter_max / 2)
                let threatScore = (diameter / e.close_approach_data[0].miss_distance.miles) * 100000000
                e.threat_score = threatScore
            })
            meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
            })
            meteors = meteors.slice(0, 5)


            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    titleBar: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    meteorContainer: {
        flex: 0.85,
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10,
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    cardText: {
        color: 'white',
    },
    threatDetector: {
        height: 10,
        marginBottom: 10,
    },
    gifContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    meteorDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
