import React from 'react';
import { Container, Grid } from '@mui/material';
import ResultsWidget from './components/ResultsWidget';
import InputWidget from './components/InputWidget';
import GlobalStoreProvider from './context/GlobalStore';

function App() {
  return (
    <main>
      <GlobalStoreProvider>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h1>Proration Calculator Tool</h1>
            </Grid>
            <Grid item xs={10}>
              <InputWidget />
            </Grid>
            <Grid item xs={2}>
              <ResultsWidget />
            </Grid>
          </Grid>
        </Container>
      </GlobalStoreProvider>
    </main>
  );
}

export default App;
