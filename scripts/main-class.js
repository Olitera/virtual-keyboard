const body = document.querySelector('body');

class MainClass {
  isCapslook = false;

  keyboard;

  buttonsElements;

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
    textarea.className = 'textarea';
    body.append(textarea);
    return textarea;
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'container';
    body.append(container);
    return container;
  }

  createText() {
    const text = document.createElement('p');
    text.className = 'text';
    text.innerHTML = 'Language switch: Ctrl + Alt<br>Implemented on MacOs';
    body.append(text);
    return text;
  }

  checkClick(textarea, keyValue, index) {
    console.log(keyValue);
    const currentPosition = textarea.selectionStart;
    textarea.focus();
    switch (keyValue) {
      case 'Backspace':
        if (currentPosition > 0) {
          textarea.value = this.removeSymbol(textarea.value, currentPosition - 1);
          textarea.selectionStart = currentPosition - 1;
          textarea.selectionEnd = currentPosition - 1;
        }
        break;
      case 'ENTER':
        textarea.value += '\n';
        break;
      case 'Caps Lock':
        this.isCapslook = !this.isCapslook;
        this.buttonsElements[index].classList.toggle('active');
        break;
      case 'Tab':
        textarea.value += '    ';
        break;
      case 'DEL':
        textarea.value = this.removeSymbol(textarea.value, currentPosition);
        textarea.selectionStart = currentPosition;
        textarea.selectionEnd = currentPosition;
        break;
      case 'Shift':
        textarea.value;
        break;
      case 'Alt':
        break;
      case 'Ctrl':
        break;
      case 'Cmd':
        break;
      case '&#8896':// up
        const matrix = textarea.value.split('\n').map((el) => el.split(''));
        let curI = 0;
        let curJ = 0;
        let a = 0;

        const indexArray = matrix.map((element, i) => {
          const b = matrix[i].map((el, j) => {
            if (a === textarea.selectionStart) {
              curI = i;
              curJ = j;
            }
            a++;
            return a - 1;
          });
          a++;
          return b;
        });
        console.log(matrix, textarea.selectionStart, { curI, curJ }, indexArray);
        textarea.selectionStart = indexArray[curI - 1][curJ];
        textarea.selectionEnd = indexArray[curI - 1][curJ];
        break;
      case '&#8897': // down
        textarea.selectionStart = this.checkPosition(textarea).indexArray[this.checkPosition(textarea).curI + 1][this.checkPosition(textarea).curJ];
        textarea.selectionEnd = textarea.selectionStart;
        break;
      case '>':
        textarea.selectionStart += 1;
        // textarea.selectionEnd += 1;

        break;
      case '<':
        console.log(textarea.selectionStart, 'ff', textarea.selectionEnd);
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

  addSymbol(text, position, symbol) {
    if (this.isCapslook) {
      symbol = symbol.toUpperCase();
    }
    const arr = text.split('');
    arr.splice(position, 0, symbol);
    return arr.join('');
  }

  removeSymbol(text, position) {
    const arr = text.split('');
    console.log(arr);
    arr.splice(position, 1);
    return arr.join('');
  }

  checkPosition(textarea) {
    const matrix = textarea.value.split('\n').map((el) => el.split(''));
    let curI = 0;
    let curJ = 0;
    let a = 0;

    const indexArray = matrix.map((element, i) => {
      const b = matrix[i].map((el, j) => {
        if (a === textarea.selectionStart) {
          curI = i;
          curJ = j;
        }
        a++;
        return a - 1;
      });
      a++;
      return b;
    });
    return { indexArray, curI, curJ };
    // console.log(matrix, textarea.selectionStart, {curI, curJ}, indexArray)
    // textarea.selectionStart = indexArray[curI-1][curJ];
    // textarea.selectionEnd = indexArray[curI-1][curJ];
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
