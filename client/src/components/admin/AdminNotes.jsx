import { useState } from "react";

export default function AdminNotes() {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-3">
        Internal Admin Notes
      </h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="4"
        className="w-full border rounded-lg p-3
                   focus:ring-2 focus:ring-indigo-500"
        placeholder="Add internal notes here..."
      />

      <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg">
        Save Note
      </button>
    </div>
  );
}
