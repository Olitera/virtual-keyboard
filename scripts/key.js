class Key {
  constructor(data) {
    this.size = data.size;
    this.value = data.value;
    this.keyCode = data.keyCode;
    this.code = data.code;
    this.value2 = data.value2;
    this.value3 = data.value3;
    this.value4 = data.value4;
  }

  createKey(isEn) {
    const key = document.createElement('div');
    key.className = 'key';
    if (isEn || !this.value3) {
      key.innerHTML = this.value;
    } else {
      key.innerHTML = this.value3;
    }
    key.classList.add(this.size);
    return key;
  }
}

export default Key;
