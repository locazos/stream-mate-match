
import React from 'react';
import ProfileForm from '../components/Profile/ProfileForm';

const Profile: React.FC = () => {
  return (
    <div className="pt-16 pb-20 px-4 min-h-screen">
      <div className="container max-w-md mx-auto">
        <div className="mt-4">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
