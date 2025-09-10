import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Building2, Layers, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const groups = [
  { 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    to: '/admin', 
    end: true,
    single: true // This indicates it's a single link, not a dropdown
  },
  { 
    label: 'Students', 
    icon: Users, 
    links: [
    
      { to: '/admin/students', label: 'Students' },
    ] 
  },
  { 
    label: 'Programs', 
    icon: GraduationCap, 
    links: [
   
      { to: '/admin/programs', label: 'Programs' },
    ] 
  },
  { 
    label: 'Faculties', 
    icon: Building2, 
    links: [

      { to: '/admin/faculties', label: 'Faculties' },
    ] 
  },
  { 
    label: 'Departments', 
    icon: Layers, 
    links: [
     
      { to: '/admin/departments', label: 'Departments' },
    ] 
  },
];

const AdminLayout = () => {
  const [openGroup, setOpenGroup] = useState(null);

  const toggleGroup = (index) => {
    if (openGroup === index) {
      setOpenGroup(null);
    } else {
      setOpenGroup(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:flex md:flex-col">
          <nav className="flex-1 space-y-1">
            {groups.map((group, gi) => {
              const Icon = group.icon;
              const isOpen = openGroup === gi;
              
              // For single items (like Dashboard)
              if (group.single) {
                return (
                  <div key={gi} className="">
                    <NavLink
                      to={group.to}
                      end={group.end}
                      className={({ isActive }) =>
                        `w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                      }
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {group.label}
                    </NavLink>
                  </div>
                );
              }
              
              // For dropdown items
              return (
                <div key={gi} className="">
                  <button 
                    onClick={() => toggleGroup(gi)} 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {group.label}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="pl-8 py-1 space-y-1">
                      {group.links.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          end={link.end}
                          className={({ isActive }) =>
                            `block px-3 py-1.5 rounded-md text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar (mobile only) */}
          <header className="md:hidden bg-white h-12 flex items-center px-4 justify-between border-b border-gray-200">
            <div className="font-semibold">Admin</div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;