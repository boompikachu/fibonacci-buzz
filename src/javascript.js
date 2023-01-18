const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(prompt) {
  return new Promise((callbackFn, errorFn) => {
    rl.question(
      prompt,
      (input) => {
        callbackFn(input);
      },
      () => {
        errorFn();
      }
    );
  });
}

async function askForInput() {
  let startingNumber = Number(await input("Starting number: "));
  let length = Number(await input("Length: "));

  if (
    isNaN(startingNumber) ||
    isNaN(length) ||
    typeof startingNumber !== "number" ||
    typeof length !== "number" ||
    startingNumber < 0 ||
    length < 0
  ) {
    console.log("\nPlease enter a valid number\n");
    return askForInput();
  }

  return {
    startingNumber,
    length,
  };
}

function fibonacciBuzz(n, l) {
  let lastFiboNumber = 0;
  let currentFiboNumber = 1;

  while (currentFiboNumber < n) {
    const temp = lastFiboNumber;
    lastFiboNumber = currentFiboNumber;
    currentFiboNumber += temp;
  }

  for (let index = n; index < n + l; index++) {
    let prefix = "";

    if (currentFiboNumber === index) {
      prefix += "Fibo";

      while (currentFiboNumber < index + 1) {
        const temp = lastFiboNumber;
        lastFiboNumber = currentFiboNumber;
        currentFiboNumber += temp;
      }
    }

    if (index % 3 === 0) {
      prefix += "Fizz";
    }
    if (index % 5 === 0) {
      prefix += "Buzz";
    }
    console.log(`${prefix} ${index}`);
  }
}

async function main() {
  const { startingNumber, length } = await askForInput();
  fibonacciBuzz(startingNumber, length);
  rl.close();
}

main();
