import React from 'react';
import './CitizenFeed.css';

export default function CitizenFeed() {
  return (
    <div className="citizen-feed">
      <div className="feed-header">
        <span>NEOCITY SOCIAL - STUDENT STARTER</span>
        <span style={{ fontSize: '0.7rem' }}>PANIC LEVEL: TODO</span>
      </div>

      <button className="simulate-btn" disabled>
        SIMULATE CRISIS (TODO)
      </button>

      <div className="panic-bar">
        <div className="panic-fill" style={{ width: '35%' }} />
      </div>

      <div className="feed-posts">
        <div className="post">
          <div className="post-avatar">#</div>
          <div className="post-content">
            <div className="post-user">@student_todo</div>
            <div className="post-text">TODO: generate posts and city states.</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.65rem', color: '#4a5568' }}>
        listen: power:outage, weather:change, hacker:command | emit: crowd:panic
      </div>
    </div>
  );
}