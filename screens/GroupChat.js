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



const SCREEN_WIDTH = Dimensions.get('window').width;
export default class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.navigation.state.params.userName,
            userPic: this.props.navigation.state.params.userPic,
            dataS: '',
            commented: '',
        };
    }


    getData = () => {
        var that = this;
        var hold = [];



        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }



        const ref = firebase.database().ref('/allComments/');

        ref.on("value", function(snapshot) {
            const data = snapshot.val();
            Object.keys(data).map ( (key, index) => {
                hold.push(data[key]);
            })


            that.setState({
                dataS: hold,
            });

        }, function (error) {
            console.log("Error: " + error.code);
        });


    }


    postComment = (comment) => {

        const date = new Date().getDate();
        const month = new Date().getMonth() +1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        const dater =  date + "" + month + "" + year + "" + hours + "" + min + "" + sec;







        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }

        if(this.state.commented == ""){
            alert("type something first")
        } else {



            const ref = firebase.database().ref('/allComments/' + dater).set(
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


            this.props.navigation.replace('GroupChat', {
                userName: this.state.userName,
                userPic: this.state.userPic,
            });
        }
    }

    componentDidMount() {
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }

        const ref =firebase.database().ref('/allComments/' + "271220182419").set(
            {
                commented:"....comments",
                userName: "VMS",
                userPic: "",
            }
        )





        this.getData();
    }



    renderItem(data) {
        let { item, index } = data;

        return (
            <View style={styles.itemBlock2}>
                <Image source={{uri: item.userPic}} style={styles.itemPic2}/>
                <View style={styles.itemMeta}>
                    <Text style={styles.itemName2}>{item.commented}</Text>
                </View>
            </View>
        )
    }


    render() {
        console.log("render GroupComment state");
        console.log("render GroupComment ended");
        return (


            <View style={styles.container}>
                <View style={styles.row}>
                    <Image source={{uri: this.props.navigation.state.params.userPic}} style={styles.itemPic}/>
                    <Image source={{uri: "https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-9/10426523_867389176627316_7322801437311008782_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpa1-2.fna&oh=5da1d37c01e46805de4d74b40eb611bc&oe=5C8AEE95"}} style={styles.itemPic}/>
                </View>
                <View>
                    <Form>
                        <Item floatingLabel>
                            <Label> Type your message... </Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={commented => this.setState({commented})}
                                style={{color:'black'}}
                            />
                        </Item>
                        <Button style={styles.button}
                                rounded
                                onPress={()=> this.postComment('commented')} >
                            <Text style={{color:'white'}}>+</Text>
                        </Button>
                    </Form>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.dataS}

                    renderItem={this.renderItem.bind(this)}
                />



            </View>












        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center'
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
        width: 30,
        height: 30,
        borderRadius: 25,
        paddingTop: 20
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
        borderRadius: 100,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 5,
        textAlign:'center',
        justifyContent: 'center',
        marginLeft: 300
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center'
    }
});