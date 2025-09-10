import { useEffect, useState } from 'react';
import { Building2, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/datatable';
import Modal from '../components/Modal';

const AdminFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ fuc_name: '', dean: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const loadFaculties = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/getFaculties');
      if (!res.ok) throw new Error(`Failed to load faculties (${res.status})`);
      const json = await res.json();
      const rows = (json?.data ?? []).map((f, idx) => ({
        _id: f._id,
        id: idx + 1,
        name: f.fuc_name,
        dean: f.dean,
      }));
      setFaculties(rows);
    } catch (e) {
      setError(e.message || 'Failed to load faculties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculties();
  }, []);

  const onAdd = () => {
    setForm({ fuc_name: '', dean: '' });
    setSaveError('');
    setIsOpen(true);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    try {
      setSaving(true);
      setSaveError('');
      const res = await fetch('/api/addFaculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || j?.message || `Failed to create faculty (${res.status})`);
      }
      setIsOpen(false);
      await loadFaculties();
    } catch (e) {
      setSaveError(e.message || 'Failed to create faculty');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm('Delete this faculty?')) return;
    try {
      const res = await fetch(`/api/faculties/${row._id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || j?.error || `Delete failed (${res.status})`);
      }
      await loadFaculties();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleEdit = (row) => {
    alert('Edit faculty coming soon');
  };

  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Faculty', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Building2 className="h-5 w-5" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </div>
    ) },
    { key: 'dean', label: 'Dean' },
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
      <div className="p-4 bg-white rounded-xl shadow-md">Loading faculties...</div>
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
        title="Faculties"
        columns={columns}
        data={faculties}
        onAddClick={onAdd}
      />

      <Modal
        open={isOpen}
        title="Add Faculty"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
            <input
              type="text"
              value={form.fuc_name}
              onChange={(e) => setForm({ ...form, fuc_name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dean</label>
            <input
              type="text"
              value={form.dean}
              onChange={(e) => setForm({ ...form, dean: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminFaculties;


