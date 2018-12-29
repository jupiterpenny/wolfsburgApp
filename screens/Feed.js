// import React from 'react';
// import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
//
// import {} from 'react-native-elements'
// import * as firebase from 'firebase';
//
// const firebaseConfig = {
//
// };
//
//
// const SCREEN_WIDTH = Dimensions.get('window').width;
// export default class Feed extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataS: '',
//             holdS: '',
//         };
//     }
//
//
//     getData = () => {
//         var that = this;
//         var hold = [];
//
//         if (!firebase.apps.length) {
//             firebase.initializeApp(config);
//         }
//
//         const ref = firebase.database().ref('/feed/');
//
//         ref.on("value", function(snapshot) {
//             const data = snapshot.val();
//             const keys = Object.keys(data);
//
//             for (var i = 0; i< keys.length; i++) {
//                 var k = keys[i];
//                 var title = data[k].image;
// hold.push(title);
//
//             }
//
//             that.setState({
//                 dataS: data,
//                 holdS: hold,
//             });
//
//
//
//         }, function (error) {
//             console.log("Error: " + error.code);
//         });
//
//
//     }
//
//
//     getItemLayout = (data, index) => (
//     {length:150, offset:150 * index, index}
// )
//
//
//
//     _renderRow(items){
//         return (
//             <TouchableOpacity
//                 onPress={() => this.props.navigation.navigate('View')}>
//                 <Image source={items.item.uri}/>
//
//             </TouchableOpacity>
//         );
//     }
//
//
//     componentDidMount() {
//         this.getData();
//     }
//
//
//
//
//     render() {
//         console.log("render feed state", this.state.holdS);
//         console.log("render feed ended");
//         return (
//             <View style={styles.container}>
//                 <FlatList
//                     data={this.state.holdS}
//                     keyEtractor = {(item,index) => item.id}
//                     renderItem={this._renderRow}
//                     getItemLayout={this.getItemLayout}
//                     />
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff'
//     },
// });
