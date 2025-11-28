 import React, { useState, useMemo } from "react";

// Order Details Page (single-file React component)
// Tailwind CSS required in the project
// Features:
// - Orders table with search, filter by status, sort, pagination
// - Quick actions (change status, refund, view details)
// - Order details slide-over/modal with items, customer, shipping, timeline
// - Export CSV

const sampleOrders = [
  { id: "ORD1234", user: "John Doe", total: 250.0, currency: "$", status: "Delivered", date: "2025-03-18", items: [ { name: "Blue Shirt", qty: 1, price: 50 }, { name: "Sneakers", qty: 1, price: 200 } ], shipping: { address: "123 Main St, City, Country", method: "Standard", tracking: "TRK123456" }, notes: "Left at doorstep." },
  { id: "ORD1235", user: "Jane Smith", total: 180.0, currency: "$", status: "Pending", date: "2025-04-02", items: [ { name: "Red Dress", qty: 1, price: 120 }, { name: "Scarf", qty: 1, price: 60 } ], shipping: { address: "45 Oak Ave, City, Country", method: "Express", tracking: null }, notes: "Please call on arrival." },
  { id: "ORD1236", user: "Mark Taylor", total: 320.0, currency: "$", status: "Cancelled", date: "2025-02-28", items: [ { name: "Backpack", qty: 1, price: 120 }, { name: "Headphones", qty: 1, price: 200 } ], shipping: { address: "77 Pine Rd, City, Country", method: "Standard", tracking: null }, notes: "Customer requested cancellation." },
  { id: "ORD1237", user: "Emma Watson", total: 150.0, currency: "$", status: "Delivered", date: "2025-03-22", items: [ { name: "Notebook", qty: 3, price: 50 } ], shipping: { address: "88 Lake St, City, Country", method: "Standard", tracking: "TRK987654" }, notes: "Handed to receptionist." },
];

export default function OrderPage() {
  const [orders, setOrders] = useState(sampleOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ["All", ...Array.from(new Set(orders.map(o => o.status)))]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders
      .filter(o => (statusFilter === "All" ? true : o.status === statusFilter))
      .filter(o => {
        if (!q) return true;
        return o.id.toLowerCase().includes(q) || o.user.toLowerCase().includes(q) || String(o.total).toLowerCase().includes(q);
      })
      .sort((a, b) => {
        const key = sortBy.key;
        if (key === "date") {
          const da = new Date(a.date), db = new Date(b.date);
          return sortBy.dir === "asc" ? da - db : db - da;
        }
        if (a[key] < b[key]) return sortBy.dir === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortBy.dir === "asc" ? 1 : -1;
        return 0;
      })
  }, [orders, query, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  function changeSort(key) {
    setSortBy(prev => ({ key, dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc" }));
  }

  function openDetails(order) {
    setSelectedOrder(order);
  }

  function closeDetails() {
    setSelectedOrder(null);
  }

  function updateStatus(id, status) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }

  function exportCSV() {
    const header = ["id", "user", "total", "status", "date"].join(",") + "\n";
    const rows = filtered.map(o => [o.id, '"' + o.user + '"', o.total, o.status, o.date].join(",")).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-600">View and manage customer orders.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50">Export CSV</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search order id, customer or amount..." className="w-full p-2 border rounded-md" />
          </div>
          <div className="flex gap-2 items-center">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="p-2 border rounded-md">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} className="p-2 border rounded-md w-24">
              {[5,10,20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => changeSort('date')}>Date {sortBy.key === 'date' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {pageData.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-gray-500">No orders found.</td></tr>
              ) : (
                pageData.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-sm">{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{o.user}</div>
                      <div className="text-xs text-gray-500">{o.shipping?.address}</div>
                    </td>
                    <td className="px-4 py-3">{o.currency}{o.total.toFixed(2)}</td>
                    <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                    <td className="px-4 py-3">{o.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openDetails(o)} className="px-3 py-1 border rounded-md text-sm">Details</button>
                        {o.status !== 'Cancelled' && (
                          <button onClick={() => updateStatus(o.id, 'Cancelled')} className="px-3 py-1 border rounded-md text-sm text-red-600">Cancel</button>
                        )}
                        {o.status === 'Delivered' && (
                          <button onClick={() => alert('Initiate refund flow (mock)')} className="px-3 py-1 border rounded-md text-sm text-yellow-700">Refund</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">Showing {filtered.length} orders</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 border rounded-md">Prev</button>
            <div className="px-3 py-1 border rounded-md">{page} / {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>

      </div>

      {/* Order details slide-over */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeDetails}></div>
          <div className="relative ml-auto w-full max-w-2xl bg-white h-full overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order {selectedOrder.id}</h2>
                <div className="text-sm text-gray-600">{selectedOrder.user} • {selectedOrder.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={selectedOrder.status} />
                <button onClick={closeDetails} className="px-3 py-1 border rounded-md">Close</button>
              </div>
            </div>

            <section className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <ul className="space-y-3">
                  {selectedOrder.items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                      </div>
                      <div className="font-mono">{selectedOrder.currency}{(it.price * it.qty).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-end items-center gap-4">
                  <div className="text-sm text-gray-600">Subtotal:</div>
                  <div className="font-semibold">{selectedOrder.currency}{selectedOrder.total.toFixed(2)}</div>
                </div>
              </div>
            </section>

            <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm">{selectedOrder.shipping?.address}</div>
                  <div className="text-xs text-gray-500 mt-2">Method: {selectedOrder.shipping?.method}</div>
                  <div className="text-xs text-gray-500">Tracking: {selectedOrder.shipping?.tracking || '—'}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-md text-sm">{selectedOrder.notes || '—'}</div>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Timeline</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <ul className="space-y-3 text-sm text-gray-700">
                  {/* Simple mocked timeline based on status */}
                  <li>Order placed — {selectedOrder.date}</li>
                  {selectedOrder.status !== 'Pending' && <li>Processed — {selectedOrder.date}</li>}
                  {selectedOrder.status === 'Delivered' && <li>Delivered — {selectedOrder.date}</li>}
                  {selectedOrder.status === 'Cancelled' && <li>Cancelled — {selectedOrder.date}</li>}
                </ul>
              </div>
            </section>

            <div className="flex justify-end gap-3">
              {selectedOrder.status !== 'Cancelled' && (
                <select defaultValue={selectedOrder.status} onChange={e => updateStatus(selectedOrder.id, e.target.value)} className="p-2 border rounded-md">
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              )}
              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(selectedOrder)); alert('Order copied to clipboard (mock)'); }} className="px-4 py-2 border rounded-md">Copy JSON</button>
              <button onClick={() => alert('Open invoice (mock)')} className="px-4 py-2 bg-indigo-600 text-white rounded-md">View Invoice</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function StatusPill({ status }) {
  const colors = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-700",
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
}