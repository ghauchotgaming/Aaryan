import { useAuth } from '../context/AuthContext';
import {
  HiOutlineBeaker,
  HiOutlineTruck,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineLogout,
  HiOutlineBell,
  HiOutlineCog,
} from 'react-icons/hi';

const statCards = [
  {
    title: 'Water Quality',
    value: '99.7%',
    subtitle: 'pH 7.2 | TDS 45ppm',
    icon: HiOutlineBeaker,
    color: '#0ea5e9',
  },
  {
    title: 'Active Deliveries',
    value: '24',
    subtitle: '6 drivers en route',
    icon: HiOutlineTruck,
    color: '#10b981',
  },
  {
    title: 'Subscribers',
    value: '1,247',
    subtitle: '+38 this week',
    icon: HiOutlineUsers,
    color: '#8b5cf6',
  },
  {
    title: "Today's Revenue",
    value: 'NPR 87,450',
    subtitle: 'NPR 12,300 pending',
    icon: HiOutlineCurrencyDollar,
    color: '#f59e0b',
  },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
            <path d="M16 2C16 2 4 14 4 20C4 26 9 30 16 30C23 30 28 26 28 20C28 14 16 2 16 2Z" fill="url(#navDrop)" />
            <defs>
              <linearGradient id="navDrop" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0369a1" />
              </linearGradient>
            </defs>
          </svg>
          <span>H2O-Flow</span>
        </div>
        <div className="nav-right">
          <button className="nav-icon-btn" title="Notifications">
            <HiOutlineBell />
            <span className="notification-dot"></span>
          </button>
          <button className="nav-icon-btn" title="Settings">
            <HiOutlineCog />
          </button>
          <div className="nav-user">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button className="nav-icon-btn logout-btn" onClick={logout} title="Logout">
            <HiOutlineLogout />
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name?.split(' ')[0]}!</h1>
            <p>Here's your water distribution overview for today</p>
          </div>
          <div className="header-badge">
            <span className="live-dot"></span>
            System Online
          </div>
        </div>

        <div className="stats-grid">
          {statCards.map((card) => (
            <div key={card.title} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                <card.icon />
              </div>
              <div className="stat-content">
                <p className="stat-title">{card.title}</p>
                <h3 className="stat-value">{card.value}</h3>
                <p className="stat-subtitle">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Recent Orders</h3>
            <div className="order-list">
              {[
                { id: '#H2O-2847', customer: 'Raj Kumar', jars: 3, status: 'Delivered', time: '10:30 AM' },
                { id: '#H2O-2848', customer: 'Sita Sharma', jars: 2, status: 'In Transit', time: '11:15 AM' },
                { id: '#H2O-2849', customer: 'Hotel Himalaya', jars: 10, status: 'Preparing', time: '11:45 AM' },
                { id: '#H2O-2850', customer: 'Meena Devi', jars: 1, status: 'Scheduled', time: '2:00 PM' },
              ].map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-id">{order.id}</span>
                    <span className="order-customer">{order.customer}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-jars">{order.jars} Jars</span>
                    <span className={`order-status status-${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                    <span className="order-time">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <h3>IoT Sensor Readings</h3>
            <div className="sensor-list">
              {[
                { label: 'pH Level', value: '7.2', unit: '', status: 'normal', range: '6.5 - 8.5' },
                { label: 'Turbidity', value: '0.3', unit: 'NTU', status: 'normal', range: '< 1.0' },
                { label: 'TDS', value: '45', unit: 'ppm', status: 'normal', range: '< 300' },
                { label: 'Temperature', value: '22', unit: 'C', status: 'normal', range: '15 - 25' },
              ].map((sensor) => (
                <div key={sensor.label} className="sensor-item">
                  <div className="sensor-header">
                    <span className="sensor-label">{sensor.label}</span>
                    <span className={`sensor-status sensor-${sensor.status}`}>Normal</span>
                  </div>
                  <div className="sensor-value">
                    {sensor.value}<span className="sensor-unit">{sensor.unit}</span>
                  </div>
                  <div className="sensor-range">Safe range: {sensor.range}</div>
                  <div className="sensor-bar">
                    <div className="sensor-bar-fill" style={{ width: '72%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
