import React, { useState } from 'react';
import { BookOpen, Plus, ExternalLink, Trash2, Tag, FileText } from 'lucide-react';

export default function NotesView({ notes, onCreateNote, onDeleteNote }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Web Development');
  const [content, setContent] = useState('');
  const [linkInput, setLinkInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onCreateNote({
      title,
      subject,
      content,
      links: linkInput ? linkInput.split(',').map(l => l.trim()).filter(Boolean) : []
    });

    setTitle('');
    setContent('');
    setLinkInput('');
    setShowForm(false);
  };

  return (
    <div className="notes-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem' }}>Study Notes & Reference Links</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Store essential code snippets, lecture summaries, and documentation links.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> Add Study Note
        </button>
      </div>

      {/* Add Note Card Form */}
      {showForm && (
        <div className="glass-card" style={{ marginBottom: '28px', border: '1px solid var(--border-glass-glow)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>New Study Note</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Note Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Dynamic Programming Memoization Tips"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select 
                  className="form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Backend Engineering">Backend Engineering</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Database Systems">Database Systems</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Note Content / Snippet *</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="Key concepts, commands, or formulas..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Resource Links (Comma separated URLs)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://developer.mozilla.org, https://react.dev"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <FileText size={42} style={{ color: 'var(--text-dim)', marginBottom: '12px' }} />
          <h3>No study notes saved</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Create study notes to attach quick references to your subjects.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {notes.map(note => (
            <div key={note.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span className="badge badge-subject">{note.subject || 'General'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{note.date}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{note.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
                  {note.content}
                </p>
              </div>

              <div>
                {note.links && note.links.length > 0 && (
                  <div style={{ marginBottom: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '6px' }}>Resource Links:</div>
                    {note.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginRight: '12px',
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={12} /> {link.replace(/^https?:\/\//, '')}
                      </a>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="icon-btn delete" onClick={() => onDeleteNote(note.id)} title="Delete Note">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
