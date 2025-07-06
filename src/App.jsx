import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [Tasklist, setTasklist] = useState([]);
  const [Task, setTask] = useState('');

  const deleteTask = (indexToDelete) => {
    const updatedTasklist = Tasklist.filter((_, i) => i !== indexToDelete);
    setTasklist(updatedTasklist);
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-pink-500 to-blue-400 pt-64'>
      <nav className="h-16 fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md flex items-center justify-between z-50 px-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold">TaskMate</h2>
        </div>
        <div className="bg-blue-600 h-full flex items-center px-4">
          <button className="text-white px-4 py-1 rounded hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </nav>
      <main className="flex justify-center items-center ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-7 rounded-3xl shadow-2xl bg-white/80 w-full max-w-xl"
        >
          <h1 className="text-4xl my-10 font-bold text-gray-800">To Do List</h1>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Type task"
              className="px-3 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={Task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && Task.trim() !== '') {
                  setTasklist([...Tasklist, Task]);
                  setTask('');
                }
              }}
            />
            <button
              className="px-5 py-2 ml-2 bg-blue-700 text-white rounded-lg hover:bg-gradient-to-r from-blue-400 via-pink-500 to-blue-400 transition"
              onClick={() => {
                if (Task.trim() !== '') {
                  setTasklist([...Tasklist, Task]);
                  setTask('');
                }
              }}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </main>
      {Tasklist.length > 0 && (
        <motion.section
          className="mt-10 max-w-2xl mx-auto bg-white/30 rounded-3xl shadow-xl p-6 backdrop-blur-md"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {Tasklist.map((t, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/20 px-4 py-2 rounded-2xl shadow text-gray-800 border border-white/30 flex justify-between items-center backdrop-blur-sm"
                >
                  <span className="break-words">{t}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.section>
      )}
    </div>
  );
};

export default App;
