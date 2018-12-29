import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import { Button, Header } from 'react-native-elements'
import * as firebase from 'firebase';

import { Input } from 'native-base'

const firebaseConfig = {

};




export default class Home extends React.Component {
    state = {
        image: this.props.navigation.state.params.image,
        text: '',
        title: '',
        name: this.props.navigation.state.params.userName,
        userName: this.props.navigation.state.params.userName,
        userPic: this.props.navigation.state.params.userPic,
        postDate: this.props.navigation.state.params.postDate,
        pic: this.props.navigation.state.params.userPic,

    };


    sendData = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const ref = firebase.database().ref('/feed/' + this.state.postDate).set(
            {
                title: this.state.title,
                text: this.state.text,
                name: this.state.name,
                pic: this.state.pic,
                date: "https://storage.googleapis.com/wolffeed-66182.appspot.com/images/" + this.state.postDate,
                dater: this.state.postDate
            }
        ).then(() => {
            console.log("posted to fb");
        }) .catch((error) =>{
           console.log("error posting", error)
        });

        this.props.navigation.replace('Profile', {
            name: this.props.navigation.state.params.name,
            pic: this.state.pic,
            postDate: this.state.postDate,
            userName: this.props.navigation.state.params.userName,
            userPic: this.props.navigation.state.params.userPic,
            email: this.props.navigation.state.params.email


        });
    }


    render() {


        let pics = {uri:this.props.navigation.state.params.image.uri };
        console.log(this.props.navigation.state.params.image.uri, "image from home");
        console.log(this.state.postDate, "postDate from home")
        console.log(this.state.text, "text from home")
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 9 / 16);
        const imageWidth = dimensions.width;
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        backgroundColor = "black"
                        rightComponent={{ icon: 'home', color: '#fff',   onPress: () => this.props.navigation.replace('Profile', {
                                email: this.props.navigation.state.params.email,
                                userName: this.props.navigation.state.params.userName,
                                userPic: this.props.navigation.state.params.userPic

                            })

                        }}
                        centerComponent={{ text: 'Wolfsburg MotorSports', style: { color: '#fff', fontSize: 25 } }}

                    />
                </View>
                <ScrollView>
                <Input
                    style={styles.title}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    placeholder = "Type your title here"

                />
                <View>
                    <Image source = {pics} style={{width: imageWidth, height: 300, paddingLeft: 20}}/>
                </View>

                <Input
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder = "Type your comments here"
                />

                    <Text></Text>
                <Button style={styles.button}
                        large
                        rightIcon={{name: 'comment'}}
                        backgroundColor= 'green'
                        rounded
                        title ="Post"
                        onPress={() => this.sendData(this.state.text, this.state.title, this.state.image)}

                >



                </Button>
                <Text></Text>



                <Button style={styles.button}
                        large
                        rightIcon={{name: 'camera'}}
                        backgroundColor= 'blue'
                        rounded
                        title ="Change Pic"
                        onPress={() =>   this.props.navigation.replace('Post', {
                            name: this.props.navigation.state.params.name,
                            userName: this.props.navigation.state.params.userName,
                            userPic: this.props.navigation.state.params.userPic,
                            email: this.props.navigation.state.params.email
                        })}

                >



                </Button>
                    <Text style={{paddingTop: 50}}></Text>
</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    input:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: '#FDFCF2',
        borderWidth: 0.5,
        borderColor: 'black',
        height: 50,
        marginTop: 4,
    },
    title:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: '#FDFCF2',
        borderWidth: 0.5,
        borderColor: 'black'
    }
});
