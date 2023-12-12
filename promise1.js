const { todoIds, todosUrl } = require('./constants');

// Using async/await - blocking
const getTodos = async () => {
  const startTime = new Date();

  const todos = [];
  for (const id of todoIds) {
    const todo = await fetch(`${todosUrl}/${id}`).then((response) =>
      response.json()
    );

    todos.push(todo);
  }

  const endTime = new Date();
  const timeElapsed = endTime - startTime;

  return {
    todos,
    timeElapsed: 'Time taken to fetch data: ' + timeElapsed + 'ms',
  };
};

getTodos().then(console.log).catch(console.error);
