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
    "date": "https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-9/39327714_2041317522587077_2432725302439313408_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpa1-2.fna&oh=1b92e54092b254b3c62924fdb9dcf58c&oe=5CCBA5C6",
    "name": "Wolfsburg MotorSports",
    "text": "Racing makes Heroin addiciton look like a vague wish for something salty.",
    "title": "Wolfsburg MotorSports",
    "pic": "https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-9/10426523_867389176627316_7322801437311008782_n.jpg?_nc_cat=100&_nc_ht=scontent.ftpa1-2.fna&oh=5da1d37c01e46805de4d74b40eb611bc&oe=5C8AEE95",
     "dater": '01012019122458'
},
];

export default class FeedPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataS: '',
            holdS: '',
            userName: this.props.navigation.state.params.name,
            userPic: this.props.navigation.state.params.pic,
            lengthS: '',
            email: this.props.navigation.state.params.email
        };
    }


    getData = () => {
        var that = this;


        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }


            const ref = firebase.database().ref('/feed/');

            ref.on("value", function (snapshot) {
                const data = snapshot.val();


                var count = 0;
                for (var k in data) if (data.hasOwnProperty(k)) count++;


                if (count + 1 > hold.length) {
                    Object.keys(data).map((key, index) => {
                        hold.push(data[key]);
                    })
                }

                    that.setState({
                        dataS: hold,
                        lengthS: count + 1
                    });


            }, function (error) {
                console.log("Error: " + error.code);
            });

        }





    renderItem(data) {
        let { item, index } = data;
        console.log(this.state.lengthS, "lengthS")
        return (
            <View style={styles.itemBlock}>
                <Image source={{uri: item.pic}} style={styles.itemPic}/>
                <View style={styles.itemMeta}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Image source={{uri: item.date}} style={{width: (SCREEN_WIDTH - 100), height: 150}}/>
                    <Text style={styles.itemLastMessage}>{item.text}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.replace('FeedComments',{
                            pic: item.pic,
                            name: item.name,
                            text: item.text,
                            title: item.title,
                            date: item.date,
                            userName: this.state.userName,
                            userPic: this.state.userPic,
                            dater: item.dater,
                            email: this.props.navigation.state.params.email
                            }
                            )}
                        >
                            <Text style={styles.button}>Comment!</Text>
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
                <Header
                    backgroundColor = "black"
                    leftComponent={{ icon: 'camera', color: '#fff',   onPress: () => this.props.navigation.replace('Post', {
                            email: this.props.navigation.state.params.email,
                            userName: this.props.navigation.state.params.userName,
                            userPic: this.props.navigation.state.params.userPic
                        })

                    }}
                    rightComponent={{ icon: 'home', color: '#fff',   onPress: () => this.props.navigation.replace('Profile', {
                            email: this.props.navigation.state.params.email,
                            userName: this.props.navigation.state.params.userName,
                            userPic: this.props.navigation.state.params.userPic
                        })

                    }}
                    centerComponent={{ text: 'Wolfsburg MotorSports', style: { color: '#fff', fontSize: 25 } }}

                />
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
        flex: 1
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