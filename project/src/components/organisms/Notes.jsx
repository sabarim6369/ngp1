import React, { useState, useEffect } from 'react';

const Notes = ({ organismId }) => {
  const [notes, setNotes] = useState('');
  

  useEffect(() => {
    const savedNotes = localStorage.getItem(`organism-notes-${organismId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [organismId]);

  // Save notes to localStorage whenever they change
  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(`organism-notes-${organismId}`, newNotes);
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">My Notes</h4>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add your notes here..."
        className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default Notes;