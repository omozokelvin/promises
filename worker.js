// workerData is a special object that is passed to the worker thread. It is accessible in the worker thread as well as the parent thread.
// parentPort is a special object that is accessible in the worker thread. It is used to communicate with the parent thread.
const { workerData, parentPort } = require('worker_threads');
const { todosUrl } = require('./_common/constants');

// This function is executed in the worker thread and returns the result to the parent thread.

const startTime = new Date();

const promises$ = workerData.map((id) =>
  fetch(`${todosUrl}/${id}`).then((response) => response.json())
);

return Promise.allSettled(promises$).then((responses) => {
  const todos = [];
  for (const response of responses) {
    if (response.status === 'rejected') {
      console.log(response.reason);
      continue;
    }

    todos.push(response.value);
  }

  const endTime = new Date();
  const timeElapsed = endTime - startTime;

  const response = {
    todos,
    timeElapsed: 'Time taken to fetch data: ' + timeElapsed + 'ms',
  };

  parentPort.postMessage(response);
});
