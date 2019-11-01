const ul = document.createElement('ul');
const textarea = document.createElement('textarea');
document.body.appendChild(textarea);
document.body.appendChild(ul);


const keyStorage = {
  code: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
    'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO',
    'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH',
    'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN',
    'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight',
    'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
  ru: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'xz!!',
    'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift',
    'ctrl', 'win', 'alt', ' ', 'alt', '◀', '▼', '▶', 'ctrl'],
  en: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'xz!!',
    'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'xz', 'enter',
    'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
    'ctrl', 'win', 'alt', ' ', 'alt', '◀', '▼', '▶', 'ctrl'],
};


class Box {
  constructor(rutext, entext, code) {
    this.rutext = rutext;
    this.entext = entext;
    this.code = code;
    const li = document.createElement('li');
    this.elem = li;
  }

  setText() {
    if (localStorage.getItem('lang') === null || localStorage.getItem('lang') === 'ru') {
      this.elem.textContent = this.rutext;
    } else {
      this.elem.textContent = this.entext;
    }
  }
}


for (let i = 0; i < 63; i += 1) {
  const button = new Box(keyStorage.ru[i], keyStorage.en[i], keyStorage.code[i]);
  button.setText();
  ul.appendChild(button.elem);
  button.elem.classList.add('button', keyStorage.code[i].toLocaleLowerCase());
}
