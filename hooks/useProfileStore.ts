
import { useState, useEffect } from 'react';
import { profileUser, profileStats, securityState, activityEvents } from '../config/profile.mock';

export const useProfileStore = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ops_agent_profile');
    return saved ? JSON.parse(saved) : profileUser;
  });

  const [security, setSecurity] = useState(() => {
    const saved = localStorage.getItem('ops_agent_security');
    return saved ? JSON.parse(saved) : securityState;
  });

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('ops_agent_prefs');
    return saved ? JSON.parse(saved) : { stealthMode: false, animations: true, density: 'standard', language: 'en' };
  });

  useEffect(() => {
    localStorage.setItem('ops_agent_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ops_agent_security', JSON.stringify(security));
  }, [security]);

  useEffect(() => {
    localStorage.setItem('ops_agent_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const updateProfile = (newData: Partial<typeof profileUser>) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const toggle2FA = () => {
    setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
  };

  const updatePref = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return {
    user,
    security,
    preferences,
    stats: profileStats,
    events: activityEvents,
    updateProfile,
    toggle2FA,
    updatePref
  };
};
