 import React, { useState, useMemo } from "react";

// User Management Page (single-file React component)
// Tailwind CSS required in the project
// Features:
// - Search, sort, filter by role & status
// - Pagination
// - Bulk select & actions
// - Add / Edit user modal (local state)
// - Export CSV

export default function UserPage() {
  // sample data (replace with API data)
  const initialUsers = [
    { id: 1, name: "Aisha Khan", email: "aisha@example.com", role: "Admin", status: "Active", joined: "2025-01-10" },
    { id: 2, name: "Rahul Mehta", email: "rahul@example.com", role: "Manager", status: "Active", joined: "2024-09-02" },
    { id: 3, name: "Sara Patel", email: "sara@example.com", role: "User", status: "Suspended", joined: "2025-02-18" },
    { id: 4, name: "David Lee", email: "david@example.com", role: "User", status: "Active", joined: "2024-12-05" },
    { id: 5, name: "Priya Joshi", email: "priya@example.com", role: "Editor", status: "Active", joined: "2023-11-21" },
    { id: 6, name: "Ken Tanaka", email: "ken@example.com", role: "User", status: "Pending", joined: "2025-03-01" },
    { id: 7, name: "Lina Gomez", email: "lina@example.com", role: "User", status: "Active", joined: "2024-04-14" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Derived values
  const roles = useMemo(() => ["All", ...Array.from(new Set(users.map(u => u.role)))], [users]);
  const statuses = useMemo(() => ["All", ...Array.from(new Set(users.map(u => u.status)))], [users]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users
      .filter(u => {
        if (roleFilter !== "All" && u.role !== roleFilter) return false;
        if (statusFilter !== "All" && u.status !== statusFilter) return false;
        if (!q) return true;
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
      })
      .sort((a, b) => {
        const key = sortBy.key;
        if (a[key] < b[key]) return sortBy.dir === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortBy.dir === "asc" ? 1 : -1;
        return 0;
      });
  }, [users, query, roleFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  // Handlers
  function toggleSelectAll(e) {
    if (e.target.checked) {
      setSelected(new Set(filtered.map(u => u.id)));
    } else {
      setSelected(new Set());
    }
  }

  function toggleSelectOne(id) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  }

  function openAddModal() {
    setEditingUser({ id: null, name: "", email: "", role: "User", status: "Pending", joined: new Date().toISOString().slice(0, 10) });
    setIsModalOpen(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setIsModalOpen(true);
  }

  function saveUser(user) {
    if (user.id) {
      setUsers(prev => prev.map(u => (u.id === user.id ? { ...user } : u)));
    } else {
      const nextId = Math.max(0, ...users.map(u => u.id)) + 1;
      setUsers(prev => [{ ...user, id: nextId }, ...prev]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  }

  function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm("Delete selected users? This action cannot be undone.")) return;
    setUsers(prev => prev.filter(u => !selected.has(u.id)));
    setSelected(new Set());
  }

  function exportCSV() {
    const header = ["id", "name", "email", "role", "status", "joined"].join(",") + "\n";
    const rows = filtered.map(u => [u.id, u.name, u.email, u.role, u.status, u.joined].join(",")).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function changeSort(key) {
    setSortBy(prev => ({ key, dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc" }));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-600">Manage users, roles, and statuses from here.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={openAddModal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none">+ Add user</button>
            <button onClick={exportCSV} className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">Export CSV</button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 flex items-center gap-2">
            <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search name, email or role..." className="w-full p-2 border rounded-md" />
          </div>

          <div className="flex gap-2">
            <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} className="p-2 border rounded-md">
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="p-2 border rounded-md">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2">
            <label className="text-sm">Per page:</label>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} className="p-2 border rounded-md w-20">
              {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" onChange={toggleSelectAll} checked={selected.size === filtered.length && filtered.length > 0} aria-label="select all" /></th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => changeSort("name")}>Name {sortBy.key === "name" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => changeSort("email")}>Email {sortBy.key === "email" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => changeSort("joined")}>Joined {sortBy.key === "joined" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {pageData.length === 0 ? (
                <tr><td colSpan={7} className="p-6 text-center text-gray-500">No users found.</td></tr>
              ) : (
                pageData.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" checked={selected.has(user.id)} onChange={() => toggleSelectOne(user.id)} aria-label={`select-${user.id}`} /></td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                    <td className="px-4 py-3"><StatusPill status={user.status} /></td>
                    <td className="px-4 py-3">{user.joined}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(user)} className="px-3 py-1 border rounded-md text-sm">Edit</button>
                        <button onClick={() => { if (confirm('Delete this user?')) setUsers(prev => prev.filter(u => u.id !== user.id)); }} className="px-3 py-1 border rounded-md text-sm text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bulk actions and pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="text-sm">{selected.size} selected</div>
            <button onClick={bulkDelete} className="px-3 py-1 border rounded-md text-sm text-red-600">Delete Selected</button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded-md">Prev</button>
            <div className="px-3 py-1 border rounded-md">{page} / {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>
      </div>

      {/* Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 p-6">
            <h2 className="text-xl font-semibold mb-4">{editingUser && editingUser.id ? "Edit User" : "Add User"}</h2>
            <UserForm user={editingUser} onCancel={() => { setIsModalOpen(false); setEditingUser(null); }} onSave={saveUser} />
          </div>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }) {
  const colors = {
    Admin: "bg-indigo-100 text-indigo-700",
    Manager: "bg-yellow-100 text-yellow-800",
    Editor: "bg-green-100 text-green-700",
    User: "bg-gray-100 text-gray-700",
  };
  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors[role] || "bg-gray-100 text-gray-700"}`}>{role}</span>;
}

function StatusPill({ status }) {
  const colors = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-800",
  };
  return <span className={`px-2 py-1 rounded-full text-xs ${colors[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
}

function UserForm({ user, onCancel, onSave }) {
  const [form, setForm] = useState({ ...user });

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    // basic validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required.");
      return;
    }
    onSave(form);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Full name</label>
          <input className="w-full p-2 border rounded-md" value={form.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input className="w-full p-2 border rounded-md" value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm">Role</label>
          <select className="w-full p-2 border rounded-md" value={form.role} onChange={e => update('role', e.target.value)}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Editor</option>
            <option>User</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Status</label>
          <select className="w-full p-2 border rounded-md" value={form.status} onChange={e => update('status', e.target.value)}>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Joined</label>
          <input type="date" className="w-full p-2 border rounded-md" value={form.joined} onChange={e => update('joined', e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
      </div>
    </form>
  );
}
