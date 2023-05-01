import MainClass from './scripts/main-class.js';
import Key from './scripts/key.js';

const mainClass = new MainClass();
let isCtrl = false;
let isEn = localStorage.getItem('keyboardlang') ? localStorage.getItem('keyboardlang') === 'en' : true;

mainClass.getData().then((data) => {
  const textarea = mainClass.createTextarea();
  const container = mainClass.createContainer();
  const keys = data.map((element, i) => {
    const key = new Key(element).createKey(isEn);
    key.addEventListener('click', () => mainClass.checkClick(textarea, element.value, i));
    container.append(key);
    return key;
  });
  mainClass.buttonsElements = keys;
  const text = mainClass.createText();

  // mainClass.activateMouseEnter(textarea);

  function onKeyPress(event) {
    if (event.code === 'Tab') {
      event.preventDefault();
      const start = textarea.selectionStart;
      textarea.value = mainClass.addSymbol(textarea.value, textarea.selectionStart, '    ');
      textarea.selectionEnd = start + 4;
    }
    if (event.code === 'CapsLock') {
      mainClass.isCapslook = true;
    }
    if (event.keyCode == 16) {
      if (isEn) {
        for (let i = 0; i < container.children.length; i++) {
          if (data[i].value2) {
            container.children[i].innerText = data[i].value2;
          }
          if (data[i].value.match(/[a-zA-Z]/) && data[i].value.length === 1) {
            // console.log(data[i].value);
            container.children[i].innerText = data[i].value.toUpperCase();
          }
        }
      } else {
        for (let i = 0; i < container.children.length; i++) {
          if (data[i].value4) {
            container.children[i].innerText = data[i].value4;
          } else if (data[i].value3 && data[i].keycode != 16 && data[i].keycode != 17 && data[i].keycode != 18 && data[i].keycode != 13 && data[i].keycode != 37 && data[i].keycode != 38 && data[i].keycode != 39 && data[i].keycode != 40 && data[i].keycode != 91) {
            // console.log(data[i].value);
            container.children[i].innerText = data[i].value3.toUpperCase();
          }
        }
      }
    }
    if (event.keyCode == 17) {
      isCtrl = true;
    }
    if (event.keyCode == 18) {
      if (isCtrl) {
        if (isEn) {
          for (let i = 0; i < container.children.length; i++) {
            if (data[i].value3) {
              container.children[i].innerText = data[i].value3;
            }
            // if(data[i].value.match(/[a-zA-Z]/) && data[i].value.length === 1) {
            //   // console.log(data[i].value);
            //   container.children[i].innerText = data[i].value.toUpperCase();
            // }
          }
          isEn = false;
          localStorage.setItem('keyboardlang', 'by');
        } else {
          for (let i = 0; i < container.children.length; i++) {
            if (data[i].value && data[i].value !== '&#8896' && data[i].value !== '&#8897') {
              container.children[i].innerText = data[i].value;
            }
            // if(data[i].value.match(/[a-zA-Z]/) && data[i].value.length === 1) {
            //   // console.log(data[i].value);
            //   container.children[i].innerText = data[i].value.toUpperCase();
            // }
          }
          isEn = true;
          localStorage.setItem('keyboardlang', 'en');
        }
      }
    }

    // console.log(event.code);
    textarea.focus();
    const index = data.findIndex(({ code }) => code === event.code);
    if (index && keys[index]) {
      keys[index].classList.add('active');
    }
    if (!keys[index]) {
      // console.log('hghghgh')
      event.preventDefault();
    }
  }

  function onKeyUp(event) {
    if (event.code === 'CapsLock') {
      mainClass.isCapslook = false;
    }
    const index = data.findIndex(({ code }) => code === event.code);
    if (index && keys[index]) {
      keys[index].classList.remove('active');
    }

    if (event.keyCode == 16) {
      if (isEn) {
        for (let i = 0; i < container.children.length; i++) {
          if (data[i].value && data[i].value !== '&#8896' && data[i].value !== '&#8897') {
            container.children[i].innerText = data[i].value;
          }
          if (data[i].value.match(/[a-zA-Z]/ && data[i].value.length === 1)) {
            container.children[i].innerText = data[i].value.toLowerCase();
          }
        }
      } else {
        for (let i = 0; i < container.children.length; i++) {
          if (data[i].value4) {
            container.children[i].innerText = data[i].value;
          } else if (data[i].value3 && data[i].keycode != 16 && data[i].keycode != 17 && data[i].keycode != 18 && data[i].keycode != 13 && data[i].keycode != 37 && data[i].keycode != 38 && data[i].keycode != 39 && data[i].keycode != 40 && data[i].keycode != 91) {
            // console.log(data[i].value);
            container.children[i].innerText = data[i].value3.toLowerCase();
          }
        }
      }
    }

    if (event.keyCode == 17) {
      isCtrl = true;
    }

    if (event.keyCode == 18) {
    }
  }

  mainClass.activateKeyListener(onKeyPress, onKeyUp);
});
