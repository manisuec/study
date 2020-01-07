let delay = x => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Delay', x);
      return resolve();
    }, x);
  });
};

let arr = [delay, delay, delay];

const f1 = async arr => {
  for (let elem of arr) {
    await elem();
  }
};

const f2 = arr => {
  let x = 0;

  return arr.reduce((p, elem) => {
    return p.then(() => {
      elem(++x * 1000);
    });
  }, Promise.resolve());
};

// f1(arr);

f2(arr);
