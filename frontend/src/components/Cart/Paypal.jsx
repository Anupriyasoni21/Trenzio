import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Paypal = ({amount,onSuccess,onError}) => {
  return <PayPalScriptProvider options={{"client-id":
   import.meta.env.VITE_PAYPALID,
  }}>
    <PayPalButtons style={{layout:"vertical"}}
    createOrder={(data,actions)=>{
        return actions.order.create({
            purchase_units:[{amount:{value:parseFloat(amount).toFixed(2)}}]
        });
    }}
    onApprove={(data,actions)=>{
        return actions.order.capture().then(onSuccess)
    }}
    onError={onError}/>
  </PayPalScriptProvider>
}

export default Paypal
