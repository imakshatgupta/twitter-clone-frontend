import React, { useEffect, useState } from 'react';
import './Badge.css';
import { useUserAuth } from "../../context/UserAuthContext";

const Badge = () => {
    const { user } = useUserAuth();
  const email = user?.email;

  const [fullName, setFullName] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
    const [image, setImage] = useState('');
    const [badge, setBadge] = useState("");

    useEffect(() => {
        fetch(`https://twitter-clone-backend-h1kp.onrender.com/loggedInUser?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                setBadge(data[0]?.badge);
                setName(data[0]?.name);
            });
        }, [name , badge]);
        
        console.log(badge);
        console.log(name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("https://twitter-clone-backend-h1kp.onrender.com/badge", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({badge : true}),
        });
        const data = await res.json();
        console.log(data);
        if (data.error) {
            console.log(data.error.message);
        }
        else{
            const editedInfo = {
                badge: true,
                name: name + " ✅",
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

    } catch (error) {
        console.log(error);
    }

  console.log('Verification request submitted:', { fullName, username, profession });
  };

  return (
    <div className="badge-container">
      {badge ? 
      (<h2>You Already have a Verification Badge</h2>)
       : 
       (<>
      <form className='form' onSubmit={handleSubmit}>
       <h2>Apply for Verification Badge</h2>
       <br/>
       <br/>
        <br/>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Instagram Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="profession">Upload your ID:</label>
            <input
                type="file"
                id="profession"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
        </div>
        <p>
         NOTE : You will get a verification badge within 1 hour after submitting the request.
        </p>
        <br></br>
        <button className="apply-button" type="submit">Pay 299 RS.</button>
      </form>
      </>)
      }
    </div>
  );
};

export default Badge;
