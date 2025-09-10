import { useEffect, useState } from 'react';
import { Layers, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/datatable';
import Modal from '../components/Modal';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ dept_name: '', faculty: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [faculties, setFaculties] = useState([]);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/getDepartments');
      if (!res.ok) throw new Error(`Failed to load departments (${res.status})`);
      const json = await res.json();
      const rows = (json?.data ?? []).map((d, idx) => ({
        _id: d._id,
        id: idx + 1,
        name: d.dept_name,
        faculty: typeof d.faculty === 'object' && d.faculty ? d.faculty.fuc_name : d.faculty,
      }));
      setDepartments(rows);
    } catch (e) {
      setError(e.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const loadFaculties = async () => {
    const res = await fetch('/api/getFaculties');
    const json = await res.json().catch(() => ({}));
    const list = (json?.data ?? []).map((f) => ({ id: f._id, name: f.fuc_name }));
    setFaculties(list);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const onAdd = async () => {
    setForm({ dept_name: '', faculty: '' });
    setSaveError('');
    await loadFaculties();
    setIsOpen(true);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    try {
      setSaving(true);
      setSaveError('');
      const res = await fetch('/api/addDepartment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || j?.message || `Failed to create department (${res.status})`);
      }
      setIsOpen(false);
      await loadDepartments();
    } catch (e) {
      setSaveError(e.message || 'Failed to create department');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm('Delete this department?')) return;
    try {
      const res = await fetch(`/api/departments/${row._id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || j?.error || `Delete failed (${res.status})`);
      }
      await loadDepartments();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleEdit = (row) => {
    alert('Edit department coming soon');
  };

  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Department', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center">
          <Layers className="h-5 w-5" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </div>
    ) },
    { key: 'faculty', label: 'Faculty' },
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
      <div className="p-4 bg-white rounded-xl shadow-md">Loading departments...</div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-md text-red-600">{error}</div>
    );
  }

  return (
    <>
      <DataTable
        title="Departments"
        columns={columns}
        data={departments}
        onAddClick={onAdd}
      />

      <Modal
        open={isOpen}
        title="Add Department"
        onClose={() => setIsOpen(false)}
        actions={
          <>
            <button onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-lg border">Cancel</button>
            <button onClick={submit} disabled={saving} className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
          </>
        }
      >
        <form onSubmit={submit} className="space-y-3">
          {saveError && <div className="text-red-600 text-sm">{saveError}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input
              type="text"
              value={form.dept_name}
              onChange={(e) => setForm({ ...form, dept_name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
            <select
              value={form.faculty}
              onChange={(e) => setForm({ ...form, faculty: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
              required
            >
              <option value="" disabled>Select a faculty</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminDepartments;


