import React, { useEffect } from "react";
// import JSMpeg from "jsmpeg-player";
import Script from "next/script";
import { useScript } from "@uidotdev/usehooks";
import { Spinner } from "@chakra-ui/react";

function PoolStream() {
  const status = useScript(`jsmpeg.min.js`, {
    removeOnUnmount: true,
  });

  return (
    <>
      <canvas id="stream-canvas"></canvas>
    </>
  );
}

export default PoolStream;
