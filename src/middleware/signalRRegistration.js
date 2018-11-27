import {
  HubConnection,
  TransportType,
  ConsoleLogger,
  LogLevel,
  IConnection,
  IHubConnectionOptions
} from "@aspnet/signalr";
import { authToken } from "../helpers";
import config from "config";
const signalR = require("@aspnet/signalr");

export function signalRRegistration(store) {
  let connection = new signalR.HubConnectionBuilder()
    .withUrl(`${config.apiUrl}/chatHub`, {
      // accessTokenFactory: () => {return authHeader()}
      accessTokenFactory: () => authToken()
    })
    .build();

  if (authToken() != undefined) {
    connection.start().then(e => {
      // isOnline(124);
      // let asd = connection;
      // connection
      //   .then(e => {
      //     isOnline(124);
      //     // debugger;
      //   })
      //   .catch(err => {
      //     // console.error(err, "red");
      //     // debugger;
      //   });
    });
  }

  function isOnline(message) {
    connection
      .invoke("IsOnline", message)
      .catch(err => {
        console.error(err, "red");
        // debugger;
      })
      .then(e => {
        debugger;
      });
  }

  // sendMessage("daggot");
  // sendMessage1("daggot1");
  // debugger
  // for (let index = 0; index < 5; index++) {
  //   debugger
  //   sendMessage1("daggot1");
  // }
  // debugger;
  // })
  // .catch(e => {
  //   console.warn("signalR Error: ".red + e.message);
  //   // console.log("Could not connect");
  //   // debugger;
  // });

  connection.on("SendAction", data => {
    // debugger;
    console.log("Now connected, connection ID=" + connection.id);
  });

  connection.on("MessageSend", message => {
    debugger;
    console.log(`From ${userId} to ${userId2} : "${message}".`);
  });

  function sendMessage(message) {
    connection.invoke("AddMessage", message).catch(err => {
      console.error(err, "red");
      // debugger;
    });
  }

  function sendMessage1(message) {
    connection.invoke("AddMessage1", message).catch(err => {
      console.error(err, "red");
      // debugger;
    });
  }

  //   // getting the hub proxy
  //   var notificationHubProxy = signalRConnection.createHubProxy(
  //     "signalRNotificationHub"
  //   );

  //   // attaching events listeners to the proxy
  //   notificationHubProxy.on("locationModified", function(vehicleId, location) {
  //     store.dispatch({
  //       type: "LOCATION_MODIFIED",
  //       payload: {
  //         vehicleId: vehicleId,
  //         location: location
  //       }
  //     });
  //   });
}

// hubConnection.start().then(e => {
//   debugger;
//   hubConnection.Connected = true;
// });

// hubConnection.onclose(e => {
//   debugger;
//   hubConnection.Connected = true;
// });

// connection.start().then(() => connection.invoke("send", "Hello"));

// const hubConnection = new signalR.HubConnectionBuilder()
//   .withUrl(hubUrl)
//   .build();
// debugger;

// debugger;
// // require('signalr-client-react');
// let signalr = require("@aspnet/signalr");
// debugger;
// var transport = TransportType.WebSockets;
// let logger = new ConsoleLogger(LogLevel.Information);

// let options = {
//   transport: transport,
//   logger: logger
// };
// const signalRConnection = signalr.HubConnection("http://localhost:5000");
// // const signalRConnection = HubConnection('http://localhost:5000');
// import $ from "jquery";
// window.jQuery = $;
// debugger;
// // const signalRConnection = $.hubConnection('http://localhost:5000');

// export function signalRRegistration(store) {
//   signalRConnection
//     .start()
//     .done(function() {
//       console.log("Now connected, connection ID=" + signalRConnection.id);
//     })
//     .fail(function() {
//       console.log("Could not connect");
//       window.alert("Unable to start signalR connection...");
//     });

//   // getting the hub proxy
//   var notificationHubProxy = signalRConnection.createHubProxy(
//     "signalRNotificationHub"
//   );

//   // attaching events listeners to the proxy
//   notificationHubProxy.on("locationModified", function(vehicleId, location) {
//     store.dispatch({
//       type: "LOCATION_MODIFIED",
//       payload: {
//         vehicleId: vehicleId,
//         location: location
//       }
//     });
//   });
// }
///////////////////////////////////////////////////////////////////////////////////////////
// class ChatWebsocketService {
//     private _connection: HubConnection;

//     constructor() {
//         var transport = TransportType.WebSockets;
//         let logger = new ConsoleLogger(LogLevel.Information);

//         let options: IHubConnectionOptions = {
//             transport: transport,
//             logger:logger
//         };
//         let url: string = `http://${document.location.host}/chat`;

//         // create Connection
//         this._connection = new HubConnection(
//             url,
//             options);
//         // start connection
//         this._connection.start().catch(err => console.error(err, 'red'));
//     }

//     registerMessageAdded(messageAdded: (msg: ChatMessage) => void) {
//         // get nre chat message from the server
//         this._connection.on('MessageAdded', (message: ChatMessage) => {
//             messageAdded(message);
//         });
//     }
//     sendMessage(message: string) {
//         // send the chat message to the server
//         this._connection.invoke('AddMessage', message);
//     }

//     registerUserLoggedOn(userLoggedOn: (user: User) => void) {
//         // get new user from the server
//         this._connection.on('UserLoggedOn', (user: User) => {
//             userLoggedOn(user);
//         });
//     }
// }

// const WebsocketService = new ChatWebsocketService();

// export default WebsocketService;
