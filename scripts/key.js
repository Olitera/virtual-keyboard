class Key {
  constructor(data) {
    this.size = data.size;
    this.value = data.value;
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