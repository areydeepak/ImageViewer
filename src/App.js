import { useState } from "react";
import Viewer from "./component/viewer";

function App() {
  const[zoom,setZoom]=useState(9);

  return (
    <div className="App">
      <Viewer zoom={zoom} setzoom={setZoom}/>
    </div>
  );
}

export default App;
