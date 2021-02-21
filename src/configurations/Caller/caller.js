export default class Caller{

  static callServer(route,requestType,params){
    serverPath="http://www.thecodetitan.com/api/";

    var body;
    var url;
    url=serverPath+route;
    if (requestType=="GET") {
      if(params!==null) url=url+'/'+params.join('/');
    } else if (requestType=="POST") {
      console.log(url);
    } else if (requestType=="PUT") {
      console.log(url);
    } else {
      alert("Missing Request type or this request type is not allowed")
    }
    console.log("------------>",url)
  
    var myHeaders = new Headers();



    if(route === "processOrder"){
      body = {
        orderID: params[0],
        managerID: params[1],
      };
    }
    if(route === "orderPicked"){
      body = {
        order_id: params[0],
      };
    }
    if(route === "orderDelivered"){
      body = {
        order_id: params[0],
      };
    }
    if(route === "LoginRider"){
      body = {
        email: params[0],
        password: params[1],
      };
    }
    if(route === "addRider"){
      body = {
        name: params[0],
        email: params[1],
        iqama_number: params[2],
        phone_number: params[4],
        password: params[3],
        branch_id: params[5],
      };
    }

    

    if(
        route === "getNewOrders"||
        route === "getCookedOrders"||
        route === "processOrder"||
        route === "LoginRider"||
        route === "InProgressOrders"||
        route === "orderPicked"||
        route === "orderDelivered"||
        route === "addRider"||
        route === "bookRider"
      )
    {
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append("Accept", "application/json");
    }
    
    
    //console.log("myHeaders values: ", myHeaders);

    console.log("Calling... " + url);
    if (requestType === "POST") {
      
      // console.log("Consoling Body----------------------------->");
      console.log(body);
      return fetch(url, {
        method: requestType,
        headers: myHeaders,

        body: JSON.stringify(body)
      })
      .then(response => {
        // console.log("response---------------->",response)
        return response;
      })
      .catch(err => {
        console.log(err);
      });


    } else {
      console.log('calling',url);
      // url='http://192.168.10.2:8000/api/getAllBranches';
      return fetch(url, {
        method: requestType,
        headers: myHeaders
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      });  


    }

}}