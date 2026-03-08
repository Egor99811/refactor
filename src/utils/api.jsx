export function emulateApiCall(
  response,
  errorMessage = "Ошибка при выполнении API вызова",
  delay = 100,
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error(errorMessage));
      } else {
        resolve(response);
      }
    }, delay);
  });
}
