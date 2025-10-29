interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="container mx-auto my-10  flex min-h-screen bg-gray-50">
      {/* Left Nav */}
      <nav className="w-2/10 bg-white border-r p-6 flex flex-col">
        {/* User info */}
        <div className="flex flex-col  mb-6">
          <img
            src="/default-avatar.png" // thay bằng user avatar
            alt="user avatar"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h2 className="font-semibold text-lg">User Name</h2>
          <button className="flex items-center mt-2 text-sm text-blue-500 hover:underline">
            <span className="mr-1">{/* svg edit icon */}✏️</span>
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-4">
          <li>
            <span className="font-medium">My Account</span>
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <a
                  href="/profile"
                  className="block px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/change-password"
                  className="block px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  Change Password
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/purchases"
              className="block px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              My Purchase
            </a>
          </li>
        </ul>
      </nav>

      {/* Right Content */}
      <div className="w-8/10 p-6 bg-white rounded shadow-sm">
        {children} {/* Page content sẽ render ở đây */}
      </div>
    </div>
  );
};

export default UserLayout;
