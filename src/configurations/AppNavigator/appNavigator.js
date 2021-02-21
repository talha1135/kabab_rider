import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// import SignUp from '../../auth/SignUp';
import Login from '../../auth/Login';
import SignUp from '../../auth/SignUp';
import MyOrders from '../../screens/MyOrders';
import OrderDetails from '../../screens/OrderDetails';
import Account from '../../screens/Account';
import AccountSettings from '../../screens/AccountSettings';
import ChangePassword from '../../screens/ChangePassword';
import LocationMap from '../../screens/LocationMap';
import Splash from '../../screens/Splash';



const AppContainer = createStackNavigator(
  {
    // Login:Login,
    Splash: Splash,
    // LocationMap:LocationMap,

    MyOrders:MyOrders,
    
    AccountSettings:AccountSettings,
    ChangePassword:ChangePassword,
    Account:Account,


    OrderDetails:OrderDetails,
    SignUp: SignUp,
    Login:Login,
    
    
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const AppNavigator = createAppContainer(AppContainer);

export default AppNavigator;