import { useEffect, useState } from 'react';
import { User, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/datatable';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/getStudentAdmissions');
      if (!res.ok) throw new Error(`Failed to load students (${res.status})`);
      const json = await res.json();
      const rows = (json?.data ?? []).map((s, idx) => ({
        _id: s._id,
        id: idx + 1,
        fullname: s.fullname,
        faculty: typeof s.faculty === 'object' && s.faculty ? (s.faculty.fuc_name || s.faculty.name || s.faculty._id) : s.faculty,
        department: typeof s.Department === 'object' && s.Department ? (s.Department.dept_name || s.Department.name || s.Department._id) : (s.department || s.Department),
        mode: s.mode,
      }));
      setStudents(rows);
    } catch (e) {
      setError(e.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (row) => {
    if (!confirm('Delete this student admission?')) return;
    try {
      const res = await fetch(`/api/student-admissions/${row._id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || j?.error || `Delete failed (${res.status})`);
      }
      await loadStudents();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleEdit = (row) => {
    alert('Edit student coming soon');
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fullname', label: 'Student', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>
        <span className="font-medium text-gray-900">{row.fullname}</span>
      </div>
    ) },
    { key: 'faculty', label: 'Faculty' },
    { key: 'department', label: 'Department' },
    { key: 'mode', label: 'Mode' },
    { key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex gap-2">
        <button onClick={() => handleEdit(row)} className="p-1.5 rounded bg-yellow-500 text-white" title="Edit">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={() => handleDelete(row)} className="p-1.5 rounded bg-red-600 text-white" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ) },
  ];

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md">Loading students...</div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md text-red-600">{error}</div>
    );
  }

  return (
    <DataTable
      title="Students"
      columns={columns}
      data={students}
      showAddButton={false}
    />
  );
};

export default AdminStudents;


