
import React from 'react';
import { useProfileStore } from '../../hooks/useProfileStore';

const ProfilePreferences: React.FC = () => {
  const { preferences, updatePref } = useProfileStore();

  return (
    <div className="">
    </div>
  );
};

export default ProfilePreferences;
