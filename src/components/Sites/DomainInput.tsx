import React, { useState } from 'react';

interface DomainInputProps {
  onAdd: (domain: string) => void;
}

const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

export const DomainInput: React.FC<DomainInputProps> = ({ onAdd }) => {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const validateDomain = (domain: string): boolean => {
    domain = domain.toLowerCase();
    if (!domain) {
      setError('Domain is required');
      return false;
    }
    if (!domainRegex.test(domain)) {
      setError('Invalid domain format');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domain.trim().toLowerCase();
    
    if (validateDomain(cleanDomain)) {
      onAdd(cleanDomain);
      setDomain('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g. facebook.com"
          className={`
            flex-grow px-3 py-2 rounded-lg border
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
};