import { Inter } from "next/font/google";
import Header from "@/components/header";
import {
  Connection,
  EmitEventHandler,
  ListenEventHandler,
  AdminConnection,
} from "@iobroker/socket-client";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function connectSocket(connection) {
    await connection.startSocket();
    await connection.waitForFirstConnection();
    // console.log(connection);
    let states = await connection.getStates(
      "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime"
    );
    // console.log("states", states);

    await connection.subscribeState(
      "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
      true,
      (data) => console.log("subscribe", data)
    );
    let state = await connection.getState(
      "shelly.0.SHEM-3#E8DB84D68ECE#1.hostname"
    );
    console.log("getState", state);
    // let hosts = await connection.getHosts();
    // let users = await connection.getUsers();
    // let object = await connection.getObject(
    //   "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime"
    // );
    // console.log("hosts", hosts);
    // console.log("users", users);
    // console.log("object", object);
  }

  useEffect(() => {
    const adminConnection = new Connection({
      protocol: "ws",
      host: "10.10.10.3",
      port: 8082,
      admin5only: false,
      autoSubscribes: [
        "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
        "shelly.0.SHEM-3#E8DB84D68ECE#1.hostname",
      ],
      doNotLoadAllObjects: false,
      autoSubscribeLog: true,
      // optional: other options
    });
    // console.log(adminConnection);

    connectSocket(adminConnection);
    // console.log(adminConnection);
    // adminConnection.waitForFirstConnection();
    // and use it
  }, []);

  return (
    <>
      <Header />
      <main>
        FOO
        <p>bar</p>
      </main>
    </>
  );
}
