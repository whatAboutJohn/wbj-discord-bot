export default class Overwatch {
  constructor(bot) {
    return new Promise((resolve, reject) => {
      console.log('Overwatch command loaded.');
      setTimeout(() => {
        console.log('...done!');
        return resolve(this);
      }, 3000);
    });
  }

  test() { console.log('test called.') };
}
