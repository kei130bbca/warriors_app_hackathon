import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TemplatePage from './pages/TemplatePage';
import InfluencerPersonal from './pages/InfluencerPersonal';
import ReviewManagementPage from './pages/ReviewManagementPage';
import ReviewPostingPage from './pages/ReviewPostingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/template-page">
        <TemplatePage />
      </Route>
      <Route path="/influencerpersonal">
        <InfluencerPersonal />
      </Route>
      <Route path="/review-management">
        <ReviewManagementPage />
      </Route>
      <Route path="/review-posting/:id">
        <ReviewPostingPage />
      </Route>
    </BrowserRouter>
  );
}

export default App;
