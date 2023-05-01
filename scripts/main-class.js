const body = document.querySelector('body');

class MainClass {
  keyboard;

  getData() {
    return fetch('keyboard.json')
      .then((response) => response.json())
      .then((data) => {
        this.keyboard = data;
        return data;
      });
  }

  createTextarea() {
    const textarea = document.createElement('textarea');
    textarea.className = "textarea";
    body.append(textarea);
    return textarea;
  }

  createContainer() {
    const container = document.createElement(`div`);
    container.className = "container";
    body.append(container);
    return container;
  }

  checkClick(textarea, keyValue) {
    const currentPosition = textarea.selectionStart;
    textarea.focus();
    switch (keyValue) {
      case 'Backspace':
        if(currentPosition > 0) {
          textarea.value = this.removeSymbol(textarea.value, currentPosition - 1);
          textarea.selectionStart = currentPosition - 1;
          textarea.selectionEnd = currentPosition - 1;
        }
        break;
      case 'ENTER':
        textarea += '\n';
        break;
      case 'Caps Lock':
        // textarea.value = textarea.value.toUpperCase();
        break;
      case 'Tab':
        textarea += '    ';
        break;
      case 'DEL':
        textarea.value = this.removeSymbol(textarea.value, currentPosition);
        textarea.selectionStart = currentPosition;
        textarea.selectionEnd = currentPosition;
        break;
      case 'Shift':
        break;
      case 'Alt':
        break;
      case 'Ctrl':
        break;
      case 'Win':
        break;
      case '&#8896':
        break;
      case '&#8897':
        break;
      case '>':
        textarea.selectionStart += 1;
        textarea.selectionEnd += 1;
        
        break;
      case '<':
        if (textarea.selectionStart > 0) {
        textarea.selectionStart -= 1;
        textarea.selectionEnd -= 1;
        }
        console.log(textarea.selectionStart);
        break;
      default:
        textarea.value = this.addSymbol(textarea.value, currentPosition, keyValue);
        textarea.selectionStart = currentPosition + 1;
        textarea.selectionEnd = currentPosition + 1;
    }
    return textarea;
  }

  addSymbol(text, position, symbol){
    const arr = text.split('');
    arr.splice(position, 0, symbol);
    return arr.join('');
  }

  removeSymbol(text, position) {
    const arr = text.split('');
    arr.splice(position, 1);
    return arr.join('');
  }

  // setPosition(position) {
  //   this.textarea.selectionStart = position;
  //   this.textarea.selectionEnd = position;
  // }

  activateKeyListener(funcDown, funcUp) {
    body.addEventListener('keydown', (event) => funcDown(event));
    body.addEventListener('keyup', (event) => funcUp(event));
  }

  activateMouseEnter(element) {
    body.addEventListener('mouseover', () => element.selected());
  }
}

export default MainClass;