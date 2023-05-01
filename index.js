import MainClass from './scripts/main-class.js';
import Key from './scripts/key.js';

const mainClass = new MainClass();



mainClass.getData().then((data) => {
  const textarea = mainClass.createTextarea();
  const container = mainClass.createContainer();
  const keys = data.map((element, i) => {
    const key = new Key(element).createKey();
    key.addEventListener('click', ()=> mainClass.checkClick(textarea, element.value, i));
    container.append(key);
    return key;
  });
  mainClass.buttonsElements = keys;

  // mainClass.activateMouseEnter(textarea);

  function onKeyPress(event) {
    if (event.code === 'CapsLock') {
      mainClass.isCapslook = true;
    }
    console.log(event.code);
    textarea.focus();
    const index = data.findIndex(({code}) => code === event.code );
    if(index){
      keys[index].classList.add('active');;  
    }
  }

  function onKeyUp(event) {
    if (event.code === 'CapsLock') {
      mainClass.isCapslook = false;
    }
    const index = data.findIndex(({code}) => code === event.code );
    if(index){
      keys[index].classList.remove('active');  
    }
  }
  
  mainClass.activateKeyListener(onKeyPress, onKeyUp);
  


});


