import React from 'react';
import {StyleSheet, Text, View, Image, CameraRoll, Dimensions, Alert, ImageBackground} from 'react-native';
import { Constants, Permissions, ImagePicker } from 'expo';
import {Button, Header} from 'react-native-elements'

import * as firebase from 'firebase';






export default class Post extends React.Component {
state = {
    image:null,
    postDate: null,
    userName: this.props.navigation.state.params.userName,
    userPic: this.props.navigation.state.params.userPic,
    name: this.props.navigation.state.params.userName,
    pic: this.props.navigation.state.params.userPic
};




    onChooseImagePress = async () => {

        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);

        if(status === "granted") {

            let result = await ImagePicker.launchCameraAsync();
            const date = new Date().getDate();
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();
            const hours = new Date().getHours();
            const min = new Date().getMinutes();
            const sec = new Date().getSeconds();
            const dater = date + "" + month + "" + year + "" + hours + "" + min + "" + sec;

            this.uploadImage(result.uri, dater)
                .then(() => {
                    Alert.alert("success");
                })
                .catch((error) => {
                    Alert.alert(error);
                });

            this.setState({
                image: result,
                postDate: dater
            });

            console.log(this.state.image, "photo");
            this.props.navigation.replace('Home', {
                image: result,
                name: this.props.navigation.state.params.name,
                postDate: dater,
                pic: this.props.navigation.state.params.pic,
                userPic: this.props.navigation.state.params.userPic,
                userName: this.props.navigation.state.params.userName,
                email: this.props.navigation.state.params.email

            });


        }


    }



uploadImage = async (uri, imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref=firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
}


    pickFromGallery = async () => {
        var that = this;

        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);

        console.log(permissions, status);

        if(status === 'granted') {
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
            })

                .catch(error => console.log(permissions, { error }));

            if (!image.cancelled) {
                this.setState({
                    image: image
                });
            }


            const date = new Date().getDate();
            const month = new Date().getMonth() +1;
            const year = new Date().getFullYear();
            const hours = new Date().getHours();
            const min = new Date().getMinutes();
            const sec = new Date().getSeconds();
            const dater = date + "" + month + "" + year + "" + hours + "" + min + "" + sec;

                this.uploadImage(this.state.image.uri, dater)
                    .then(() => {
                        console.log("success");
                    })
                    .catch((error) => {
                        console.log(error);
                    });



            console.log(this.state.image, "photo");
            this.props.navigation.replace('Home', {
                image: image,
                name: this.state.name,
                postDate: dater,
                pic: this.props.navigation.state.params.pic,
                userPic: this.props.navigation.state.params.userPic,
                userName: this.props.navigation.state.params.userName,
                email: this.props.navigation.state.params.email
            });
        }


    }




render() {
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
                    name: this.props.navigation.state.userName,
                    pic: this.props.navigation.state.userPic,
                })

            }}
            centerComponent={{ text: 'Wolfsburg MotorSports', style: { color: '#fff', fontSize: 25 } }}

        />
    </View>
    <View>
        <Image source = {require('../images/miata.jpg')} style={{width: imageWidth-20, height: imageHeight, borderRadius: 40, paddingLeft: 20, paddingTop: 20, marginTop: 30}}/>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>

        <View>
            {/*<Button*/}
                {/*title="Take Pic..."*/}
                {/*large*/}
                {/*rightIcon={{name: 'camera'}}*/}
                {/*backgroundColor= 'orange'*/}
                {/*rounded*/}
                {/*onPress={this.onChooseImagePress}*/}
                {/*/>*/}
            {/*<Text></Text>*/}
            {/*<Text></Text>*/}
            {/*<Text></Text>*/}
            <Button
                title="Get Pic"
                large
                backgroundColor = 'blue'
                rounded
                rightIcon={{name: 'camera'}}
                onPress={this.pickFromGallery}/>
        </View>
    </View>
</View>
);
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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

