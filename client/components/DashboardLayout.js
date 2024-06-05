import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link href="/dashboard" legacyBehavior>
              <a>Overview</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" legacyBehavior>
              <a>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/channel" legacyBehavior>
              <a>Channel</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/subscribers" legacyBehavior>
              <a>Subscribers</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/followers" legacyBehavior>
              <a>Followers</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/bits" legacyBehavior>
              <a>Bits</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="dashboard-content">
        {children}
      </main>
      <style jsx>{`
        .dashboard-layout {
          display: flex;
        }
        .dashboard-nav {
          width: 200px;
          background: #2f2f2f;
          color: #fff;
        }
        .dashboard-nav ul {
          list-style: none;
          padding: 0;
        }
        .dashboard-nav li {
          margin: 20px 0;
        }
        .dashboard-nav a {
          color: #fff;
          text-decoration: none;
          padding: 10px;
          display: block;
        }
        .dashboard-nav a:hover {
          background: #414141;
        }
        .dashboard-content {
          flex-grow: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
