import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

    const { user } = useAuth0();
    const { name, picture} = user;

    return ( 
        <div className="flex items-center">
        <img
            src={picture}
            alt="Profile"
            className="rounded-full w-8 h-auto mx-1"
          />
          <h2 className="mx-1">{name}</h2>
            
        </div>
     );
}
 
export default Profile;