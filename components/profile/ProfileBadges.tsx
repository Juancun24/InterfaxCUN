
import React from 'react';
import { badges } from '../../config/profile.mock';

const ProfileBadges: React.FC = () => {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <h3 className="font-agency text-sm tracking-[0.3em] text-[#9B6BFF] mb-4">AUTHENTICATED_SKILLS</h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, idx) => (
          <span 
            key={idx}
            className="px-3 py-1 font-agency text-[9px] rounded-full border tracking-widest transition-all hover:scale-105 cursor-default"
            style={{ 
              borderColor: `${badge.color}66`,
              color: badge.color,
              boxShadow: `inset 0 0 10px ${badge.color}11, 0 0 5px ${badge.color}22`
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileBadges;
