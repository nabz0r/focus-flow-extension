import React, { useState } from 'react';

interface AddSiteProps {
  onAdd: (site: string) => void;
}

export const AddSite: React.FC<AddSiteProps> = ({ onAdd }) => {
  const [site, setSite] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!site.trim()) return;

    onAdd(site.trim());
    setSite('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="Enter domain (e.g. facebook.com)"
          className="flex-grow p-2 border rounded"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};