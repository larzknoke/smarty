import { Connection } from "@iobroker/socket-client";

export const socketConnection = new Connection({
  protocol: "ws",
  host: process.env.NEXT_PUBLIC_SOCKET_URL,
  port: process.env.NEXT_PUBLIC_SOCKET_PORT,
  admin5only: false,
  // autoSubscribes: [],
  // doNotLoadAllObjects: false,
  // autoSubscribeLog: true,
});

export async function connectSocket(connection) {
  await connection.startSocket();
  await connection.waitForFirstConnection();
  return connection;
  // await connection.subscribeState(
  //   "shelly.0.shellypro3em#0cb815fc3c84#1.uptime", //    "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
  //   (id, state) => {
  //     console.log("change", state);
  //     setUptime(state.val);
  //   }
  // );
  // return await connection;
  // setSocket(connection);
  // let states = await connection.getStates(
  //   "shelly.0.shellypro3em#0cb815fc3c84#1.uptime"
  // );
  // await connection.subscribeState(
  //   "shelly.0.shellypro3em#0cb815fc3c84#1.uptime",
  //   (id, state) => {
  //     console.log("change", state);
  //     setUptime(state.val);
  //   }
  // );
  // let state = await connection.getState(
  //   "shelly.0.shellypro3em#0cb815fc3c84#1.hostname"
  // );
  // console.log("getState", state);
  // let hosts = await connection.getHosts();
  // let users = await connection.getUsers();
  // let object = await connection.getObject(
  //   "shelly.0.shellypro3em#0cb815fc3c84#1.uptime"
  // );
  // console.log("hosts", hosts);
  // console.log("users", users);
  // console.log("object", object);
}
