import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInSide from "./login/SignInSide";
import Users from './users/Users'
import LM from './learning-material/LearningMaterial';

function App() {
  return (
    <Routes>
    <Route path="/" element={<SignInSide />} />
    <Route path="/users" element={< Users/>} />  
    <Route path="learning-materials" element={<LM/>}/>
  </Routes>
  );
}

export default App;
