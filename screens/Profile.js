
import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements'




const firebaseConfig = {

};




export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            carMake: '',
            carModel: '',
            carYear: '',
            pic: '',
            carColor: '',
            carPic: '',
        };
    }

//

    callIt = () => {

        var that = this;

        const t = this.props.navigation.state.params.email;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const ref = firebase.database().ref();

        ref.on("value", function(snapshot) {
            const profiles = snapshot.val();
            const keys = Object.keys(profiles);

            for (var i = 0; i< keys.length; i++){
                var k = keys[i];
                var names = keys[i];
                var email = profiles[k].email;

                if (email == t){
                    console.log("got", email, names);
                    that.setState({
                        name: names,
                        carColor: profiles[k].carColor,
                        carMake: profiles[k].carMake,
                        carModel: profiles[k].carModel,
                        carYear: profiles[k].carYear,
                        pic: profiles[k].pic,
                        carPic: profiles[k].carPic,
                    });
                    console.log("setsState name", that.state.name);
                    console.log("setsState pic", that.state.pic);

                }


            }

        }, function (error) {
            console.log("Error: " + error.code);
        });
    }


    componentDidMount() {
        this.callIt();
    }


    render() {
        let pic = {uri: this.state.pic};
        let bkg = {uri: this.state.carPic};
        let banner = {uri: '../images/vmsBanner.png' }
        const tent = this.name;
        console.log(tent);
        return (

            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>
                    <View>
                        <Image source = {pic} style={styles.itemPic}/>
                    </View>
                    <View>
                        <Image source = {require('../assets/smallLogo.png')} style={{width: 200, height: 100, marginTop: 5, marginLeft:4}}/>

                        <Button
                                title="Feed"
                                large
                                backgroundColor = 'black'
                                rounded
                                rightIcon={{name: 'forum'}}
                                onPress={()=> this.props.navigation.replace('FeedPost', {
                                    userName: this.state.name,
                                    userPic: this.state.pic,
                                    email: this.props.navigation.state.params.email
                                })} />
                        <Text></Text>
                        <Button
                            title="messenger"
                            large
                            backgroundColor = 'black'
                            rounded
                            rightIcon={{name: 'message'}}
                            onPress={()=> this.props.navigation.replace('Messenger', {
                                userName: this.state.name,
                                userPic: this.state.pic,
                                email: this.props.navigation.state.params.email
                            })} />
                    </View>
                </View>
                <ImageBackground
                    source = {bkg}
                    style={{width: null, height: 400}}>
                    rounded
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7931e',
    },
    right: {
        padding: '2%'
    },
    itemPic: {
        width: 220,
        height: 220,
        borderRadius: 25,
    }
});

