import React, { useEffect } from "react";
// import JSMpeg from "jsmpeg-player";
import Script from "next/script";

function PoolStream() {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     var videoUrl = "ws://localhost:9999/";
  //     var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
  //       autoplay: true,
  //     });
  //     console.log(player);
  //   }
  // }, []);

  return (
    <>
      <canvas id="stream-canvas"></canvas>
      <Script src="jsmpeg.min.js" id="jsmpeg"></Script>
    </>
  );
}

export default PoolStream;
