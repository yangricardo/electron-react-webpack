import React from 'react';
// import './index.css';
// import Title from './web/Title';

// const App = ({ title }) => <Title title={title} />;

import Header from './web/components/Header';
import './styles.css';
import Routes from './web/routes';

const App = () => (
  <div className='App'>
    <Header />
    <Routes />
  </div>
);

export default App;
