import keyStorage from './storage';

const ul = document.createElement('ul');
const textarea = document.createElement('textarea');
document.body.appendChild(textarea);
document.body.appendChild(ul);

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

function CapsLock() {
  if (localStorage.capslock === null || localStorage.capslock === 'false') {
    localStorage.setItem('capslock', true);
    keyStorage.link[keyStorage.code.indexOf('CapsLock')].classList.add('click');
    keyStorage.code.forEach((item, i) => {
      if (keyStorage.link[i].classList.contains('specialButton')) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toLowerCase();
      } else {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
      }
    });
  } else {
    localStorage.setItem('capslock', false);
    keyStorage.link[keyStorage.code.indexOf('CapsLock')].classList.remove('click');
    keyStorage.code.forEach((item, i) => {
      keyStorage.link[i].textContent = keyStorage.link[i].textContent.toLowerCase();
    });
  }
}

function Shift() {
  keyStorage.shiftArray.length = 0;
  keyStorage.link.forEach((item, i) => {
    if (keyStorage.link[i].classList.contains('firstLine')) {
      keyStorage.shiftArray.push(keyStorage.link[i]);
      keyStorage.firstline.push(keyStorage.link[i].textContent);
    }
    if (localStorage.capslock === 'false' && !(keyStorage.link[i].classList.contains('specialButton'))) {
      keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
    }
    if (localStorage.capslock === 'true' && !(keyStorage.link[i].classList.contains('specialButton'))) {
      keyStorage.link[i].textContent = keyStorage.link[i].textContent.toLowerCase();
    }
  });
  keyStorage.shiftArray.forEach((item, i) => {
    keyStorage.shiftArray[i].textContent = keyStorage.firstlineS[i];
  });
}

function ChangeLanguage() {
  if (localStorage.lang === null || localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
    keyStorage.code.forEach((item, i) => {
      keyStorage.link[i].textContent = keyStorage.en[i];
      if (localStorage.capslock === 'true' && !(keyStorage.link[i].classList.contains('specialButton'))) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
      }
    });
  } else {
    localStorage.setItem('lang', 'ru');
    keyStorage.code.forEach((item, i) => {
      keyStorage.link[i].textContent = keyStorage.ru[i];
      if (localStorage.capslock === 'true' && !(keyStorage.link[i].classList.contains('specialButton'))) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
      }
    });
  }
}

for (let i = 0; i < 63; i += 1) {
  const button = new Box(keyStorage.ru[i], keyStorage.en[i], keyStorage.code[i]);
  button.setText();
  ul.appendChild(button.elem);
  button.elem.classList.add('button', keyStorage.code[i].toLocaleLowerCase());
  if (button.elem.textContent === 'tab'
  || button.elem.textContent === 'shift'
  || button.elem.textContent === 'caps lock'
  || button.elem.textContent === 'backspace'
  || button.elem.textContent === 'alt'
  || button.elem.textContent === 'enter'
  || button.elem.textContent === 'ctrl'
  || button.elem.textContent === 'win') {
    button.elem.classList.add('specialButton');
  }
  if (button.elem.textContent === '1'
  || button.elem.textContent === '2'
  || button.elem.textContent === '3'
  || button.elem.textContent === '4'
  || button.elem.textContent === '5'
  || button.elem.textContent === '6'
  || button.elem.textContent === '7'
  || button.elem.textContent === '8'
  || button.elem.textContent === '9'
  || button.elem.textContent === '0'
  || button.elem.textContent === '-'
  || button.elem.textContent === '='
  || button.elem.textContent === '`'
  || button.elem.textContent === 'ё'
  || button.elem.textContent === 'Ё') {
    button.elem.classList.add('firstLine');
  }
  keyStorage.link.push(button.elem);
}
CapsLock();
CapsLock();

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyStorage.link[keyStorage.code.indexOf(event.code)].classList.add('click');
  if (event.code === 'Backspace') {
    const str = textarea.value.substr(0, textarea.value.length - 1);
    textarea.value = str;
    return;
  }

  if (event.code === 'Tab') {
    textarea.value += '   ';
    return;
  }
  if (event.code === 'CapsLock') {
    CapsLock();
    return;
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    Shift();
    return;
  }
  if (event.code === 'ControlLeft') {
    keyStorage.changelanguage[0] = 1;
    if (keyStorage.changelanguage[1] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'ControlRight') {
    return;
  }
  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    return;
  }
  if (event.code === 'AltLeft') {
    keyStorage.changelanguage[1] = 1;
    if (keyStorage.changelanguage[0] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'AltRight') {
    return;
  }

  if (event.code === 'Enter') {
    textarea.value += '\n';
    return;
  }
  textarea.value += keyStorage.link[keyStorage.code.indexOf(event.code)].textContent;
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') return;
  keyStorage.link[keyStorage.code.indexOf(event.code)].classList.remove('click');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    keyStorage.shiftArray.forEach((item, i) => {
      keyStorage.shiftArray[i].textContent = keyStorage.firstline[i];
    });
    keyStorage.link.forEach((item, i) => {
      if (localStorage.capslock === 'false' && !(keyStorage.link[i].classList.contains('specialButton'))) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toLowerCase();
      }
      if (localStorage.capslock === 'true' && !(keyStorage.link[i].classList.contains('specialButton'))) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
      }
    });
  }
  keyStorage.changelanguage[0] = 0;
  keyStorage.changelanguage[1] = 0;
});

ul.addEventListener('mousedown', (event) => {
  textarea.value += keyStorage.en[keyStorage.code.indexOf(event.code)];
});
