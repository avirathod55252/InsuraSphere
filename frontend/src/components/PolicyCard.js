import React from 'react';

export default function PolicyCard({ p, onApply }){
  return (
    <div className="border p-4 rounded bg-white">
      <h3 className="font-semibold">{p.title}</h3>
      <div className="text-sm text-gray-600">Type: {p.type}</div>
      <div className="mt-2">{p.details}</div>
      <div className="mt-3 flex justify-between items-center">
        <div className="font-bold">₹{p.premium}</div>
        {onApply && <button onClick={()=>onApply(p.id)} className="px-3 py-1 bg-green-600 text-white rounded">Apply</button>}
      </div>
    </div>
  );
}
