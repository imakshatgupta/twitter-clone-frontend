import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../../../context/UserAuthContext";
import { useParams } from 'react-router-dom';
import '../../pages.css';
import MainProfile from './MainProfile';

function Profile() {
  const { user } = useUserAuth();
  const email = user?.email;
  const [aplan, setAplan] = React.useState("");
  const { userId } = useParams();
  const [ouser, setOuser] = useState(null); // Initialize with null

  // Fetch logged-in user's data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/loggedInUser?email=${email}`);
        const data = await response.json();
        setAplan(data[0]?.username);
      } catch (error) {
        console.error('Error fetching logged-in user data:', error);
      }
    };
    fetchData();
  }, [email]);

  // Fetch user data based on userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile?userId=${userId}`);
        const data = await response.json();
        setOuser(data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  // Check if data is loaded and handle conditional rendering
  if (!aplan || !ouser) {
    return <h2 className='profilePage'>Loading...</h2>; // You can replace this with a loading indicator
  }
  return (
    <div className='profilePage'>
      {ouser.privacy === "private" || ouser.blockedUsername?.includes(aplan) ? (
        <h2>This user's profile is private</h2>
      ) : (
        <MainProfile user={ouser} />
      )}
    </div>
  );
}

export default Profile;
