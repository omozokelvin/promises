const { Worker } = require('worker_threads');
const { todoIds } = require('./_common/constants');

// Overkill using a worker thread in node.js for this example, but it's a good example of how to use worker threads in node.js.

const getTodos = () => {
  const worker = new Worker('./worker.js', { workerData: todoIds });

  return new Promise((resolve, reject) => {
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

getTodos().then(console.log).catch(console.error);
