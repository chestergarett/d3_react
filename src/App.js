import { useState, useCallback, useEffect } from 'react';
import { csv, csvFormat } from 'd3';
import logo from './logo.svg';
import './App.css';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null)
  const [messageF , setMessageF] = useState('')
  const csvUrl = "https://gist.githubusercontent.com/chestergarett/64724193886ead96355e5dc32ba93d87/raw/c1e16728bbeedaf817fc0308de52c5dfefffbd50/cssColors.csv"
  
  const messageHandler = (data) => {
    let message = '';
    message = message + Math.round(csvFormat(data).length /1024);
    message = message + data.length + ' rows\n';
    message = message + data.columns.length + ' columns';
    setMessageF(message)
  }

  useEffect( ()=> {
    setIsLoading(true);
    csv(csvUrl).then(data => {
      setData(data);
      messageHandler(data);
      setIsLoading(false);
  })
  }, [])
  

  return (
    <div>
      {!isLoading ? <pre id='message-container'>{messageF}</pre> : <p>Unable to Load data</p>}
    </div>
  );
}

export default App;
