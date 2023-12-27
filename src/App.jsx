import { useEffect, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { toBlobURL } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Routes, Route } from "react-router-dom";
import VideoConverterPage from "./pages/VideoConverterPage";
import ImageConverter from "./pages/ImageConverter";
import Home from "./pages/Home";
import AudioConverter from "./pages/AudioConverter";
import VideoCompression from "./pages/VideoCompression";
import ImageCompression from "./pages/ImageCompression";
import AudioCompression from "./pages/AudioCompression";
import GifToVideo from "./pages/GifToVideo";
import SplitAudio from "./pages/SplitAudio";
import SplitVideos from "./pages/SplitVideos";
import AutomaticSplit from "./pages/AutomaticSplit";
function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/esm";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      ffmpeg.kill = () => {
        ffmpeg.terminate();
      };
      setLoaded(true);
    };

    loadFFmpeg();
  }, []);

  return (
    <>
      <Nav />
      {loaded ? (
        <main className="flex pb-20 z-10 justify-center items-center ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/video"
              element={<VideoConverterPage ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/image"
              element={<ImageConverter ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/audio"
              element={<AudioConverter ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/audio/compression"
              element={
                <AudioCompression loaded={loaded} ffmpegRef={ffmpegRef} />
              }
            />
            <Route
              path="/video/compression"
              element={<VideoCompression ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/image/compression"
              element={<ImageCompression ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/image/compression"
              element={<ImageCompression ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/video/gif"
              element={<GifToVideo ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/gif/video"
              element={<GifToVideo ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/audio/split"
              element={<SplitAudio ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/video/split"
              element={<SplitVideos ffmpegRef={ffmpegRef} />}
            />
            <Route
              path="/automatic-audio/split"
              element={<AutomaticSplit ffmpegRef={ffmpegRef} />}
            />
          </Routes>
        </main>
      ) : (
        <p>Loadding...</p>
      )}
      <Footer />
    </>
  );
}

export default App;
