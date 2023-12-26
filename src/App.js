import { useState } from "react";
import Viewer from "./component/viewer";
import TifImage from "./component/image";

function App() {
  const[zoom,setZoom]=useState(9);

  return (
    <div className="App">
      {/* <Viewer zoom={zoom} setzoom={setZoom}/> */}
      <TifImage/>
    </div>
  );
}

export default App;
