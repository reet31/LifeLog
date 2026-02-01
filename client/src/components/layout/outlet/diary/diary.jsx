import React, { useState, useEffect } from "react";
import "./diary.css";

const moods = ["😊", "😌", "😔", "😡", "✨"];

const Diary = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("😊");
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    });

    if (res.ok) {
      setIsAuth(true);
    }
  };

  checkAuth();
}, []);

useEffect(() => {
  if (isAuth) {
    fetchEntries();
  }
}, [isAuth]);


  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/diary", 
        
        { credentials: "include" });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch diary entries", err);
    }
  };

  // 🔹 Add entry
  const addNote = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, mood }),
      });

      const savedNote = await res.json();
      setNotes([savedNote, ...notes]);
      setText("");
    } catch (err) {
      console.error("Failed to add note", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete entry
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/diary/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="diary-page">
      <h2>My Diary 🌸</h2>

      {/* Editor */}
      <div className="diary-editor">
        <textarea
          placeholder="Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="editor-actions">
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            {moods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <button onClick={addNote} disabled={loading}>
            {loading ? "Saving..." : "+ Add"}
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="diary-grid">
        {notes.map((note) => (
          <div key={note._id} className="diary-card">
            <div className="card-header">
              <span>{note.mood}</span>
              <small>{new Date(note.createdAt).toLocaleDateString()}</small>
            </div>

            <p>{note.text}</p>

            <button
              className="delete-btn"
              onClick={() => deleteNote(note._id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
