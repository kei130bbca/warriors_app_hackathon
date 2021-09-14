import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TemplatePage from './pages/TemplatePage';

function App() {
  return (
    <BrowserRouter>
    <Route exact path="/">
      <MainPage />
    </Route>
    <Route path="/template-page">
      <TemplatePage />
    </Route>
    </BrowserRouter>
  );
}

export default App;
