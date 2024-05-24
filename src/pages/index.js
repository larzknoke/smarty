import { Inter } from "next/font/google";
import { socketConnection, connectSocket } from "@/lib/socketConnection";
import { useEffect, useState } from "react";

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
        [
          "shelly.0.SHEM-3#E8DB84D68ECE#1.uptime",
          "0_userdata.0.Pool.BayrolTemp",
        ],
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
      </main>
    </>
  );
}
