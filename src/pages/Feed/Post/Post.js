import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";

function Post({ p }) {

  const linkStyle = {
    textDecoration: 'none', 
    color: 'black',        
    cursor: 'pointer',     
  };

  const { name, username, photo, post, profilePhoto, userid } = p;


  return (
    <div className="post">
      <div className="post__avatar">
      <Link to={`/home/profile/${userid}`} style={linkStyle} >
        <Avatar src={profilePhoto} />
        </Link>

      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
            <Link to={`/home/profile/${userid}`} style={linkStyle} >
              {name} <span className="post__headerSpecial">@{username}</span>
            </Link>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post}</p>
          </div>
        </div>
        <img src={photo} alt="" width="500" />
        <div className="post__footer">
          <ChatBubbleOutlineIcon
            className="post__footer__icon"
            fontSize="small"
          />
          <RepeatIcon className="post__footer__icon" fontSize="small" />
          <FavoriteBorderIcon className="post__footer__icon" fontSize="small" />
          <PublishIcon className="post__footer__icon" fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
