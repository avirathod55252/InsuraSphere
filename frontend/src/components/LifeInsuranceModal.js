// {
//   /* Applications Section */
// }
// <div className="bg-white rounded-2xl shadow p-6">
//   <h2 className="text-lg font-semibold text-gray-800 mb-4">
//     Customer Applications (Life / Health / Auto / Home)
//   </h2>

//   <div className="space-y-3 max-h-[70vh] overflow-y-auto">
//     {apps.length > 0 ? (
//       apps.map((app) => (
//         <div
//           key={app.id}
//           className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-md"
//         >
//           <h3 className="font-semibold text-blue-700 text-lg">
//             {app.userName || "Unknown User"}
//           </h3>

//           <p className="text-sm text-gray-600">
//             <strong>Policy Applied:</strong> {app.policyType}
//           </p>

//           {/* Life Insurance Extra Data */}
//           {app.policyType === "Life" && (
//             <div className="mt-2 text-sm text-gray-700 space-y-1">
//               <p>
//                 📌 Coverage:{" "}
//                 <strong>₹{app.coverageAmount?.toLocaleString()}</strong>
//               </p>
//               <p>
//                 📌 Term: <strong>{app.term} years</strong>
//               </p>
//               <p>
//                 📌 Payment Mode: <strong>{app.frequency}</strong>
//               </p>
//               <p>
//                 📌 Expected Premium:{" "}
//                 <strong>₹{app.premiumAmount?.toLocaleString()}</strong>
//               </p>
//             </div>
//           )}

//           <p className="text-sm text-gray-500 mt-2">
//             Submitted On: {new Date(app.createdAt).toLocaleDateString()}
//           </p>

//           {/* Status */}
//           <p className="mt-2 text-sm">
//             Status:{" "}
//             <span
//               className={
//                 app.status === "approved"
//                   ? "text-green-600 font-bold"
//                   : app.status === "rejected"
//                   ? "text-red-600 font-bold"
//                   : "text-blue-600 font-bold"
//               }
//             >
//               {app.status.toUpperCase()}
//             </span>
//           </p>

//           {/* Approve / Reject Actions */}
//           {app.status === "pending" && (
//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => decide(app.id, "approved")}
//                 className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => decide(app.id, "rejected")}
//                 className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500">No customer applications yet.</p>
//     )}
//   </div>
// </div>;
