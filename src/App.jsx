import "./App.css";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import VideoConverterPage from "./pages/VideoConverterPage";

function App() {
  return (
    <>
      <Nav />
      <main className="flex pb-20 z-10 justify-center items-center">
        <VideoConverterPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
