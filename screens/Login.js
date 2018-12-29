import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';

import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAy5mh_G4mEGCE9hF6JBNEMwxu2UXtI_Fo",
    authDomain: "wolffeed-66182.firebaseapp.com",
    databaseURL: "https://wolffeed-66182.firebaseio.com",
    projectId: "wolffeed-66182",
    storageBucket: "wolffeed-66182.appspot.com",
    messagingSenderId: "780054496404"
};

firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class Login extends React.Component {


    constructor(props){
        super(props)

        this.state = ({
            email: '',
            password: ''
        })
    }


    loginUser = (email, password) => {


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.replace('Profile', {
                    email: email
                });
            })
            .catch(() =>{
                alert("no go away")
                this.props.navigation.replace('Login')


            })
    }




    render() {
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 9 / 16);
        const imageWidth = dimensions.width;
        return (

            <Container style={styles.container}>
                <ScrollView>
                <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>Wolfsburg Motor Sports</Text>

                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            style={{color: 'white'}}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            style={{color: 'white'}}
                        />
                    </Item>

                    <Button style={styles.button}
                            full
                            rounded
                            success
                            onPress={() => this.loginUser(this.state.email.trim(), this.state.password, this.props.navigation)}

                    >

                        <Text style={{color: 'white'}}> Login</Text>

                    </Button>
                </Form>
                <Image source = {require('../images/turbo.jpg')} style={{width: imageWidth-20, height: imageHeight, borderRadius: 40, paddingLeft: 20, paddingTop: 20, marginTop: 30}}/>
                </ScrollView>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        padding:10
    },
    button: {
        marginTop:30
    }
});

