import React, {useState, useEffect} from 'react';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart} from "./helper/cartHelper";
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import createOrder from "./helper/orderHelper";
import { API } from '../backend';

const StripeCheckout = ({
    products, 
    setReload = f => f, 
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: "" 
    });

    const token = isAutheticated() && isAutheticated().token
    const userId = isAutheticated() && isAutheticated().user._id 

    const getFinalAmount = () => {
        let amount =0;
        products.map(p => {
            amount = amount + p.price;
        })
        return amount;
    }


    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            //call further methods
            const status = response;
            console.log("STATUS ",status);
        }).catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51Ll5pTSEvGYHxUK1kDbi9N9mntnybFOeeeLvM6nSUhU3ALWEyoPnbRy4XXYUUo16uLdHbKaNT1Rh5DsUpmMkE7Oz00X42sUvS4"
            token={makePayment}
            amount={getFinalAmount()*100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

  return (
    <div>
        <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
        {showStripeButton()}
    </div>
  )
}

export default StripeCheckout;