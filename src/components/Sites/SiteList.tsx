import React from 'react';

interface SiteListProps {
  sites: string[];
  onRemove: (site: string) => void;
}

export const SiteList: React.FC<SiteListProps> = ({ sites, onRemove }) => {
  if (sites.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No sites blocked yet
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {sites.map(site => (
        <li 
          key={site}
          className="flex justify-between items-center p-2 bg-gray-50 rounded"
        >
          <span>{site}</span>
          <button
            onClick={() => onRemove(site)}
            className="text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};