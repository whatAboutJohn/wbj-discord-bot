import Commands from './commands';
import bot from './Bot';

export default {
  init() {
    console.log('Commands loaded.');

    Commands.map(Klass => {
      this[Klass.name] = new Klass();
    });
  }
}
