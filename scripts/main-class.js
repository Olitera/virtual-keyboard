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
}

export default MainClass;