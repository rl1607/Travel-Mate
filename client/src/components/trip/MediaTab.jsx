import React, { useState } from "react";
import API from "../../api/axios";

export default function MediaTab({ trip, onSaved }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose a file");
    setSaving(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("caption", caption);
      await API.post(`/trips/${trip._id}/media`, data, { headers: { "Content-Type": "multipart/form-data" } });
      setCaption("");
      setFile(null);
      if (onSaved) onSaved();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to upload");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h3>Upload Media</h3>
        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <label>Caption (optional)</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption for your photo..." />

          <label style={{ marginTop: 8 }}>Photo / Video</label>
          <div className="upload-box" onClick={() => document.getElementById("media-file")?.click()}>
            <input id="media-file" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            <div style={{ textAlign: "center", color: "#888" }}>
              {file ? file.name : "Click to upload photo or video"}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
            <button type="button" className="btn-ghost" onClick={() => { setCaption(""); setFile(null); }}>
              Cancel
            </button>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Uploading..." : "Add Media"}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Media</h3>
        {(!trip.media || trip.media.length === 0) ? (
          <div className="card" style={{ textAlign: "center", color: "#888" }}>No photos or videos yet</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {trip.media.map((m, i) => (
              <div key={i} className="card">
                <div style={{ height: 160, background: `url(${m.file}) center/cover`, borderRadius: 8 }} />
                <div style={{ paddingTop: 8 }}>{m.caption}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
