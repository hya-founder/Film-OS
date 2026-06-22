import React, { useState } from 'react';
import { 
  Megaphone, 
  Bell, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import './CommunicationHub.css';

const ANNOUNCEMENTS = [
  { 
    id: 1, 
    title: 'New Studio Equipment Arrived', 
    content: 'We just received the new Arri Alexa 35 and a set of Signature Primes. They are available for checkout in the inventory system starting Monday. Please ensure you complete the mandatory orientation if you haven\'t already.', 
    date: 'March 1, 2026', 
    category: 'Equipment',
    priority: 'high'
  },
  { 
    id: 2, 
    title: 'Upcoming Production Workshop', 
    content: 'Join us next Friday for a deep dive into high-speed drone cinematography techniques. Guest speaker Tom Chen will be sharing insights from the Red Bull Speed project.', 
    date: 'February 28, 2026', 
    category: 'Education',
    priority: 'medium'
  },
  { 
    id: 3, 
    title: 'Office Schedule Update', 
    content: 'The production office will be closed on March 20th for the regional holiday. Remote support will be limited to critical project issues only.', 
    date: 'February 25, 2026', 
    category: 'Admin',
    priority: 'low'
  }
];

const NOTIFICATIONS = [
  { id: 1, type: 'success', message: 'Payment of ₱150,000 received from Nike PH.', time: '5m ago', icon: CheckCircle },
  { id: 2, type: 'warning', message: 'Storage Node 04 is approaching 90% capacity.', time: '42m ago', icon: AlertCircle },
  { id: 3, type: 'info', message: 'New crew member "Sarah J." added to Project Vogue.', time: '2h ago', icon: Info },
  { id: 4, type: 'info', message: 'Meeting with Ayala Land starts in 30 minutes.', time: '3h ago', icon: Bell },
  { id: 5, type: 'success', message: 'Export for "The Lab" commercial completed successfully.', time: '5h ago', icon: CheckCircle },
];

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="comm-hub-container">
      {/* Sidebar */}
      <aside className="comm-hub-sidebar">
        <div className="sidebar-header">
          <h2>HUB</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Megaphone size={20} />
            <span>Announcements</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="comm-hub-main">
        {activeTab === 'announcements' && (
          <div className="announcements-layout">
            <header className="page-header">
              <h1>Announcements</h1>
              <p>Stay updated with the latest studio news</p>
            </header>
            <div className="announcements-grid">
              {ANNOUNCEMENTS.map((item) => (
                <div key={item.id} className={`announcement-card priority-${item.priority}`}>
                  <div className="category-tag">{item.category}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <div className="card-footer">
                    <span className="date">{item.date}</span>
                    <button className="read-more">Read More <ChevronRight size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-layout">
            <header className="page-header">
              <h1>Recent Notifications</h1>
              <p>Your activity stream and system alerts</p>
            </header>
            <div className="notifications-list">
              {NOTIFICATIONS.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.id} className={`notification-item type-${note.type}`}>
                    <div className="icon-wrapper">
                      <Icon size={18} />
                    </div>
                    <div className="note-content">
                      <p>{note.message}</p>
                      <span className="note-time">{note.time}</span>
                    </div>
                    <button className="dismiss-btn"><CheckCircle size={14} /></button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunicationHub;
