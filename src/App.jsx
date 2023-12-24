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
      setLoaded(true);
    };

    loadFFmpeg();

    return () => {};
  }, []);

  return (
    <>
      <Nav />
      {loaded ? (
        <main className="flex pb-20 z-10 justify-center items-center">
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
