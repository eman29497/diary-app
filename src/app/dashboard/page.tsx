'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/diaries');
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchEntries();
  }, []);


  const handleAddEntry = async () => {
    if (!title || !content) return;
    try {
      await axios.post('http://localhost:5000/api/diaries/add', { title, content });
      setTitle('');
      setContent('');
      const res = await axios.get('http://localhost:5000/api/diaries');
      setEntries(res.data);
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/diaries/delete/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Diary</h1>
        <div className="space-y-4 mb-8">
          <input 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 h-32"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button 
            onClick={handleAddEntry}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Save Entry
          </button>
        </div>
        <div className="space-y-4">
          {entries.map((entry: any) => (
            <div key={entry._id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 break-words">{entry.title}</h3>
                <p className="text-gray-600 text-sm mt-1 break-words">{entry.content}</p>
              </div>
              <button 
                onClick={() => handleDelete(entry._id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}