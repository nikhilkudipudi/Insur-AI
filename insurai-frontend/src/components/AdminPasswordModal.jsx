import { useState } from "react";

export default function AdminPasswordModal({ onConfirm, onCancel }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-3 text-center text-green-700">
          Enter Admin Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="Admin Password"
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
