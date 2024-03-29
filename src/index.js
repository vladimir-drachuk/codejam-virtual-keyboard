import keyStorage from './storage';

const buttonAmount = 63;
const ul = document.createElement('ul');
const p = document.createElement('p');
const textarea = document.createElement('textarea');
p.textContent = 'created by Vladimir Drachuk, RSSchool 2019';

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
  keyStorage.link.forEach((_item, i) => {
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
    if (keyStorage.firstline.length !== 0) {
      keyStorage.firstline[0] = '~';
    }
  } else {
    localStorage.setItem('lang', 'ru');
    keyStorage.code.forEach((item, i) => {
      keyStorage.link[i].textContent = keyStorage.ru[i];
      if (localStorage.capslock === 'true' && !(keyStorage.link[i].classList.contains('specialButton'))) {
        keyStorage.link[i].textContent = keyStorage.link[i].textContent.toUpperCase();
      }
    });
    if (keyStorage.firstline.length !== 0) {
      keyStorage.firstline[0] = 'ё';
    }
  }
}

for (let i = 0; i < buttonAmount; i += 1) {
  const button = new Box(keyStorage.ru[i], keyStorage.en[i], keyStorage.code[i]);
  button.setText();
  ul.appendChild(button.elem);
  button.elem.classList.add('button', keyStorage.code[i].toLocaleLowerCase());
  switch (button.elem.textContent) {
    case 'tab':
    case 'shift':
    case 'caps lock':
    case 'backspace':
    case 'alt':
    case 'enter':
    case 'ctrl':
    case 'win':
      button.elem.classList.add('specialButton');
      break;
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '-':
    case '=':
    case '`':
    case 'ё':
    case 'Ё':
    case '\\':
    case '|':
      button.elem.classList.add('firstLine');
      break;
    default:
      break;
  }
  keyStorage.link.push(button.elem);
}
document.body.appendChild(textarea);
document.body.appendChild(ul);
document.body.appendChild(p);
CapsLock();
CapsLock();

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (keyStorage.code.indexOf(event.code) !== -1) {
    keyStorage.link[keyStorage.code.indexOf(event.code)].classList.add('click');
  }
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
    keyStorage.changelanguage[2] = 1;
    if (keyStorage.changelanguage[3] === 1) {
      ChangeLanguage();
    }
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
    keyStorage.changelanguage[3] = 1;
    if (keyStorage.changelanguage[2] === 1) {
      ChangeLanguage();
    }
    return;
  }
  if (event.code === 'Enter') {
    textarea.value += '\n';
    return;
  }
  if (keyStorage.code.indexOf(event.code) !== -1) {
    textarea.value += keyStorage.link[keyStorage.code.indexOf(event.code)].textContent;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') return;
  if (keyStorage.code.indexOf(event.code) !== -1) {
    keyStorage.link[keyStorage.code.indexOf(event.code)].classList.remove('click');
  }
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
  const arr = [0, 0, 0, 0];
  keyStorage.changelanguage.splice(0, keyStorage.changelanguage.length, ...arr);
});

ul.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('button') && !(event.target.classList.contains('specialButton'))) {
    textarea.value += event.target.textContent;
  }
  if (event.target.classList.contains('enter')) {
    textarea.value += '\n';
  }
  if (event.target.classList.contains('tab')) {
    textarea.value += '   ';
  }
  if (event.target.classList.contains('capslock')) {
    CapsLock();
  }
  if (event.target.classList.contains('backspace')) {
    const str = textarea.value.substr(0, textarea.value.length - 1);
    textarea.value = str;
  }
});
