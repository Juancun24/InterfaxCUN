
import React from 'react';
import { useProfileStore } from '../../hooks/useProfileStore';

const ProfileSecurity: React.FC = () => {
  const { security, toggle2FA } = useProfileStore();

  return (


      <div>
      </div>
  );
};

export default ProfileSecurity;
