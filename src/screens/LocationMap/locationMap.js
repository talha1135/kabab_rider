import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  BackHandler,
  Linking
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, LightBlue, DarkGrey} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const pass="abc12345";

export default class AccountSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
    };
    
  }
      openDialScreen = () => {
        let number = '';
        if (Platform.OS === 'ios') {
        number = 'telprompt:${091123456789}';
        }
        else {
        number = 'tel:${091123456789}'; 
        }
        Linking.openURL(number);
      };

  openGps = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  }

  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // Linking.openURL('sms:'+'033558234');
    // this.openDialScreen();
    // this.openGps(33.58424,73.0314578);
  }

  handleBackPress = () => {
    console.log("Back Press");
    // if (this.props.navigation.isFocused())
      // this.state.backClickCount == 1 ? BackHandler.exitApp() : this.spring();
    // else
      this.props.navigation.goBack(null);
    return true;
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }



  render() {
    return (
      <View style={styles.container}>

        <Text>Maps here</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // paddingTop:80
  },


});