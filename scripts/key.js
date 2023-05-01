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

  createKey() {
    const key = document.createElement('div');
    key.className = "key";
    key.innerHTML = this.value;
    key.classList.add(this.size);
    return key;
  }
  
} 

export default Key;