import React, { useState } from 'react';
import './App.css';

function App() {
  const defaultItems = [
    {id: '1', name: 'Shampoo', quantity: 0},
    {id: '2', name: 'Body Wash', quantity: 0},
    {id: '3', name:'Toothbrush', quantity: 0}
  ];

  const [apiResponse, setApiResponse] = useState();
  const [apiDbResponse, setApiDbResponse] = useState();
  const [items, setItems] = useState(defaultItems);
  const [custId, setCustId] = useState("1");
  const [calcResponse, setCalcResponse] = useState();


  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(ex => console.log(ex));
  }

  const callAPIDb = () => {
    fetch("http://localhost:9000/testDB")
      .then(res => res.text())
      .then(res => setApiDbResponse(res))
      .catch(ex => console.log(ex));
  }

  const updateItemQuantity = (itemId, value) => {
    const itemsToUpdate = [...items];
    itemsToUpdate.find(item => item.id === itemId).quantity = value;
    setItems([...itemsToUpdate]);
  }

  const calculate = (e) => {
    e.preventDefault();

    const req = {
      custId: custId,
      items: items.map(item => { return {id: item.id, quantity: item.quantity}}) // send only required information
    };

    // call api for calculation
    fetch(`${process.env.REACT_APP_API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setCalcResponse({...res, success:true})
    })
    .catch(err => {
      console.log('API Request Error: ', err);
      setCalcResponse({success:false, message: 'Error occured while trying to perform calculation request.'})
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={calculate}>
          <label>Customer ID </label>
          <input type="text" name="custId" value={custId} onChange={e => setCustId(e.target.value)} />
          <br/>
          {
            items.map(item => {
              let inputItemKey = `item-${item.id}-quantity`;
              return (
              <React.Fragment key={inputItemKey}>
              <label>{`${item.id} - ${item.name}`} </label>
              <input id={inputItemKey} type="number" value={item.quantity} onChange={e => updateItemQuantity(item.id, e.target.value)} />
              <br/>
              </React.Fragment>
              )
            })
          }
        <input type="submit" />
        </form>
        <div>
          {
            calcResponse &&
            !calcResponse.success &&
            (
              <>
              <p>{calcResponse.message}</p>
              <input type='button' value='Test Connection' onClick={e => {e.preventDefault(); callAPI(); callAPIDb();}} />
              <div>
                {apiResponse}
              </div>
              <div>
                {apiDbResponse}
              </div>
              </>
            )
          }
        </div>
        <div>
          {
            calcResponse &&
            calcResponse.success &&
            (
            <>
              <label>Customer Name: </label>
              <input type='text' disabled={true} value={calcResponse.custName} />
              <br/>
              {
                calcResponse.itemTotals &&
                calcResponse.itemTotals.map(itemTotal => {
                  const respItemKey = `item-${itemTotal.id}-total`;
                  return (
                    <React.Fragment key={respItemKey}>
                      <label>{`${itemTotal.id} - ${itemTotal.name} x ${itemTotal.quantity}`} </label>
                      <input id={respItemKey} type='text' name={respItemKey} value={`$${itemTotal.total.toFixed(2)}`} disabled={true} />
                      <br/>
                    </React.Fragment>
                  )
                })
              }
              <label>Subtotal: </label>
              <input type='text' disabled={true} value={`$${calcResponse.subTotal}`} />
              <br/>
              <label>Taxes: </label>
              <input type='text' disabled={true} value={`$${calcResponse.totalTax}`} />
              <br/>
              <label>Total: </label>
              <input type='text' disabled={true} value={`$${calcResponse.total}`} />
            </>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
