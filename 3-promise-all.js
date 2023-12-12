const { todoIds, todosUrl } = require('./_common/constants');

// Fetching todos in parallel using Promise.all

const getTodos = async () => {
  const startTime = new Date();

  const promises$ = todoIds.map((id) =>
    fetch(`${todosUrl}/${id}`).then((response) => response.json())
  );

  const todos = await Promise.all(promises$);

  const endTime = new Date();
  const timeElapsed = endTime - startTime;

  return {
    todos,
    timeElapsed: 'Time taken to fetch data: ' + timeElapsed + 'ms',
  };
};

getTodos().then(console.log).catch(console.error);
