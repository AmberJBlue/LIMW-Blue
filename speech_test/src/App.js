import React from 'react';
import Tabs from "./components/Tabs";
import { animationOne, sphere } from './components/animations';
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
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <div>
      <h1>Speech-to-text Demo</h1>
      <Tabs>
        <div label="Animation 1">
        {console.log(transcript  ? interim = transcript : interim = "Say something positive.")}
        {interim.toString()}
        <ReactP5Wrapper sketch={sphere} text={interim.toString()} />
        </div>
        <div label="Animation 2">
        <p>{interim}</p>
        </div>
        <div label="Animation 3">
          <p>{interim}</p>
        </div>
      </Tabs>
    </div>
    </div>
  );
};

export default App;
