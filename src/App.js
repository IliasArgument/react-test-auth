import React from 'react';
import 'antd/dist/antd.css';
import HeaderNavigation from './components/Header';
import AppRouter from './components/AppRouter';


const App = () => {

  return (
    <div>
      <HeaderNavigation />
      <div className="site-layout-content">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;