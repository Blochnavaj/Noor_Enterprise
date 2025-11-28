 import React, { useState } from "react";

/**
 * AddProductUI.jsx
 * UI-only Tailwind form (no backend).
 * Paste this file and import/use wherever needed.
 */

export default function AddProduct({ onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("4.5");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [packs, setPacks] = useState([{ size: "100g", mrp: "", price: "" }]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const addPack = () => setPacks((p) => [...p, { size: "", mrp: "", price: "" }]);
  const removePack = (i) => setPacks((p) => p.filter((_, idx) => idx !== i));
  const updatePack = (i, field, value) => setPacks((p) => p.map((it, idx) => idx === i ? { ...it, [field]: value } : it));

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const v = tagInput.trim().replace(/,$/, "");
      if (v && !tags.includes(v)) setTags((t) => [...t, v]);
      setTagInput("");
    }
  };
  const removeTag = (t) => setTags((ts) => ts.filter((x) => x !== t));

  const submit = (e) => {
    e.preventDefault();
    const payload = { name, rating, packs, tags };
    if (onSubmit) onSubmit(payload);
    alert("UI-only: The form is a preview. Use the full version to send to backend.");
    console.log("Preview payload:", payload);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Add Product (UI Preview)</h3>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Product name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none" placeholder="Organic Amla Power" />
              </div>
              <div>
                <label className="text-sm font-medium">Rating</label>
                <input type="number" min="0" max="5" step="0.1" value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Images (preview)</label>
              <div className="mt-2 flex items-center gap-4">
                <label className="w-44 h-28 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  <span className="text-sm text-slate-500">Choose images</span>
                </label>

                <div className="flex gap-3 overflow-x-auto">
                  {imagePreviews.length === 0 ? (
                    <div className="w-48 h-28 rounded-lg border flex items-center justify-center text-slate-300">No preview</div>
                  ) : (
                    imagePreviews.map((s, i) => (
                      <div key={i} className="w-28 h-28 rounded-lg overflow-hidden border">
                        <img src={s} alt={`p${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Packs</label>
                <button type="button" onClick={addPack} className="text-indigo-600 text-sm">+ Add</button>
              </div>
              <div className="mt-3 space-y-3">
                {packs.map((p, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <input placeholder="size (100g)" value={p.size} onChange={(e)=> updatePack(i, "size", e.target.value)}
                      className="col-span-5 px-3 py-2 border rounded" />
                    <input placeholder="MRP" type="number" value={p.mrp} onChange={(e)=> updatePack(i, "mrp", e.target.value)}
                      className="col-span-3 px-3 py-2 border rounded" />
                    <input placeholder="Price" type="number" value={p.price} onChange={(e)=> updatePack(i, "price", e.target.value)}
                      className="col-span-3 px-3 py-2 border rounded" />
                    <div className="col-span-1 text-right">
                      {i > 0 ? <button type="button" onClick={()=> removePack(i)} className="text-red-500 text-sm">Remove</button> :
                        <span className="text-xs text-slate-400">Base</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tags</label>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {tags.map((t)=> (
                  <div key={t} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center gap-2">
                    <span>{t}</span>
                    <button type="button" onClick={()=> removeTag(t)} className="text-indigo-600">×</button>
                  </div>
                ))}

                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                  onBlur={() => { if (tagInput.trim()) { setTags(prev => prev.includes(tagInput.trim()) ? prev : [...prev, tagInput.trim()]); setTagInput(""); } }}
                  placeholder="Type tag and press Enter" className="px-3 py-2 border rounded" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </form>
        </div>

        <p className="mt-3 text-xs text-slate-400 text-center">UI-only preview. Use backend-integrated version to save data.</p>
      </div>
    </div>
  );
}
