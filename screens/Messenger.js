import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import {Button, Header} from 'react-native-elements';

import {} from 'react-native-elements'
import * as firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;

const firebaseConfig = {

};

const hold =  [
    {
       "name": "",
        "pic": "",
        "email": 'wolfsburgmotorsports@gmail.com'
    },
];

export default class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataS: '',
            holdS: '',
            userName: this.props.navigation.state.params.userName,
            userPic: this.props.navigation.state.params.userPic
        };
    }


    getData = () => {
        var that = this;


        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const ref = firebase.database().ref('/users/');

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

check = (name, pic) =>{
        if (this.state.userName == name || name == ""){
            alert("N/A")
        } else {
            this.props.navigation.navigate('MessageFriendComments', {
                userName: this.state.userName,
                userPic: this.state.userPic,
                toName: name,
                toPic: pic
            });
        }
}

    renderItem(data) {
        let { item, index } = data;
        return (
            <View style={styles.itemBlock}>
                <Image source={{uri: item.pic}} style={styles.itemPic}/>
                <View style={styles.itemMeta}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.check(item.name, item.pic)}>
                            <Text style={styles.button}>IM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    componentDidMount() {
        this.getData();
    }




    render() {
        console.log("render feed state", this.state.dataS);
        console.log("render feed ended");

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

                <View>

                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.dataS}
                    renderItem={this.renderItem.bind(this)}
                />
                <Header
                    leftComponent={{ icon: 'group', color: '#fff', size: 25,   onPress: () => this.props.navigation.navigate('GroupChat', {
                            userName: this.props.navigation.state.params.userName,
                            userPic: this.props.navigation.state.params.userPic

                        })

                    }}
                    backgroundColor = "black"
                    rightComponent={{ icon: 'group', color: '#fff', size: 25,   onPress: () => this.props.navigation.navigate('GroupChat', {
                            userName: this.props.navigation.state.params.userName,
                            userPic: this.props.navigation.state.params.userPic

                        })

                    }}
                    centerComponent={{ text: 'IM All Members', style: { color: '#fff', fontSize: 25 } }}

                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemBlock: {
        flexDirection: 'row',
        paddingBottom: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    itemImage: {
        width: 150,
        height: 150,
        paddingTop: 5,
    },
    itemPic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        paddingTop: 20,
    },
    itemMeta: {
        marginLeft: 10,
        justifyContent: 'center',
        paddingTop:10
    },
    itemName: {
        fontSize: 20,
        justifyContent: 'center',
        marginLeft:20,
        marginRight:70
    },
    itemLastMessage: {
        fontSize: 14,
        color: "#111",
        marginLeft:20,
        marginRight:90,
        paddingTop: 10,
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
        marginLeft: 15
    },
});