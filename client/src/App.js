import React, { useState } from 'react';
import './App.css';

import CalcForm from './CalcForm';
import CalcReview from './CalcReview';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const defaultItems = [
    {id: '1', name: 'Shampoo', price:5.99, quantity: 0},
    {id: '2', name: 'Body Wash', price: 8.99, quantity: 0},
    {id: '3', name:'Toothbrush', price: 7, quantity: 0}
  ];

  const defaultCalcResponse = { custName: "", itemTotals: [], subtotal: 0, totalTax: 0, total: 0, success: true };

  const [items, setItems] = useState(defaultItems);
  const [custId, setCustId] = useState("1");
  const [calcResponse, setCalcResponse] = useState(defaultCalcResponse);
  const [activeStep, setActiveStep] = useState(0);

  const theme = createTheme();

  const handleNext = async () => {
    if(activeStep === 0){
      const success = await calculate();
      if(success){
        setActiveStep(activeStep + 1);
      }
    } else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/ecurrah/palitronica-codingchallenge">
          Palitronica Coding Challenge
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const steps = ['Order', 'Review'];

  const getStepContent = (step) => {
    switch(step) {
      case 0:
        return <CalcForm custId={custId} items={items} setItems={setItems} setCustId={setCustId} />
      case 1:
        return <CalcReview calcResponse={calcResponse} />
      default:
        throw new Error('Unknown step')
    }
  }

  const calculate = async () => {
    
    const orderedItems = items.filter(item => item.quantity > 0);
    if(orderedItems.length < 1){
      setCalcResponse({success:false, message: 'Set the quantity of at least one item to be greater than zero to place your order.'})
      return false;
    }

    const req = {
      custId: custId,
      items: orderedItems.map(item => { return {id: item.id, quantity: item.quantity}}) // send only required information
    };

    let res;
    let success = false;
    try {
      setCalcResponse(defaultCalcResponse);
      // call api for calculation
      res = await fetch(`${process.env.REACT_APP_API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      });
      success = res.status === 200;
      const resJson = await res.json();
      setCalcResponse({...resJson, success});
      return success;
    } catch (err){
      console.log('API Request Error: ', err);
      setCalcResponse({success:false, message: 'Error occured while trying to perform calculation request.'})
      return false;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Palitronica
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We will send you an update when your order has
                  shipped.
                </Typography>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {
                    !calcResponse.success &&
                    (
                      <Alert severity="error">
                        {calcResponse.message}
                      </Alert>
                    )
                  }
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default App;
