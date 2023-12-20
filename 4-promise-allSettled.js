// in parallel using Promise.allSettled

const { todoIds, todosUrl } = require('./_common/constants');

const getTodos = async () => {
  const startTime = new Date();

  const promises$ = todoIds.map((id) =>
    fetch(`${todosUrl}/${id}`).then((response) => response.json())
  );

  const responses = await Promise.allSettled(promises$);

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

  return {
    todos,
    timeElapsed: `Time taken to fetch data: ${timeElapsed} ms`,
  };
};

getTodos().then(console.log).catch(console.error);
