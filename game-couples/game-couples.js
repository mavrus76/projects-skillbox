/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-globals */
(() => {
  const VOLUME_CARDS = 16;
  const ARRAY_DIGIT = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const TEXT_BUTTON_NEXT = 'Сыграть ещё раз';

  function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.classList.add('title');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function shuffle(arr) {
    for (const i in arr) {
      const j = Math.floor(Math.random() * (arr.length - 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function createGameList() {
    const list = document.createElement('ul');
    list.classList.add('list-cards');
    return list;
  }

  function createGameItem() {
    const item = document.createElement('li');
    item.classList.add('card');

    return item;
  }

  function createButtonNext() {
    const buttonNext = document.createElement('button');
    buttonNext.classList.add('button-next');
    buttonNext.textContent = TEXT_BUTTON_NEXT;

    return buttonNext;
  }

  function createGameApp(container, title) {
    const gameAppTitle = createAppTitle(title);
    const gameList = createGameList();
    const nextGame = createButtonNext();
    const cards = ARRAY_DIGIT;

    shuffle(cards);

    for (let i = 0; cards.length > i; i++) {
      const item = createGameItem(cards[i]);

      item.addEventListener('click', () => {
        item.classList.add('flip');

        const selectedCard = document.getElementsByClassName('selected')[0];

        if (selectedCard === undefined) {
          item.classList.add('selected');
          return;
        }

        if (selectedCard.textContent !== item.textContent) {
          selectedCard.classList.add('card');
          selectedCard.classList.remove('flip');
          selectedCard.classList.remove('selected');
          item.classList.add('selected');
        } else {
          selectedCard.classList.remove('selected');
          setTimeout(() => {
            if (
              document.getElementsByClassName('flip').length === VOLUME_CARDS
            ) {
              nextGame.style.display = 'block';
            }
          }, 100);
        }
      });

      nextGame.addEventListener('click', () => {
        location.reload();
      });

      item.textContent = cards[i];
      gameList.append(item);
    }

    container.append(gameAppTitle);
    container.append(gameList);
    container.append(nextGame);
  }

  window.createGameApp = createGameApp;
})();
