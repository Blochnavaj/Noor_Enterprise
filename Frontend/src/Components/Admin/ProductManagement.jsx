 import React, { useState, useMemo } from "react";
import { assets } from "../../assets/assets";
 

// Product Management Page (single-file React component)
// Tailwind CSS project assumed
// Features:
// - Product list with search, sort, pagination
// - View product details (slide-over)
// - Edit product modal (name, rating, packs, images mock)
// - Delete single & bulk delete
// - Export CSV

const sampleProducts = [
  {
    id: 1,
    name: "Oragnic Amla Power",
    images:[assets.Banana_power],
    rating: 4.5,
    packs: [
      { size: "100g", mrp: 499, price: 349 },
      { size: "500g", mrp: 999, price: 799 },
      { size: "1kg", mrp: 1599, price: 1299 },
    ],
  },
  {
    id: 2,
    name: "Carrot Power",
    images: [assets.Carrot_power],
    rating: 4.2,
    packs: [
      { size: "100g", mrp: 399, price: 299 },
      { size: "500g", mrp: 799, price: 599 },
      { size: "1kg", mrp: 1399, price: 1099 },
    ],
  },
  {
    id: 3,
    name: "Green chili power",
    images: [assets.Mango_power],
    rating: 4.8,
    packs: [
      { size: "100g", mrp: 599, price: 449 },
      { size: "500g", mrp: 1099, price: 899 },
      { size: "1kg", mrp: 1799, price: 1499 },
    ],
  },
  {
    id: 4,
    name: "Mango Power",
    images:  [assets.Moringa_power],
    rating: 4.6,
    packs: [
      { size: "100g", mrp: 699, price: 499 },
      { size: "500g", mrp: 1299, price: 999 },
      { size: "1kg", mrp: 1899, price: 1499 },
    ],
  },
  {
    id: 5,
    name: "Moringa Power",
    images:  [assets.Onion_power],
    rating: 4.3,
    packs: [
      { size: "100g", mrp: 449, price: 299 },
      { size: "500g", mrp: 899, price: 699 },
      { size: "1kg", mrp: 1499, price: 1199 },
    ],
  },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(sampleProducts);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState(new Set());
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter(p => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const k = sortBy.key;
        if (a[k] < b[k]) return sortBy.dir === "asc" ? -1 : 1;
        if (a[k] > b[k]) return sortBy.dir === "asc" ? 1 : -1;
        return 0;
      });
  }, [products, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSelectAll(e) {
    if (e.target.checked) setSelected(new Set(filtered.map(p => p.id)));
    else setSelected(new Set());
  }
  function toggleOne(id) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  }

  function openView(p) {
    setViewProduct(p);
  }
  function closeView() { setViewProduct(null); }

  function openEdit(p = null) {
    setEditProduct(p || { id: null, name: "", images: [], rating: 0, packs: [] });
    setIsEditOpen(true);
  }
  function closeEdit() { setEditProduct(null); setIsEditOpen(false); }

  function saveProduct(prod) {
    if (prod.id) {
      setProducts(prev => prev.map(p => p.id === prod.id ? { ...prod } : p));
    } else {
      const nextId = Math.max(0, ...products.map(p => p.id)) + 1;
      setProducts(prev => [{ ...prod, id: nextId }, ...prev]);
    }
    closeEdit();
  }

  function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    setSelected(s => { const n = new Set(s); n.delete(id); return n; });
  }

  function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} products?`)) return;
    setProducts(prev => prev.filter(p => !selected.has(p.id)));
    setSelected(new Set());
  }

  function exportCSV() {
    const header = ["id", "name", "rating", "packs"].join(',') + '\n';
    const rows = filtered.map(p => [p.id, '"'+p.name+'"', p.rating, '"'+JSON.stringify(p.packs)+'"'].join(',')).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'products.csv'; a.click(); URL.revokeObjectURL(url);
  }

  function changeSort(key) { setSortBy(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' })); }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Product Management</h1>
            <p className="text-sm text-gray-600">Edit, delete and view product details.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => openEdit(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">+ Add product</button>
            <button onClick={exportCSV} className="px-4 py-2 bg-white border rounded-lg">Export CSV</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg mb-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search product name..." className="w-full p-2 border rounded-md" />
          </div>
          <div className="flex gap-2 items-center justify-end">
            <label className="text-sm">Per page:</label>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} className="p-2 border rounded-md w-24">
              {[5,10,20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" onChange={toggleSelectAll} checked={selected.size === filtered.length && filtered.length > 0} aria-label="select all" /></th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => changeSort('name')}>Product {sortBy.key === 'name' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Top pack</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {pageData.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-gray-500">No products found.</td></tr>
              ) : (
                pageData.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleOne(p.id)} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">ID: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{renderStars(p.rating)} <span className="text-xs text-gray-500">{p.rating}</span></td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{p.packs[0].size}</div>
                      <div className="text-xs text-gray-500">MRP {p.packs[0].mrp} • {p.packs[0].price}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openView(p)} className="px-3 py-1 border rounded-md text-sm">View</button>
                        <button onClick={() => openEdit(p)} className="px-3 py-1 border rounded-md text-sm">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 border rounded-md text-sm text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="text-sm">{selected.size} selected</div>
            <button onClick={bulkDelete} className="px-3 py-1 border rounded-md text-sm text-red-600">Delete Selected</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 border rounded-md">Prev</button>
            <div className="px-3 py-1 border rounded-md">{page} / {totalPages}</div>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>

      </div>

      {/* View slide-over */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeView}></div>
          <div className="relative ml-auto w-full max-w-3xl bg-white h-full overflow-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{viewProduct.name}</h2>
                <div className="text-sm text-gray-600">ID: {viewProduct.id}</div>
              </div>
              <div className="flex items-center gap-2">
                <div>{renderStars(viewProduct.rating)}</div>
                <button onClick={closeView} className="px-3 py-1 border rounded-md">Close</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-2">
                  {viewProduct.images.map((img, i) => (
                    <img key={i} src={img} alt={`${viewProduct.name}-${i}`} className="w-full object-cover rounded-md" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Packs</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 text-xs">
                        <th>Size</th>
                        <th>MRP</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewProduct.packs.map((pack, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="py-2">{pack.size}</td>
                          <td className="py-2">{pack.mrp}</td>
                          <td className="py-2 font-semibold">{pack.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Actions</h3>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(viewProduct)); alert('Copied product JSON'); }} className="px-4 py-2 border rounded-md">Copy JSON</button>
                    <button onClick={() => { openEdit(viewProduct); }} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Edit Product</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Edit modal */}
      {isEditOpen && editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeEdit}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl z-10 p-6">
            <h2 className="text-xl font-semibold mb-4">{editProduct.id ? 'Edit product' : 'Add product'}</h2>
            <ProductForm product={editProduct} onCancel={closeEdit} onSave={saveProduct} />
          </div>
        </div>
      )}

    </div>
  );
}

function renderStars(r) {
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  const stars = [];
  for (let i = 0; i < full; i++) stars.push('★');
  if (half) stars.push('½');
  while (stars.length < 5) stars.push('☆');
  return <span className="text-yellow-500 mr-2">{stars.join('')}</span>;
}

function ProductForm({ product, onCancel, onSave }) {
  const [form, setForm] = useState({ ...product });

  function update(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function updatePack(idx, k, v) {
    setForm(prev => {
      const packs = prev.packs.map((p, i) => i === idx ? { ...p, [k]: v } : p);
      return { ...prev, packs };
    });
  }

  function addPack() { setForm(prev => ({ ...prev, packs: [...prev.packs, { size: 'New', mrp: 0, price: 0 }] })); }
  function removePack(idx) { setForm(prev => ({ ...prev, packs: prev.packs.filter((_, i) => i !== idx) })); }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) { alert('Name required'); return; }
    onSave(form);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Name</label>
          <input value={form.name} onChange={e => update('name', e.target.value)} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="text-sm">Rating</label>
          <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => update('rating', Number(e.target.value))} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <div>
        <label className="text-sm">Images (mock URLs)</label>
        <textarea value={form.images.join('\n')} onChange={e => update('images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} className="w-full p-2 border rounded-md h-24" />
        <div className="text-xs text-gray-500 mt-1">One URL per line. In real app you'd upload to Cloudinary/S3 and store URLs.</div>
      </div>

      <div>
        <label className="text-sm">Packs</label>
        <div className="space-y-2 mt-2">
          {form.packs.map((pack, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2 items-center">
              <input value={pack.size} onChange={e => updatePack(idx, 'size', e.target.value)} className="p-2 border rounded-md" />
              <input type="number" value={pack.mrp} onChange={e => updatePack(idx, 'mrp', Number(e.target.value))} className="p-2 border rounded-md" />
              <input type="number" value={pack.price} onChange={e => updatePack(idx, 'price', Number(e.target.value))} className="p-2 border rounded-md" />
              <div className="flex gap-2">
                <button type="button" onClick={() => removePack(idx)} className="px-3 py-1 border rounded-md text-sm text-red-600">Remove</button>
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={addPack} className="px-3 py-1 border rounded-md">+ Add pack</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save product</button>
      </div>
    </form>
  );
}