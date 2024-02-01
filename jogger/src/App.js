import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInSide from "./login/SignInSide";

function App() {
  return (
    <Routes>
    <Route path="/" element={<SignInSide />} />
  </Routes>
  );
}

export default App;
