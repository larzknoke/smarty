import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { socketConnection, connectSocket } from "@/lib/socketConnection";
import { useEffect, useState } from "react";
import Tasks from "@/components/Tasks";
import Login from "@/components/Login";
import MainContent from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [uptime, setUptime] = useState(0);
  const [socket, setSocket] = useState();

  async function setConnection() {
    const connection = await connectSocket(socketConnection);
    setSocket(connection);
  }

  useEffect(() => {
    setConnection();
  }, []);

  useEffect(() => {
    if (socket?.isConnected) {
      socket?.subscribeState(
        "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
        (id, state) => {
          console.log("change", state);
          setUptime(state.val);
        }
      );
    }

    return () =>
      socket?.unsubscribeState("shelly.0.SHEM-3#E8DB84D68ECE#1.uptime");
  }, [socket]);

  return (
    <>
      <p>Index</p>
      <main className="p-4">
        <p>{uptime}</p>
        {/* <p>{JSON.stringify(socket?.connected)}</p>
        <hr my={6} />
        <Tasks />
        <hr my={6} />
        <Login /> */}
      </main>
    </>
  );
}
