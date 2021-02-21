import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  BackHandler,
  ToastAndroid,
  ImageBackground
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange,LightBlue} from '../../utils/Constants';
import {MyOrders, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {NavigationEvents} from 'react-navigation';

import Caller from "../../configurations/Caller";

const newOrders = [
  {
    order_id:'2',
    location:'shamsabad murre road rwp',
    price:'20',
    billStatus_eng:'pending',
    billStatus_arb:'قيد الانتظار',

  },
  {
    order_id:'3',
    location:'5th avnue',
    price:'30',
    billStatus_eng:'paid',
    billStatus_arb:'دفع',

  }
];
export default class Orders extends Component {

  constructor(props) {
    var lan='';

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            lan=language;
          }
        });
      // console.log(lan);

    super(props);
    this.state = {
      language: 'eng',
      selectedTab:'new',
      newOrders:[],
      inProgress:[],
    };
    
  }



 
  componentDidMount () {
    console.log('did mount');

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });


    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    AsyncStorage.getItem('rider')
      .then(rider=>{
        return JSON.parse(rider);
      })
      .then(rider => {
          
          if(rider != null ){
            // console.log("login rider ",rider);
            Caller.callServer("RiderOrders","GET", [rider.id,rider.branch_id])
              .then( response  => {
                return response.json()
              })
              .then ( data => {
                this.setState({newOrders:data});

                console.log("response-->",data);
              });

            Caller.callServer("InProgressOrders","GET", [rider.id,rider.branch_id])
              .then( response  => {
                return response.json()
              })
              .then ( data => {
                this.setState({inProgress:data});

                console.log("response-->",data);
              });
          }
        });

    


  }

  handleBackPress = () => {
    console.log("Back Press");
    if (this.props.navigation.isFocused())
      this.state.backClickCount == 1 ? BackHandler.exitApp() : this.spring();
    else
      this.props.navigation.goBack(null);
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  spring() {
    this.setState({backClickCount: 1}, () => {
      ToastAndroid.show('Back press twice to exit', ToastAndroid.SHORT);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
  }
 
  renderFields = ({ item, index }) => {
    const id=item.order_id;
    const location=item.location;
    console.log("item ---->",item);
    return (

      <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('OrderDetails',{item,item})}
        style={{
          paddingHorizontal:hp('1%'),
          flexDirection:'row',
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:LightGrey,
          paddingVertical:hp('1%'),
          paddingHorizontal:wp('2%'),
      }}>

        <View style={{
          padding:wp('2%'),
          borderWidth:1,
          borderColor:Grey,
          width:wp('16%'),
          borderRadius:5
        }}>
          <Icon 
            name={"car-hatchback"}
            size={wp('10%')}
            color={LightBlue}
          />
        </View>
        <View>
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>
            <Icon1 
              name={"location-on"}
              size={wp('4.5%')}
              color={Cream}
            />

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.location}
            </Text>
          </View>

          {this.state.language == 'eng' ? 
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>


            <Text 
              style={{color:DarkGrey,
               fontSize:wp('3.5%'),
               textAlign:'center',
               marginLeft:wp('1%'),
               borderRightWidth:1,
               borderColor:LightGrey,
               paddingRight:wp('1%')
             }}>
              Bill Status
            </Text>

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.payment_status}
            </Text>
          </View>
          :
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.billStatus_arb}
            </Text>
            <Text 
              style={{color:DarkGrey,
               fontSize:wp('3.5%'),
               textAlign:'center',
               marginLeft:wp('1%'),
               borderLeftWidth:1,
               borderColor:LightGrey,
               paddingLeft:wp('1%')
             }}>
              حالة الفاتورة
            </Text>

          </View>
          }

        </View>
        <View style={{
          alignSelf:'flex-end',
          flex:1,
          justifyContent:'flex-end',
          alignItems:'flex-end'
        }}> 
          <Text 
            style={{
              color:DarkGrey,
              fontSize:wp('4%')
            }}>
            {item.bill} SR
          </Text>
        </View>
      </TouchableOpacity>

    );
  };
  render() {
    return (
      <View style={styles.container}>
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
          <View style={{
            paddingHorizontal: wp('4%'),
            paddingVertical:wp('2%'),
            borderBottomRightRadius:wp('10%'),
            borderBottomLeftRadius:wp('10%'),
            backgroundColor:LightBlue,
            paddingHorizontal:wp('5%'),
            alignItems:'center',
            marginBottom:hp('2%'),

           }}>
           
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('Account')}}
                  style={{
                    justifyContent:'center',
                    // backgroundColor:'pink',
                    // padding:wp('1%')
                  }}
                >
                  <Icon 
                    style={{alignSelf:'center'}}
                    name={"account"}
                    size={wp('6.5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>
                {this.state.language=="eng" ? 
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} > My Orders </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} > {MyOrders} </Text>

                }

                <TouchableOpacity
                  style={{
                    justifyContent:'center',
                    
                  }}
                >
                  <Icon 
                    style={{alignSelf:'center'}}
                    name={"refresh"}
                    size={wp('6.5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>

            </View>
          </View>
        

        <View style={{flexDirection:'row',marginVertical:hp('1.5%')}}>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'new'})}}

          style={{
            flex:1,
            alignItems:'center',
            paddingVertical:hp('1%'),
            borderBottomWidth:this.state.selectedTab == 'new' ? 3 : 1,
            borderColor:this.state.selectedTab == 'new' ? Blue : Cream
          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>New</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>جديد</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'progress'})}}

          style={{
            flex:1,
            alignItems:'center',
            paddingVertical:hp('1%'),
            borderBottomWidth:this.state.selectedTab == 'progress' ? 3 : 1,
            borderColor:this.state.selectedTab == 'progress' ? Blue : Cream

          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>In Progress</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>في تقدم</Text>
            }
          </TouchableOpacity>

         

        </View>
      
        <ScrollView style={{}}>

          <ImageBackground
            imageStyle={{width:wp('75%'),height:hp('40%'),alignSelf:'center',marginHorizontal:wp('12.5%'),marginVertical:hp('15%'),opacity:0.05}}
            source={require('../../images/icons/logo.png')}
            style={{width:wp('100%'),height:hp('100%')}}
          >
            <FlatList
              data={this.state.selectedTab == 'new' ? this.state.newOrders : this.state.inProgress}
              extraData={this.state}
              keyExtracstor={(item, index) => `${index}`}
              renderItem={this.renderFields}
              ItemSeparatorComponent={() => {
                return ( <View style={{ marginVertical: hp('2%')}} /> )
              }}
            />
          </ImageBackground>
        </ScrollView>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'

  },

})