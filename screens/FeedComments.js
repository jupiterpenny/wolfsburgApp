import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';


import * as firebase from 'firebase';
import {Form, Input, Item, Button, Label } from 'native-base'
import {Header} from "react-native-elements";

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
export default class FeedComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commented: '',
            userName:this.props.navigation.state.params.userName,
            userPic: this.props.navigation.state.params.userPic,
            dataS: '',
            holdS: ''
        };
    }


    getData = () => {
        var that = this;
        var hold = [];

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const ref = firebase.database().ref('/feedComments/' + this.props.navigation.state.params.dater);





        ref.on("value", function(snapshot) {
            const data = snapshot.val();


            var count = 0;
            for (var k in data) if (data.hasOwnProperty(k)) count++;


            if (count + 1 > hold.length) {
                Object.keys(data).map((key, index) => {
                    hold.push(data[key]);
                })
            }

            that.setState({
                dataS: hold
            });

        }, function (error) {
            console.log("Error: " + error.code);
        });


    }


    postComment = (comment) => {
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }

        const ref=firebase.database().ref('/feedComments/' + this.props.navigation.state.params.dater +"/" + dater).set(
            {
                commented:this.state.commented,
                userName: this.state.userName,
                userPic: this.state.userPic,
            }
        )

        this.props.navigation.replace('FeedComments', {
            pic: this.props.navigation.state.params.pic,
            name: this.props.navigation.state.params.name,
            text: this.props.navigation.state.params.text,
            title: this.props.navigation.state.params.title,
            date: this.props.navigation.state.params.date,
            userName: this.state.userName,
            userPic: this.state.userPic,
            dater: this.props.navigation.state.params.dater
        });

    }

    componentDidMount() {
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }

        const ref=firebase.database().ref('/feedComments/' + this.props.navigation.state.params.dater +"/27122018123941" ).set(
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
        console.log("render feedComment state", this.state.dataS);
        console.log("render feedComment ended");
        return (


            <View style={styles.container}>
                <View>
                    <Header
                        backgroundColor = "black"
                        rightComponent={{ icon: 'home', color: '#fff',   onPress: () => this.props.navigation.replace('Profile', {
                                email: this.props.navigation.state.params.email,
                                name: this.props.navigation.state.params.userName,
                                pic: this.props.navigation.state.params.userPic

                            })

                        }}
                        centerComponent={{ text: 'Wolfsburg MotorSports', style: { color: '#fff', fontSize: 25 } }}

                    />
                </View>

                <Image source={{uri: this.props.navigation.state.params.pic}} style={styles.itemPic}/>
                <Text style={styles.itemName}>{this.props.navigation.state.params.title}</Text>
                <Image source={{uri: this.props.navigation.state.params.date}} style={{width: (SCREEN_WIDTH), height: 150}}/>
                <Text style={styles.itemLastMessage}>{this.props.navigation.state.params.text}</Text>
                <View>
                    <Form>
                        {/*<Item floatingLabel>*/}
                        {/*<Label> type your comment here... </Label>*/}
                        {/*<Input*/}
                        {/*autoCorrect={false}*/}
                        {/*autoCapitalize="none"*/}
                        {/*onChangeText={commented => this.setState({commented})}*/}
                        {/*style={{color:'black'}}*/}
                        {/*/>*/}
                        {/*</Item>*/}
                        <Button style={styles.button}
                                rounded
                                onPress={()=> this.props.navigation.navigate('FeedCommentType', {
                                    pic: this.props.navigation.state.params.pic,
                                    name: this.props.navigation.state.params.name,
                                    text: this.props.navigation.state.params.text,
                                    title: this.props.navigation.state.params.title,
                                    date: this.props.navigation.state.params.date,
                                    userName: this.state.userName,
                                    userPic: this.state.userPic,
                                    dater: this.props.navigation.state.params.dater
                                })} >
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
        borderRadius: 100,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 5,
        textAlign:'center',
        justifyContent: 'center',
        marginLeft: 20
    },
});