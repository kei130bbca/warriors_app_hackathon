import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TemplatePage from './pages/TemplatePage';
import InfluencerPersonal from './pages/InfluencerPersonal'

function App() {
  return (
    <BrowserRouter>
    <Route exact path="/">
      <MainPage />
    </Route>
    <Route path="/template-page">
      <TemplatePage />
    </Route>
    <Route path="/influencerpersonal" component = {InfluencerPersonal} >
      <InfluencerPersonal />
    </Route>
    </BrowserRouter>
  );
}

export default App;
