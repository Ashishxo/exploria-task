export const expensiveFunction = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Math.abs(Math.sin(inputValue) * 1000) + 1;
        resolve(Math.floor(result));
      }, 2000);
    });
  };
  