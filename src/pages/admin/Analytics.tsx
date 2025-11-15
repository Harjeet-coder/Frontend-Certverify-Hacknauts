import { Navbar } from '@/components/layout/Navbar';
import { ChartCard } from '@/components/shared/ChartCard';
import { HelpPopup } from '@/components/shared/HelpPopup';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import './Analytics.css';

const AdminAnalytics = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');
  
  const uploadsData = [
    { month: 'Jan', uploads: 30 },
    { month: 'Feb', uploads: 45 },
    { month: 'Mar', uploads: 55 },
    { month: 'Apr', uploads: 70 },
    { month: 'May', uploads: 85 },
    { month: 'Jun', uploads: 95 },
  ];

  const statusData = [
    { name: 'Verified', value: 120 },
    { name: 'Pending', value: 40 },
    { name: 'Rejected', value: 15 },
  ];

  const departmentData = [
    { department: 'CS', certificates: 65 },
    { department: 'EE', certificates: 45 },
    { department: 'ME', certificates: 38 },
    { department: 'CE', certificates: 27 },
  ];

  const COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  return (
    <>
      <Navbar />
      <div className="analytics-page">
        <div className="analytics-container">
          <div className="analytics-header">
            <h1 className="analytics-title">Admin Analytics</h1>
            <p className="analytics-description">View comprehensive analytics and insights</p>
          </div>

          <div className="analytics-filters">
            <div className="filter-group">
              <label className="filter-label">Department</label>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Departments</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
                <option value="ce">Civil Engineering</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Year</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3 className="analytics-card-title">Certificate Uploads Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={uploadsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="uploads" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="analytics-card">
              <h3 className="analytics-card-title">Verification Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="analytics-card">
              <h3 className="analytics-card-title">Department Participation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="certificates" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <HelpPopup />
    </>
  );
};

export default AdminAnalytics;