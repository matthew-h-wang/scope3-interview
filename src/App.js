import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Display from './Display.js'

function App() {
  const [format, setFormat] = useState("banner");
  const [params, setParams] = useState(null);

  return (
    <div className="App">
      <form onSubmit={ (e) => {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(data.entries());
        console.log(formObject)
        setParams(formObject);
      }
      }>
          <select name="format" onChange={ (e) => setFormat(e.target.value)}>
            <option value="banner" default>Banner</option>
            <option value="video">Video</option>
            <option value="text">Text</option>
            <option value="audio">Audio</option>
          </select>

        {
          (format === "banner" || format === "video")
          && 
          <>
          <label htmlFor="payloadSize">Payload Size (bytes) </label>
          <input name="payloadSize" type="number" min="0" defaultValue={150000}/>
          </>
        }

        <button type="submit">Submit </button>
      </form>
      { params && <Display params={params}/>}
      
    </div>
  );
}

export default App;
