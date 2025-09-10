import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import About from './pages/About';
import Contact from './pages/Contact';
import Admission from './pages/Admission';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/Admin/AdminLayout';
import AdminStudents from './pages/AdminUsers';
import AdminPrograms from './pages/AdminPrograms';
import AdminFaculties from './pages/AdminFaculties';
import AdminDepartments from './pages/AdminDepartments';
import AdminAddProgram from './pages/AdminAddProgram';
import AdminAddFaculty from './pages/AdminAddFaculty';
import AdminAddDepartment from './pages/AdminAddDepartment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admission" element={<Admission />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="programs/add" element={<AdminAddProgram />} />
            <Route path="faculties" element={<AdminFaculties />} />
            <Route path="faculties/add" element={<AdminAddFaculty />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="departments/add" element={<AdminAddDepartment />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;