import React from 'react';
import Tabs from "./components/Tabs";
import { 
  animationOne,
  sphere,
  bounce,
  displayText,
  run,
  particles
 } from './components/animations';
import { ReactP5Wrapper } from "react-p5-wrapper";
import "./App.css";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App  = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  let interim 

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (

    <div>
      <p>Microphone Status: {listening ? <span className="dot-red"></span> : <span className="dot"></span>}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <div>
      <h1>Speech-to-text Demo</h1>
      <span>Speech Input: </span>{transcript  ? interim = transcript : interim = "Say something positive."}
      <Tabs>
        <div label="Particles">
          {interim.toString()}
          <ReactP5Wrapper sketch={particles} text={interim.toString()} />
        </div>
        <div label="Run">
        {interim.toString()}
        <ReactP5Wrapper sketch={run} text={interim.toString()} />
        </div>
        <div label="Sphere">
        <ReactP5Wrapper sketch={sphere} text={interim.toString()} />
        </div>
        <div label="Font Samples">
        <ReactP5Wrapper sketch={displayText} text={interim.toString()} />
        </div>
      </Tabs>
    </div>
    </div>
  );
};

export default App;
