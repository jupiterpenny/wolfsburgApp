import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Login from './screens/Login';
import Profile from './screens/Profile';
import Home from './screens/Home';
import FeedComments from './screens/FeedComments';
import Post from './screens/Post';
import FeedPost from './screens/FeedPost';
import Messenger from './screens/Messenger';
import FeedCommentType from './screens/FeedCommentType';
import MessageFriendComments from './screens/MessageFriendComments';
import GroupChat from './screens/GroupChat';

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Login: Login,
    Home: Home,
    Profile: Profile,
    FeedComments: FeedComments,
    Post: Post,
    FeedPost: FeedPost,
    Messenger: Messenger,
    FeedCommentType: FeedCommentType,
    MessageFriendComments: MessageFriendComments,
    GroupChat: GroupChat




})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
