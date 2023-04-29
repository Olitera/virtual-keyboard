import MainClass from './scripts/main-class.js';
import Key from './scripts/key.js';

const mainClass = new MainClass();

mainClass.getData().then((data) => {
  const keys = data.map(element => new Key(element.size));
  // console.log(keys[3].size);  

  const container = mainClass.createContainer();
  data.forEach(element => {
    const key = new Key(element).createKey();
    container.append(key);
  });
});


