import { useEffect, useState } from 'react';
import { GraduationCap, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/datatable';
import Modal from '../components/Modal';

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ code: '', title: '', level: '', duration: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/getPrograms');
      if (!res.ok) throw new Error(`Failed to load programs (${res.status})`);
      const json = await res.json();
      const rows = (Array.isArray(json) ? json : json?.data || []).map((p, idx) => ({
        _id: p._id,
        id: p.code || idx + 1,
        title: p.title,
        level: p.level,
        duration: p.duration,
      }));
      setPrograms(rows);
    } catch (e) {
      setError(e.message || 'Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const onAdd = () => {
    setForm({ code: '', title: '', level: '', duration: '' });
    setSaveError('');
    setIsOpen(true);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    try {
      setSaving(true);
      setSaveError('');
      const res = await fetch('/api/addProgram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || j?.message || `Failed to create program (${res.status})`);
      }
      setIsOpen(false);
      await loadPrograms();
    } catch (e) {
      setSaveError(e.message || 'Failed to create program');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm('Delete this program?')) return;
    try {
      const res = await fetch(`/api/programs/${row._id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || j?.error || `Delete failed (${res.status})`);
      }
      await loadPrograms();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleEdit = (row) => {
    alert('Edit program coming soon');
  };

  const columns = [
    { key: 'id', label: 'Code' },
    { key: 'title', label: 'Title', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
          <GraduationCap className="h-5 w-5" />
        </div>
        <span className="font-medium text-gray-900">{row.title}</span>
      </div>
    ) },
    { key: 'level', label: 'Level' },
    { key: 'duration', label: 'Duration' },
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
      <div className="p-4 bg-white rounded-xl shadow-md">Loading programs...</div>
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
        title="Programs"
        columns={columns}
        data={programs}
        onAddClick={onAdd}
      />

      <Modal
        open={isOpen}
        title="Add Program"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <input
                type="text"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminPrograms;


