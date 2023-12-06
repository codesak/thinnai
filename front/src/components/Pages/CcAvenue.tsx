import React, { useState ,useEffect,useRef, FormEvent } from 'react';
import axios from 'axios';

const CcAvenue: React.FC  = () => {
  
  const [order_id, setorder_id] = useState('');
  const [currency, setcurrency] = useState('');
  const [redirect_url, setredirect_url] = useState('https://canary.bookmythinnai.com/api/ccavenue/ccavResponseHandler');
  const [cancel_url, setcancel_url] = useState('https://canary.bookmythinnai.com/api/ccavenue/ccavResponseHandler');
  const [language, setlanguage] = useState('');
  /* const [zip, setZip] = useState(''); */
  const [amount, setAmount] = useState('');
  const [formBody, setFormBody] = useState('');
 


  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }

  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const data = {
      
      order_id,
      currency,
      redirect_url,
      cancel_url,
      language,
      amount,
      
    };
//https://canary.bookmythinnai.com
    try {
      // send payment data to server
      const response = await axios.post('https://bookmythinnai.com/api/ccavenue/ccavRequestHandler', data).then(response => {
        setFormBody(response.data);
        //window.location.href = res.data.payment_url
      })
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Order ID:</label>
          <input
            type="order_id"
            value={order_id}
            onChange={(e) => setorder_id(e.target.value)}
          />
        </div>
        <div>
          <label>Currency:</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setcurrency(e.target.value)}
          />
        </div>
        <div>
          {/* <label>Redirect_URL:</label> */}
          <input 
          type="hidden" 
          value={redirect_url}/>
        </div>
        <div>
          {/* <label>Cancel_URL:</label> */}
          <input
            type="hidden"
            value={cancel_url}
            
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setlanguage(e.target.value)}
          />
        </div>
       
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <input type="submit" value="Checkout"/>
      </form>
      
      <div dangerouslySetInnerHTML={{ __html: formBody }}></div>
      {/* <script>{`document.getElementById('nonseamless').submit();`}</script> */}
      
    </div>
  )
}
export default CcAvenue;