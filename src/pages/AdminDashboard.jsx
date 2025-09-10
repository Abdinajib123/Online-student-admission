import { useEffect, useState } from 'react';
import { Users, GraduationCap, Building2, Layers, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, percentage, trend, trendColor }) => {
  const getCircleProps = (percentage, radius = 45) => {
    const circumference = 2 * Math.PI * radius;
    const dasharray = `${(percentage / 100) * circumference} ${circumference}`;
    return { dasharray, circumference };
  };

  // Convert Tailwind color classes to hex values for the progress circle
  const colorMap = {
    'bg-blue-600': '#2563eb',
    'bg-purple-600': '#9333ea',
    'bg-emerald-600': '#059669',
    'bg-orange-600': '#ea580c'
  };

  return (
    <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div className={`p-3 rounded-xl ${color} text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="relative">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="stroke-gray-200"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colorMap[color]}
              strokeWidth="8"
              strokeDasharray={getCircleProps(percentage).dasharray}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
            {percentage}%
          </span>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
      <p className="text-gray-500 mt-1 text-sm">{title}</p>
      <div className="flex items-center gap-1 mt-2">
        {trendColor === "green" ? (
          <ArrowUp className="w-3 h-3 text-green-500" />
        ) : (
          <ArrowDown className="w-3 h-3 text-red-500" />
        )}
        <span className={`text-${trendColor}-500 text-xs font-medium`}>
          {trend}
        </span>
        <span className="text-gray-500 text-xs ml-1">vs last month</span>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/dashboard/stats');
        if (!res.ok) throw new Error(`Failed to load stats (${res.status})`);
        const json = await res.json();
        setStats(json);
      } catch (e) {
        setError(e.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="container py-8 text-red-600">{error}</div>;
  }

  const cards = [
    {
      title: 'Students',
      value: String(stats?.students ?? 0),
      icon: Users,
      color: 'bg-blue-600',
      percentage: 72,
      trend: '+12%',
      trendColor: 'green'
    },
    {
      title: 'Programs',
      value: String(stats?.programs ?? 0),
      icon: GraduationCap,
      color: 'bg-purple-600',
      percentage: 48,
      trend: '-8%',
      trendColor: 'red'
    },
    {
      title: 'Faculties',
      value: String(stats?.faculties ?? 0),
      icon: Building2,
      color: 'bg-emerald-600',
      percentage: 65,
      trend: '+15%',
      trendColor: 'green'
    },
    {
      title: 'Departments',
      value: String(stats?.departments ?? 0),
      icon: Layers,
      color: 'bg-orange-600',
      percentage: 85,
      trend: '+5%',
      trendColor: 'green'
    }
  ];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
            percentage={s.percentage}
            trend={s.trend}
            trendColor={s.trendColor}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;