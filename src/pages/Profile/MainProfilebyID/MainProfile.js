import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from "./Post"
import { useNavigate } from 'react-router-dom';


const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const username = user?.email?.split('@')[0];
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`https://twitter-clone-backend-h1kp.onrender.com/userpost?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [user?.email])

 

  return (
    <div className='sys'>
      {/* <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} /> */}
      {/* <h4 className='heading-4'> Profile </h4> */}
      <div className='mainprofile' >
        <div className='profile-bio'>
          {
            <div >
              <div className='coverImageContainer'>
                <img src={user?.coverImage ? user?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                <div className='hoverCoverImage'>
                  <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                      {
                        isLoading ?
                          <LockResetIcon className='photoIcon photoIconDisabled ' />
                          :
                          <CenterFocusWeakIcon className='photoIcon' />
                      }
                    </label>
                    <input
                      type="file"
                      id='image'
                      className="imageInput"
                    />
                  </div>
                </div>
              </div>
              <div className='avatar-img'>
                <div className='avatarContainer'>
                  <img src={user?.profileImage ? user?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                  <div className='hoverAvatarImage'>
                    <div className="imageIcon_tweetButton">
                      <label htmlFor='profileImage' className="imageIcon">
                        {
                          isLoading ?
                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                            :
                            <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <input
                        type="file"
                        id='profileImage'
                        className="imageInput"
                      />
                    </div>
                  </div>
                </div>
                <div className='userInfo'>
                  <div>
                    <h3 className='heading-3'>
                      {user?.name ? user.name : user && user.displayName}
                    </h3>
                    <p className='usernameSection'>@{username}</p>
                  </div>
                </div>
                <div className='infoContainer'>
                  {user?.bio ? <p>{user.bio}</p> : ''}
                  <div className='locationAndLink'>
                    {user?.location ? <p className='subInfo'><MyLocationIcon /> {user.location}</p> : ''}
                    {user?.website ? <p className='subInfo link'><AddLinkIcon /> {user.website}</p> : ''}
                  </div>
                </div>
                <h4 className='tweetsText'>Tweets</h4>
                <hr />
              </div>
              {
                posts.map(p => <Post p={p} />)
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainProfile;