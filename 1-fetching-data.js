// Fetching data using the fetch API

const { todosUrl } = require('./_common/constants');

const getTodos = async () => {
  const startTime = new Date();

  const response = await fetch(todosUrl);
  const todos = await response.json();

  const endTime = new Date();
  const timeElapsed = endTime - startTime;

  return {
    todos,
    timeElapsed: `Time taken to fetch data: ${timeElapsed} ms`,
  };
};

getTodos().then(console.log).catch(console.error);
