import React, { useContext } from 'react';
import GlobalStoreProvider, { GlobalStore } from './context/GlobalStore';
import Wrapper from './layout/Wrapper';


function App() {
  const ctx = useContext(GlobalStore)
  return (
    <main>
      <GlobalStoreProvider>
        <Wrapper />
      </GlobalStoreProvider>
    </main>
  );
}

export default App;
