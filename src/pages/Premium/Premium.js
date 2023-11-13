import React, { useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import {loadStripe} from "@stripe/stripe-js";
import "./Premium.css";

const Premium = () => {
  const { user } = useUserAuth();
  const email = user?.email;

  const [aplan, setAplan] = React.useState("");
  // const [plan, setPlan] = React.useState("");

  useEffect(() => {
    fetch(`https://twitter-clone-backend-h1kp.onrender.com/loggedInUser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAplan(data[0]?.plan);
      });
  }, [aplan]);

  console.log(aplan);

  const makePaymentSilver = async () => {
    try{
    // const stripe = await loadStripe("pk_test_51O4hY9SAFIUZ4HpWQqIARd8Q3473PlKvRT4hJPcpRhpRYt1zgIObxZnbSF5SIY1gj6PV8oTMIRukMOlRVZekFi3l00fu3xrjla");
    const res = await fetch("https://twitter-clone-backend-h1kp.onrender.com/create-checkout-session-silver", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: "Silver Plan" }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error.message);
    }
    else{
      const editedInfo = {
        plan: "2",
      };
      console.log(editedInfo);
      fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${user?.email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedInfo),
      });
    }
    window.location=data.url;
    }
    catch(err){
      console.log(err);
    }
  };
  const makePaymentGold = async () => {
    try{
    // const stripe = await loadStripe("pk_test_51O4hY9SAFIUZ4HpWQqIARd8Q3473PlKvRT4hJPcpRhpRYt1zgIObxZnbSF5SIY1gj6PV8oTMIRukMOlRVZekFi3l00fu3xrjla");
    const res = await fetch("https://twitter-clone-backend-h1kp.onrender.com/create-checkout-session-gold", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: "Gold Plan" }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error.message);
    }
    else{
      const editedInfo = {
        plan: "3",
      };
      console.log(editedInfo);
      fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${user?.email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedInfo),
      });
    }
    window.location=data.url;
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="subscriptions-container">
      {aplan === "1" ? (
        <>
          <h2>You are on Free Plan. Upgrade now.</h2>
          <div className="plan-card" onClick={makePaymentSilver}>
            <h3>Silver Plan</h3>
            <p>₹100/month</p>
            <p>Tweets Per Day: 5</p>
          </div>
          <div className="plan-card" onClick={makePaymentGold}>
            <h3>Gold Plan</h3>
            <p>₹1000/month</p>
            <p>Tweets Per Day: Unlimited</p>
          </div>
        </>
      ) : aplan === "2" ? (
        <>
          <h2>You are on Silver Plan. Upgrade now.</h2>
          <div className="plan-card" onClick={makePaymentGold}>
            <h3>Gold Plan</h3>
            <p>₹1000/month</p>
            <p>Tweets Per Day: Unlimited</p>
          </div>
        </>
      ) : aplan === "3" ? (
        <h2>You are on Gold Plan. Enjoy!!</h2>
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default Premium;
