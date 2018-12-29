import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';

import {} from 'react-native-elements'
import * as firebase from 'firebase';
import {Form, Input, Item, Button, Label } from 'native-base'

const firebaseConfig = {

};

// const hold =  [
//     {
//         "commented": "...",
//         "userName": "VWS",
//         "userPic": "https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-9/10426523_867389176627316_7322801437311008782_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpa1-2.fna&oh=5da1d37c01e46805de4d74b40eb611bc&oe=5C8AEE95",
//     },
// ];

const date = new Date().getDate();
const month = new Date().getMonth() +1;
const year = new Date().getFullYear();
const hours = new Date().getHours();
const min = new Date().getMinutes();
const sec = new Date().getSeconds();
const dater =  date + "" + month + "" + year + "" + hours + "" + min + "" + sec;



const SCREEN_WIDTH = Dimensions.get('window').width;
export default class FeedCommentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commented: '',
            userName:this.props.navigation.state.params.userName,
            userPic: this.props.navigation.state.params.userPic,
            dater: this.props.navigation.state.params.dater,
            email: this.props.navigation.state.params.email
        };
    }





    postComment = (comment, name, pic) => {
        console.log(this.state.userName, "commented")
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }


        if(this.state.commented == ""){
            alert("type something first")
        } else {

            const ref = firebase.database().ref('/feedComments/' + this.state.dater + "/" + dater).set(
                {
                    commented: this.state.commented,
                    userName: this.state.userName,
                    userPic: this.state.userPic,
                }
            ).then(() => {
                console.log("posted to fb");
            }).catch((error) => {
                console.log("error posting", error)
            });

            this.props.navigation.navigate('FeedPost', {
                pic: this.props.navigation.state.params.pic,
                name: this.props.navigation.state.params.name,
                text: this.props.navigation.state.params.text,
                title: this.props.navigation.state.params.title,
                date: this.props.navigation.state.params.date,
                userName: this.userName,
                userPic: this.state.userPic,
                dater: this.props.navigation.state.params.dater,
                email: this.props.navigation.state.params.email
            });
        }

    }

    componentDidMount() {

    }




    render() {
        return (


            <View style={styles.container}>
                <View>
                    <Image source={{uri: this.props.navigation.state.params.pic}} style={styles.itemPic}/>
                    <Text style={styles.itemName}>{this.props.navigation.state.params.title}</Text>
                    <Image source={{uri: this.props.navigation.state.params.date}} style={{width: (SCREEN_WIDTH), height: 150}}/>
                    <Text style={styles.itemLastMessage}>{this.props.navigation.state.params.text}</Text>

                </View>
                <Form>
                    <Item floatingLabel>
                    <Label> type your comment here... </Label>
                    <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={commented => this.setState({commented})}
                    style={{color:'black'}}
                    />
                    </Item>
                    <Button style={styles.button}
                            onPress={() => this.postComment(this.state.comment, this.state.userName, this.state.userPic)}>
                        <Text style={{color:'white'}}>+</Text>
                    </Button>
                </Form>
            </View>












        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    itemBlock: {
        paddingBottom: 5,
        borderWidth: 0.5,
        // borderColor: '#d6d7da',
    },
    itemBlock2: {
        flexDirection: 'row',
        paddingBottom: 5,
        borderWidth: 0.5,
        // borderColor: '#d6d7da',
    },
    itemImage: {
        width: 150,
        height: 150,
        paddingTop: 5,
        marginLeft:30
    },
    itemPic: {
        width: 80,
        height: 80,
        borderRadius: 25,
        paddingTop: 20
    },
    itemPic2: {
        width: 50,
        height: 50,
        borderRadius: 25,
        paddingTop: 20,
        justifyContent: 'flex-end'
    },
    itemMeta: {
        marginLeft: 40,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop:10,
    },
    itemName: {
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center'
    },
    itemName2: {
        fontSize: 20,
        justifyContent: 'flex-end',
        marginLeft:20,
        marginRight:70,
    },
    itemLastMessage: {
        fontSize: 14,
        color: "#111",
        paddingTop: 10,
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        justifyContent: 'center',
        width: 275,
        marginLeft: 75,
    },
});