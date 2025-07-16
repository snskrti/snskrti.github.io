import React from "react";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";

export const DonateByPaypal = () => {

    const [donationAmount, setDonationAmount] = React.useState(5);
    
    const currency = 'EUR';

    if (!process.env.REACT_APP_PAYPAL_CLIENT_ID) {
        console.error("Paypal client id is not set");
        return (
            <> </>
        );
    }

    const initialOptions = {
        'clientId': process.env.REACT_APP_PAYPAL_CLIENT_ID || '',
        'currency': currency,
        'intent': 'capture'
      };

    const onChangeDonationAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(parseInt(e.target.value));
    }

    const onCreateOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
            {
                amount: {
                    currency_code: currency,
                    value: donationAmount.toString(),
                },
            },
            ],
        });
    }
    
    const onApproveOrder = async (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            const name = details.payment_source.paypal.name.given_name;
            const payer = details.payment_source.paypal;
            console.log("payer: ", payer);

            alert(`Transaction completed by ${name}`);
        });
    }

    const onCancelOrder = (data: any, actions: any) => {
        alert("Transaction cancelled"); 
        console.error("Transaction cancelled, data: ", data); 
    }

    const onErrorOrder = (err: any) => {
        console.error("Error occured: ", err);
    }

    console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID.length);
    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="flex flex-col p-8 rounded-lg border border-blue-50 bg-blue-50 shadow text-center">
                <h1 className="text-xl font-bold">Donate to Sanskriti e.V.</h1>
                <h4 className="text-xs italic text-gray-500 my-4">Your donation will help us to promote Indian culture in Hamburg. <br /> 
                Anyone can make a charitable donation to Sanskriti e.V.</h4>
                {
                    process.env.REACT_APP_PAYPAL_CLIENT_ID.length > 0 && 
                    <div className="flex flex-col md:flex-row m-4 space-y-2 md:space-y-0 md:space-x-4">
                        <input 
                        type="number" 
                        step={5}
                        className="border border-gray-300 p-4 rounded-md" 
                        onChange={onChangeDonationAmount}
                        placeholder="Enter amount" />

                        <div className="flex items-center">
                            <PayPalButtons 
                            style={{ height: 48, layout: "horizontal", label: "donate", shape: "pill" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                            onCancel={(data, actions) => onCancelOrder(data, actions)}
                            onError={(err) => onErrorOrder(err)}
                            />
                        </div>
                    </div>
                }
            </div>
        </PayPalScriptProvider>
    );
}