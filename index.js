import MainClass from './scripts/main-class.js';
import Key from './scripts/key.js';

const mainClass = new MainClass();



mainClass.getData().then((data) => {
  const textarea = mainClass.createTextarea();
  const container = mainClass.createContainer();
  const keys = data.map((element) => {
    const key = new Key(element).createKey();
    key.addEventListener('click', ()=> mainClass.checkClick(textarea, element.value));
    container.append(key);
    return key;
  });

  // mainClass.activateMouseEnter(textarea);

  function onKeyPress(event) {
    textarea.focus();
    const index = data.findIndex(({code}) => code === event.code );
    if(index){
      keys[index].classList.add('active');;  
    }
  }

  function onKeyUp(event) {
    const index = data.findIndex(({code}) => code === event.code );
    if(index){
      keys[index].classList.remove('active');  
    }
  }
  
  mainClass.activateKeyListener(onKeyPress, onKeyUp);
  


});


