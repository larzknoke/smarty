import { Inter } from "next/font/google";
import Header from "@/components/header";
import {
  Connection,
  EmitEventHandler,
  ListenEventHandler,
  AdminConnection,
} from "@iobroker/socket-client";
import { useEffect, useState } from "react";
import Tasks from "@/components/Tasks";
import Login from "@/components/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [uptime, setUptime] = useState(0);
  const [socket, setSocket] = useState();

  async function connectSocket(connection) {
    await connection.startSocket();
    await connection.waitForFirstConnection();
    // await connection.subscribeState(
    //   "shelly.0.shellypro3em#0cb815fc3c84#1.uptime", //    "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
    //   (id, state) => {
    //     console.log("change", state);
    //     setUptime(state.val);
    //   }
    // );
    setSocket(connection);
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

  useEffect(() => {
    const socketConnection = new Connection({
      protocol: "ws",
      host: "10.10.10.3",
      port: 8082,
      // host: "colorserver2019.colorplus.de",
      // port: 8084,
      admin5only: false,
      // autoSubscribes: [],
      // doNotLoadAllObjects: false,
      // autoSubscribeLog: true,
    });

    connectSocket(socketConnection);
  }, []);

  useEffect(() => {
    socket?.subscribeState(
      "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
      (id, state) => {
        console.log("change", state);
        setUptime(state.val);
      }
    );
  }, [socket?.isConnected]);

  return (
    <>
      <Header />
      <main className="p-4">
        <p>{uptime}</p>
        <p>{JSON.stringify(socket?.connected)}</p>
        <hr my={6} />
        <Tasks />
        <hr my={6} />
        <Login />
      </main>
    </>
  );
}
