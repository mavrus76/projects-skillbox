(() => {
  const API = 'http://localhost:3000/api/clients';
  const BODY = document.body;
  const createElement = (element) => document.createElement(element);
  let elEdit;
  let idEdit;
  let elDel;
  let idDel;
  let TRs;
  let buttonsEditClient;
  let buttonsDeleteClient;

  // ****************************** create element *****************************
  function newElement(options) {
    const el = document.createElement(options.tag);

    for (const [key, value] of Object.entries(options.params)) {
      if (key == 'classList') {
        for (const newClass of value) {
          el.classList.add(newClass);
        }
      } else {
        el[key] = value;
      }
    }

    if (options.elements !== undefined) {
      for (const element of options.elements) {
        newElement({
          tag: element.tag,
          params: element.params,
          parent: el,
        });
      }
    }

    if (options.parent !== undefined) options.parent.append(el);

    return el;
  }

  // ***************************** get data from API *******************
  async function loadClients() {
    const response = await fetch(`${API}`);
    const data = await response.json();
    return data;
  }

  // **************************** sort table ***************************
  async function getSortedClients(prop, dir) {
    const clients = await loadClients();
    let sortedClients = [];
    switch (prop) {
      case 'sortID':
        sortedClients = clients.sort((row1, row2) => {
          const a = row1.id;
          const b = row2.id;
          if (!dir == false ? a < b : a > b) return -1;
        });
        break;
      case 'sortFullName':
        sortedClients = clients.sort((row1, row2) => {
          const a = `${row1.surname} ${row1.name} ${row1.lastName}`;
          const b = `${row2.surname} ${row2.name} ${row2.lastName}`;
          if (!dir == false ? a < b : a > b) return -1;
        });
        break;
      case 'sortDateCreation':
        sortedClients = clients.sort((row1, row2) => {
          const a = row1.createdAt;
          const b = row2.createdAt;
          if (!dir == false ? a < b : a > b) return -1;
        });
        break;
      case 'sortDateChange':
        sortedClients = clients.sort((row1, row2) => {
          const a = row1.updatedAt;
          const b = row2.updatedAt;
          if (!dir == false ? a < b : a > b) return -1;
        });
        break;
      default:
        break;
    }
    return sortedClients;
  }

  // ******************************** filter ****************************
  function getFilteredClients(arr, tBody) {
    const formFilter = document.querySelector('#filter');

    formFilter.addEventListener('input', () => {
      const inputValue = document.forms.filter;
      const nameInput = inputValue.search.value.trim().toUpperCase();
      const clients = [...arr];

      const filteredClients = clients.filter(
        (item) =>
          item.name.toUpperCase().indexOf(nameInput) > -1 ||
          item.surname.toUpperCase().indexOf(nameInput) > -1 ||
          item.lastName.toUpperCase().indexOf(nameInput) > -1
      );

      tBody.innerHTML = '';
      addRows(filteredClients);
      hiddenIconsOfContacts();
    });
  }

  // **************************** render table *************************
  async function render(column, columnDir, tBody, modalEditClient) {
    sortedClients = await getSortedClients(column, columnDir);
    getFilteredClients(sortedClients, tBody);
    tBody.innerHTML = '';
    addRows(sortedClients);
    if (tBody.classList.contains('js-load')) {
      tBody.classList.remove('js-load');
    }
    hiddenIconsOfContacts();
    showPopups();

    buttonsEditClient = Array.from(
      document.querySelectorAll('#tbody .btn-edit-client')
    );
    buttonsDeleteClient = Array.from(
      document.querySelectorAll('#tbody .btn-delete-client')
    );
    TRs = Array.from(document.querySelectorAll('#tbody .row-body'));

    buttonsEditClient.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        elEdit = e.target;
        const clients = await getSortedClients(column, columnDir);
        const index = buttonsEditClient.indexOf(elEdit);
        idEdit = clients[index].id;

        onClickToModalEdit(column, columnDir, idEdit, index, modalEditClient);
      });
    });

    for (const btn of buttonsDeleteClient) {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        elDel = e.target;
        const clients = await getSortedClients(column, columnDir);
        const index = buttonsDeleteClient.indexOf(elDel);
        idDel = clients[index].id;
      });
    }
  }

  // **************************** choices ******************************
  const customSelects = () => {
    const elements = document.querySelectorAll('.js-choice');
    elements.forEach((element) => {
      const choices = new Choices(element, {
        searchEnabled: false,
        shouldSort: false,
        noChoicesText: '',
        itemSelectText: '',
        renderChoiceLimit: 5,
      });
    });
  };

  // **************************** title ********************************
  function createAppTitle(title) {
    const appTitle = newElement({
      tag: 'h2',
      params: {
        classList: ['title'],
        textContent: title,
      },
    });
    return appTitle;
  }

  // **************************** the first capital ********************
  function capFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  // *********************** close popup without reboot ****************
  function closeSubmit() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.classList.remove('popup--visible');
      BODY.classList.remove('lock');
    });
  }

  // ********************************* table ***************************
  function createTable() {
    const container = document.getElementById('crm-app');
    const table = createElement('table');
    const colgroup = createElement('colgroup');
    const colID = createElement('col');
    const colFullName = createElement('col');
    const colDateOfCreation = createElement('col');
    const colDateOfChange = createElement('col');
    const colContacts = createElement('col');
    const colActions = createElement('col');
    const tHead = createElement('thead');
    const tr = createElement('tr');
    const thID = createElement('th');
    const thFullName = createElement('th');
    const alphabet = createElement('span');
    const thDateOfCreation = createElement('th');
    const thDateOfChange = createElement('th');
    const thContacts = createElement('th');
    const thActions = createElement('th');
    const tBody = createElement('tbody');

    table.id = 'table';
    colID.id = 'id';
    colFullName.id = 'full-name';
    colDateOfCreation.id = 'date-creation';
    colDateOfChange.id = 'date-change';
    colContacts.id = 'contacts';
    colActions.id = 'actions';

    table.classList.add('table');
    thID.classList.add('head', 'sorted');
    thFullName.classList.add('head');
    alphabet.classList.add('table__alphabet');
    thDateOfCreation.classList.add('head');
    thDateOfChange.classList.add('head');
    thContacts.classList.add('head');
    thActions.classList.add('head');

    thID.scope = 'col';
    thFullName.scope = 'col';
    thDateOfCreation.scope = 'col';
    thDateOfChange.scope = 'col';
    thContacts.scope = 'col';
    thActions.scope = 'col';

    thID.setAttribute('data-column', 'sortID');
    thFullName.setAttribute('data-column', 'sortFullName');
    thDateOfCreation.setAttribute('data-column', 'sortDateCreation');
    thDateOfChange.setAttribute('data-column', 'sortDateChange');
    tBody.id = 'tbody';

    thID.textContent = 'ID';
    thFullName.textContent = 'Фамилия Имя Отчество';
    alphabet.textContent = 'А-Я';
    thDateOfCreation.textContent = 'Дата и время создания';
    thDateOfChange.textContent = 'Последние изменения';
    thContacts.textContent = 'Контакты';
    thActions.textContent = 'Действия';

    container.append(table);
    table.append(colgroup);
    colgroup.append(colID);
    colgroup.append(colFullName);
    colgroup.append(colDateOfCreation);
    colgroup.append(colDateOfChange);
    colgroup.append(colContacts);
    colgroup.append(colActions);
    table.append(tHead);
    tHead.append(tr);
    tr.append(thID);
    tr.append(thFullName);
    thFullName.append(alphabet);
    tr.append(thDateOfCreation);
    tr.append(thDateOfChange);
    tr.append(thContacts);
    tr.append(thActions);
    table.append(tBody);

    return table;
  }

  // *************************** row of table ****************************
  function createRowTable({
    id,
    surname,
    name,
    lastName,
    createdAt,
    updatedAt,
    contacts,
  }) {
    const tBody = document.getElementById('tbody');
    const row = createElement('tr');
    const tdID = createElement('td');
    const tdFullName = createElement('td');
    const tdDateOfCreation = createElement('td');
    const tdContainerDateOfCreation = createElement('div');
    const tdSpanDateOfCreation = createElement('span');
    const tdCreationSpan = createElement('span');
    const tdDateOfChange = createElement('td');
    const tdContainerDateOfChange = createElement('div');
    const tdSpanDateOfChange = createElement('span');
    const tdChangeSpan = createElement('span');
    const tdContacts = createElement('td');
    const tdActions = createElement('td');
    const blockActions = createBlockActions();
    const btnEdit = createButtonEdit();
    const btnDelete = createButtonDelete();
    const listOfIcons = createListOfIcons();
    const buttonForIcons = btnForIcons();

    row.classList.add('row-body');
    tdContainerDateOfCreation.classList.add('container-date');
    tdContainerDateOfChange.classList.add('container-date');
    tdSpanDateOfCreation.classList.add('date-span');
    tdSpanDateOfChange.classList.add('date-span');
    tdCreationSpan.classList.add('creation-span');
    tdChangeSpan.classList.add('change-span');

    tdID.textContent = id.toString().slice(7);
    tdFullName.textContent = `${surname} ${name} ${lastName}`;
    tdSpanDateOfCreation.textContent = `${new Date(
      createdAt
    ).toLocaleDateString()}`;
    tdSpanDateOfChange.textContent = `${new Date(
      updatedAt
    ).toLocaleDateString()}`;

    tdDateOfCreation.append(tdContainerDateOfCreation);
    tdContainerDateOfCreation.append(tdSpanDateOfCreation);
    tdContainerDateOfCreation.append(tdCreationSpan);

    tdDateOfChange.append(tdContainerDateOfChange);
    tdContainerDateOfChange.append(tdSpanDateOfChange);
    tdContainerDateOfChange.append(tdChangeSpan);

    tdCreationSpan.textContent = `${new Date(createdAt)
      .toLocaleTimeString()
      .slice(0, -3)}`;
    tdChangeSpan.textContent = `${new Date(updatedAt)
      .toLocaleTimeString()
      .slice(0, -3)}`;

    contacts.forEach((contact) => {
      const itemOfIcon = createItemOfIcon();
      switch (contact.type) {
        case 'Телефон':
          itemOfIcon.style.backgroundImage = 'url(../img/phone.svg)';
          itemOfIcon.setAttribute('data-title', `${contact.value}`);
          listOfIcons.append(itemOfIcon);
          break;
        case 'Email':
          itemOfIcon.style.backgroundImage = 'url(../img/mail.svg)';
          itemOfIcon.setAttribute('data-title', `${contact.value}`);
          listOfIcons.append(itemOfIcon);
          break;
        case 'Facebook':
          itemOfIcon.style.backgroundImage = 'url(../img/fb.svg)';
          itemOfIcon.setAttribute('data-title', `${contact.value}`);
          listOfIcons.append(itemOfIcon);
          break;
        case 'Vk':
          itemOfIcon.style.backgroundImage = 'url(../img/vk.svg)';
          itemOfIcon.setAttribute('data-title', `${contact.value}`);
          listOfIcons.append(itemOfIcon);
          break;
        case 'Другое':
          itemOfIcon.style.backgroundImage = 'url(../img/user-contact.svg)';
          itemOfIcon.setAttribute('data-title', `${contact.value}`);
          listOfIcons.append(itemOfIcon);
          break;
        default:
          break;
      }
    });

    tdContacts.append(listOfIcons);
    listOfIcons.append(buttonForIcons);
    tdActions.append(blockActions);
    blockActions.append(btnEdit);
    blockActions.append(btnDelete);
    tBody.append(row);
    row.append(tdID);
    row.append(tdFullName);
    row.append(tdDateOfCreation);
    row.append(tdDateOfChange);
    row.append(tdContacts);
    row.append(tdActions);
  }

  function addRows(rowsData) {
    rowsData.forEach(createRowTable);
  }

  // **************************** list of icons ******************************
  function createListOfIcons() {
    const list = newElement({
      tag: 'ul',
      params: {
        classList: ['table__list-icons'],
      },
    });
    return list;
  }

  function createItemOfIcon() {
    const item = newElement({
      tag: 'li',
      params: {
        classList: ['table__item-icon'],
      },
    });
    return item;
  }

  // *************************** button for icons ****************************
  function btnForIcons() {
    const button = newElement({
      tag: 'button',
      params: {
        classList: ['table__btn-icon', 'btn-reset'],
        type: 'button',
      },
    });
    return button;
  }

  // **************************** popup add client ***************************
  function createPopupAddClient() {
    const popup = newElement({
      tag: 'div',
      params: {
        classList: ['popup'],
      },
    });
    popup.setAttribute('data-target', 'add');

    const popupBody = newElement({
      tag: 'div',
      params: {
        classList: ['popup__body'],
      },
      parent: popup,
    });

    const popupContent = newElement({
      tag: 'div',
      params: {
        classList: ['popup__content', 'content--add'],
      },
      parent: popupBody,
    });

    const closePopup = newElement({
      tag: 'button',
      params: {
        classList: ['popup__close', 'btn-close', 'btn-reset'],
        type: 'button',
      },
      parent: popupContent,
    });

    const form = newElement({
      tag: 'form',
      params: {
        classList: ['popup__form', 'form', 'js-form'],
        id: 'form',
        autocomplete: 'off',
      },
      parent: popupContent,
    });

    const fieldset = newElement({
      tag: 'fieldset',
      params: {
        classList: ['form__fieldset'],
      },
      parent: form,
    });

    const legend = newElement({
      tag: 'legend',
      params: {
        classList: ['form__legend'],
        textContent: 'Новый клиент',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__legend-span'],
            textContent: '',
          },
        },
      ],
      parent: fieldset,
    });

    const containerSurname = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputSurname = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-surname'],
        id: 'surname',
        name: 'surname',
        required: 'required',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerSurname,
    });

    const labelSurname = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-surname'],
        for: 'surname',
        textContent: 'Фамилия',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
            textContent: '*',
          },
        },
      ],
      parent: containerSurname,
    });

    const containerName = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputName = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-name'],
        id: 'name',
        name: 'name',
        required: 'required',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerName,
    });

    const labelName = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-name'],
        for: 'name',
        textContent: 'Имя',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
            textContent: '*',
          },
        },
      ],
      parent: containerName,
    });

    const containerPatronymic = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputPatronymic = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-patronymic'],
        id: 'patronymic',
        name: 'patronymic',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerPatronymic,
    });

    const labelPatronymic = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-patronymic'],
        for: 'patronymic',
        textContent: 'Отчество',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
          },
        },
      ],
      parent: containerPatronymic,
    });

    const buttonAddContact = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-contact', 'btn-reset'],
        textContent: 'Добавить контакт',
        type: 'button',
      },
      parent: fieldset,
    });

    const listOfContacts = newElement({
      tag: 'ul',
      params: {
        classList: ['form__list-contacts'],
      },
    });
    buttonAddContact.before(listOfContacts);

    const containerError = newElement({
      tag: 'div',
      params: {
        classList: ['form__error'],
      },
      parent: fieldset,
    });

    const blockButtons = newElement({
      tag: 'div',
      params: {
        classList: ['form__block-buttons'],
      },
      parent: fieldset,
    });

    const buttonSave = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-save', 'submit-add', 'btn-reset'],
        type: 'submit',
        textContent: 'Сохранить',
      },
      parent: blockButtons,
    });

    const buttonCancel = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-cancel', 'btn-close', 'btn-reset'],
        textContent: 'Отмена',
        type: 'button',
      },
      parent: blockButtons,
    });

    return {
      popup,
      legend,
      closePopup,
      labelSurname,
      inputSurname,
      labelName,
      inputName,
      labelPatronymic,
      inputPatronymic,
      listOfContacts,
      buttonAddContact,
      containerError,
      buttonSave,
      buttonCancel,
    };
  }

  // ********************************** popup edit client ********************************
  function createPopupEditClient() {
    const popup = newElement({
      tag: 'div',
      params: {
        classList: ['popup'],
      },
    });
    popup.setAttribute('data-target', 'edit');

    const popupBody = newElement({
      tag: 'div',
      params: {
        classList: ['popup__body'],
      },
      parent: popup,
    });

    const popupContent = newElement({
      tag: 'div',
      params: {
        classList: ['popup__content', 'content--edit'],
      },
      parent: popupBody,
    });

    const closePopup = newElement({
      tag: 'button',
      params: {
        classList: ['popup__close', 'btn-close', 'btn-reset'],
        type: 'button',
      },
      parent: popupContent,
    });

    const form = newElement({
      tag: 'form',
      params: {
        classList: ['popup__form', 'form', 'js-form'],
        id: 'form-edit',
        autocomplete: 'off',
      },
      parent: popupContent,
    });

    const fieldset = newElement({
      tag: 'fieldset',
      params: {
        classList: ['form__fieldset'],
      },
      parent: form,
    });

    const legend = newElement({
      tag: 'legend',
      params: {
        classList: ['form__legend'],
        textContent: 'Изменить данные',
      },
      parent: fieldset,
    });

    const legendSpan = newElement({
      tag: 'span',
      params: {
        classList: ['form__legend-span'],
      },
      parent: legend,
    });

    const containerSurname = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputSurname = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-surname'],
        id: 'surname-edit',
        name: 'surname',
        required: 'required',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerSurname,
    });

    const labelSurname = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-surname'],
        for: 'surname',
        textContent: 'Фамилия',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
            textContent: '*',
          },
        },
      ],
      parent: containerSurname,
    });

    const containerName = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputName = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-name'],
        id: 'name-edit',
        name: 'name',
        required: 'required',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerName,
    });

    const labelName = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-name'],
        for: 'name',
        textContent: 'Имя',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
            textContent: '*',
          },
        },
      ],
      parent: containerName,
    });

    const containerPatronymic = newElement({
      tag: 'div',
      params: {
        classList: ['form__container-placeholder'],
      },
      parent: fieldset,
    });

    const inputPatronymic = newElement({
      tag: 'input',
      params: {
        classList: ['form__input', 'input-patronymic'],
        id: 'patronymic-edit',
        name: 'patronymic',
        type: 'text',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '[A-Za-zА-Яа-яЁё]{2,30}',
        oninvalid: "setCustomValidity('Вводите буквы от 2 до 30 символов')",
        oninput: "setCustomValidity('')",
        title: 'Вводите буквы от 2 до 30 символов',
      },
      parent: containerPatronymic,
    });

    const labelPatronymic = newElement({
      tag: 'label',
      params: {
        classList: ['form__label', 'label-patronymic'],
        for: 'patronymic',
        textContent: 'Отчество',
      },
      elements: [
        {
          tag: 'span',
          params: {
            classList: ['form__label-span'],
          },
        },
      ],
      parent: containerPatronymic,
    });

    const buttonAddContact = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-contact', 'btn-reset'],
        textContent: 'Добавить контакт',
        type: 'button',
      },
      parent: fieldset,
    });

    const listOfContacts = newElement({
      tag: 'ul',
      params: {
        classList: ['form__list-contacts'],
      },
    });
    buttonAddContact.before(listOfContacts);

    const containerError = newElement({
      tag: 'div',
      params: {
        classList: ['form__error'],
      },
      parent: fieldset,
    });

    const blockButtons = newElement({
      tag: 'div',
      params: {
        classList: ['form__block-buttons'],
      },
      parent: fieldset,
    });

    const buttonSave = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-save', 'submit-edit', 'btn-reset'],
        type: 'submit',
        textContent: 'Изменить',
      },
      parent: blockButtons,
    });

    const buttonDel = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-cancel', 'btn-del', 'btn', 'btn-reset'],
        textContent: 'Удалить клиента',
        type: 'button',
      },
      parent: blockButtons,
    });
    buttonDel.setAttribute('data-path', 'del');

    return {
      popup,
      legend,
      legendSpan,
      closePopup,
      labelSurname,
      inputSurname,
      labelName,
      inputName,
      labelPatronymic,
      inputPatronymic,
      listOfContacts,
      buttonAddContact,
      containerError,
      buttonSave,
      buttonDel,
    };
  }

  // ***************************** popup delete client ***********************
  function createPopupDeleteClient() {
    const popup = newElement({
      tag: 'div',
      params: {
        classList: ['popup'],
      },
    });
    popup.setAttribute('data-target', 'del');

    const popupBody = newElement({
      tag: 'div',
      params: {
        classList: ['popup__body'],
      },
      parent: popup,
    });

    const popupContent = newElement({
      tag: 'div',
      params: {
        classList: ['popup__content', 'content--del'],
      },
      parent: popupBody,
    });

    const closePopup = newElement({
      tag: 'button',
      params: {
        classList: ['popup__close', 'btn-close', 'btn-reset'],
        type: 'button',
      },
      parent: popupContent,
    });

    const form = newElement({
      tag: 'form',
      params: {
        classList: ['popup__form', 'form', 'js-form'],
        id: 'form-del',
      },
      parent: popupContent,
    });

    const fieldset = newElement({
      tag: 'fieldset',
      params: {
        classList: ['form__fieldset', 'fieldset-del'],
      },
      parent: form,
    });

    const legend = newElement({
      tag: 'legend',
      params: {
        classList: ['form__legend', 'legend-del'],
        textContent: 'Удалить клиента',
      },
      parent: fieldset,
    });

    const question = newElement({
      tag: 'p',
      params: {
        classList: ['form__question'],
        textContent: 'Вы действительно хотите удалить клиента?',
      },
      parent: fieldset,
    });

    const containerError = newElement({
      tag: 'div',
      params: {
        classList: ['form__error'],
      },
      parent: fieldset,
    });

    const blockButtons = newElement({
      tag: 'div',
      params: {
        classList: ['form__block-buttons'],
      },
      parent: fieldset,
    });

    const buttonSave = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-save', 'submit-del', 'btn-reset'],
        type: 'submit',
        textContent: 'Удалить',
      },
      parent: blockButtons,
    });

    const buttonCancel = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-cancel', 'btn-close', 'btn-reset'],
        textContent: 'Отмена',
        type: 'button',
      },
      parent: blockButtons,
    });

    return {
      popup,
      legend,
      closePopup,
      containerError,
      buttonSave,
      buttonCancel,
    };
  }

  // ***************************** create contact *************************
  function createItemOfContact(value) {
    const itemOfContact = newElement({
      tag: 'li',
      params: {
        classList: ['form__item-contact'],
      },
    });

    const select = newElement({
      tag: 'select',
      params: {
        classList: ['js-choice'],
        name: 'select',
      },
      elements: [
        {
          tag: 'option',
          params: {
            value: 'Телефон',
            textContent: 'Телефон',
            selected: value == 'Телефон',
          },
        },
        {
          tag: 'option',
          params: {
            value: 'Email',
            textContent: 'Email',
            selected: value == 'Email',
          },
        },
        {
          tag: 'option',
          params: {
            value: 'Facebook',
            textContent: 'Facebook',
            selected: value == 'Facebook',
          },
        },
        {
          tag: 'option',
          params: {
            value: 'Vk',
            textContent: 'Vk',
            selected: value == 'Vk',
          },
        },
        {
          tag: 'option',
          params: {
            value: 'Другое',
            textContent: 'Другое',
            selected: value == 'Другое',
          },
        },
      ],
      parent: itemOfContact,
    });

    const inputContact = newElement({
      tag: 'input',
      params: {
        classList: ['form__contact-input', 'input-contact'],
        type: 'tel',
        name: 'phone',
        placeholder: '+7 (___) ___-__-__',
        autocomplete: 'off',
        pattern:
          '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}',
        oninvalid: `setCustomValidity('Введите корректные данные')`,
        oninput: `setCustomValidity('')`,
        title: 'Введите корректные данные',
      },
      parent: itemOfContact,
    });

    const deleteContact = newElement({
      tag: 'button',
      params: {
        classList: ['form__btn-delete-contact', 'btn-reset'],
        type: 'button',
      },
      parent: itemOfContact,
    });
    deleteContact.setAttribute('data-title', 'Удалить контакт');

    return {
      itemOfContact,
      select,
      inputContact,
      deleteContact,
    };
  }

  // **************************** button add client *******************************

  function createButtonAddClient() {
    const button = newElement({
      tag: 'button',
      params: {
        classList: ['btn-add-client', 'btn', 'btn-reset'],
        textContent: 'Добавить клиента',
        type: 'button',
      },
    });
    button.setAttribute('data-path', 'add');
    return button;
  }

  // **************************** buttons of actions ******************************

  function createBlockActions() {
    const div = newElement({
      tag: 'div',
      params: {
        classList: ['container-actions'],
      },
    });
    return div;
  }

  function createButtonEdit() {
    const button = newElement({
      tag: 'button',
      params: {
        classList: ['btn-edit-client', 'btn', 'btn-reset'],
        textContent: 'Изменить',
        type: 'button',
      },
    });
    button.setAttribute('data-path', 'edit');
    return button;
  }

  function createButtonDelete() {
    const button = newElement({
      tag: 'button',
      params: {
        classList: ['btn-delete-client', 'btn', 'btn-reset'],
        textContent: 'Удалить',
        type: 'button',
      },
    });
    button.setAttribute('data-path', 'del');
    return button;
  }

  // **************************** show popup *******************************
  function showPopups() {
    const btns = document.querySelectorAll('.btn');
    const closeBtns = document.querySelectorAll('.btn-close');
    const delBtns = document.querySelectorAll('.btn-del');
    const popups = document.querySelectorAll('.popup');
    const bodies = document.querySelectorAll('.popup__body');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const listsOfContacts = document.querySelectorAll('.form__list-contacts');
    const btnsOfContact = document.querySelectorAll('.form__btn-contact');
    const timeout = 800;
    let unlock = true;

    btns.forEach((el) => {
      el.addEventListener('click', (e) => {
        const path = e.currentTarget.getAttribute('data-path');

        popups.forEach((elem) => {
          elem.classList.remove('popup--visible');
          listsOfContacts.forEach((list) => {
            list.innerHTML = '';
            list.classList.remove('js-visible-contacts');
          });
          btnsOfContact.forEach((btn) => {
            btn.classList.remove('js-padding');
          });
        });

        document
          .querySelector(`[data-target="${path}"]`)
          .classList.add('popup--visible');
        bodyLock();
      });
    });

    closeBtns.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        popups.forEach((elem) => {
          elem.classList.remove('popup--visible');
        });

        bodyUnlock();
      });
    });

    delBtns.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });

    bodies.forEach((element) => {
      element.addEventListener('click', (e) => {
        if (e.target == element) {
          popups.forEach((el) => el.classList.remove('popup--visible'));
          bodyUnlock();
        }
      });
    });

    function bodyLock() {
      const lockPaddingValue = `${
        window.innerWidth - document.querySelector('.header').offsetWidth
      }px`;

      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = lockPaddingValue;
        }
      }
      BODY.style.paddingRight = lockPaddingValue;
      BODY.classList.add('lock');

      unlock = false;
      setTimeout(() => {
        unlock = true;
      }, timeout);
    }

    function bodyUnlock() {
      setTimeout(() => {
        if (lockPadding.length > 0) {
          for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0';
          }
        }
        BODY.style.paddingRight = '0';
        BODY.classList.remove('lock');
      }, timeout);

      unlock = false;
      setTimeout(() => {
        unlock = true;
      }, timeout);
    }
  }

  // **************************************** mask **********************
  function mask() {
    const selectors = document.querySelectorAll("input[type ='tel']");
    selectors.forEach((selector) => {
      const im = new Inputmask('+7 (999) 999-99-99');
      im.mask(selector);
    });
  }

  // ********************* add attribute and validate *******************
  function addAttributeForInput() {
    const contactInputs = Array.from(
      document.querySelectorAll('.form__contact-input')
    );
    const selects = Array.from(document.querySelectorAll('select'));

    selects.forEach((select) => {
      select.addEventListener('change', (e) => {
        const el = e.target;
        if (el.nodeName !== 'SELECT') return;

        switch (el.value) {
          case 'Телефон':
            contactInputs.forEach((input) => {
              if (selects.indexOf(el) === contactInputs.indexOf(input)) {
                input.type = 'tel';
                input.name = 'phone';
                input.placeholder = '+7 (___) ___-__-__';
                input.setAttribute(
                  'pattern',
                  '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}'
                );
                input.setAttribute(
                  'oninvalid',
                  "setCustomValidity('Введите корректные данные)"
                );
                input.setAttribute('oninput', "setCustomValidity('')");
                input.setAttribute('title', 'Введите корректные данные');
              }
              mask();
            });
            break;
          case 'Email':
            contactInputs.forEach((input) => {
              if (selects.indexOf(el) === contactInputs.indexOf(input)) {
                if (input.inputmask) input.inputmask.remove();
                input.type = 'email';
                input.name = 'email';
                input.placeholder = 'e.g. name@mail.ru';
                input.setAttribute('data-validate-field', 'email');
                input.setAttribute(
                  'pattern',
                  '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                );
                input.setAttribute(
                  'oninvalid',
                  "setCustomValidity('Введите корректный email - e.g. name@mail.ru')"
                );
                input.setAttribute('oninput', "setCustomValidity('')");
                input.setAttribute(
                  'title',
                  'Введите корректный email - e.g. name@email.ru'
                );
              }
            });
            break;
          case 'Facebook':
            contactInputs.forEach((input) => {
              if (selects.indexOf(el) === contactInputs.indexOf(input)) {
                if (input.inputmask) input.inputmask.remove();
                input.type = 'text';
                input.name = 'fb';
                input.pattern = 'facebook.com/.*';
                input.placeholder = 'e.g. facebook.com/username';
              }
            });
            break;
          case 'Vk':
            contactInputs.forEach((input) => {
              if (selects.indexOf(el) === contactInputs.indexOf(input)) {
                if (input.inputmask) input.inputmask.remove();
                input.type = 'text';
                input.name = 'vk';
                input.pattern = 'vk.com/.*';
                input.placeholder = 'e.g. vk.com/username';
              }
            });
            break;
          case 'Другое':
            contactInputs.forEach((input) => {
              if (selects.indexOf(el) === contactInputs.indexOf(input)) {
                if (input.inputmask) input.inputmask.remove();
                input.type = 'text';
                input.name = 'other';
                input.pattern = '[\\w\\s\\S]{3,50}';
                input.placeholder = 'Введите данные контакта';
              }
            });
            break;
          default:
            break;
        }
      });
    });
  }

  // ****************** add objects of contacts to array ****************
  function addObjectsToArray(select, input, arrContacts) {
    const key = select.textContent;
    let { value } = input;
    if (value === '') {
      value = '';
    } else {
      const obj = {};
      obj.type = `${key}`;
      obj.value = `${value}`;
      arrContacts.push(obj);
    }
  }

  // ********************* hidden icons of list **************************
  function hiddenIconsOfContacts() {
    const listsOfIcons = Array.from(
      document.querySelectorAll('.table__list-icons')
    );
    const btnsOfIcons = Array.from(
      document.querySelectorAll('.table__btn-icon')
    );

    listsOfIcons.forEach((list) => {
      list.classList.add('js-hidden');
      const childrenArr = Array.from(list.children);
      const hiddenChildren = childrenArr.slice(4, 11);
      const realHiddenChildren = hiddenChildren.length - 1;
      const { lastChild } = list;

      if (realHiddenChildren > 0) {
        lastChild.classList.add('js-visible');
        lastChild.textContent = `+${realHiddenChildren}`;
      }
    });

    btnsOfIcons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = btn.closest('.table__list-icons');
        e.target.classList.remove('js-visible');
        parent.classList.remove('js-hidden');
      });
    });
  }

  // *************************** add and delete contact **************
  function addAndDelContact(parent) {
    parent.buttonAddContact.addEventListener('click', (e) => {
      e.preventDefault();
      const contacts = document.querySelectorAll('.form__item-contact');
      const addContact = createItemOfContact();

      parent.buttonAddContact.classList.add('js-padding');

      if (!parent.listOfContacts.classList.contains('.js-visible-contacts')) {
        parent.listOfContacts.classList.add('js-visible-contacts');
      }

      if (contacts.length < 10) {
        parent.listOfContacts.append(addContact.itemOfContact);
        customSelects();
        addAttributeForInput();
        mask();
      }

      if (contacts.length == 9) {
        parent.buttonAddContact.classList.add('js-hidden');
      }

      addContact.deleteContact.addEventListener('click', () => {
        addContact.itemOfContact.remove();

        if (contacts.length == 0) {
          parent.listOfContacts.classList.remove('js-visible-contacts');
          parent.buttonAddContact.classList.remove('js-padding');
        }

        if (contacts.length == 9) {
          parent.buttonAddContact.classList.remove('js-hidden');
        }
      });

      addContact.inputContact.addEventListener('input', () => {
        if (addContact.inputContact.value) {
          addContact.deleteContact.style.display = 'inline-block';
          addContact.inputContact.style.width = '61%';
        }

        if (!addContact.inputContact.value) {
          addContact.deleteContact.style.display = 'none';
          addContact.inputContact.style.width = '68%';
        }
      });
    });
  }

  // **************************** subform add ***************************
  async function getSubformAdd(
    column,
    columnDir,
    el,
    submitAdd,
    tBody,
    modalEditClient
  ) {
    const surname = capFirst(el.surname.value.trim().toLowerCase());
    const name = capFirst(el.name.value.trim().toLowerCase());

    let lastName = el.patronymic.value;
    if (lastName === '') {
      lastName = '';
    } else {
      lastName = capFirst(el.patronymic.value.trim().toLowerCase());
    }

    const selects = Array.from(document.querySelectorAll('select'));
    const inputs = Array.from(
      document.querySelectorAll('.form__contact-input')
    );

    const arrContacts = [];

    for (const select of selects) {
      switch (select.textContent) {
        case 'Телефон':
          inputs.forEach((input) => {
            if (selects.indexOf(select) === inputs.indexOf(input)) {
              addObjectsToArray(select, input, arrContacts);
            }
          });
          break;
        case 'Email':
          inputs.forEach((input) => {
            if (selects.indexOf(select) === inputs.indexOf(input)) {
              addObjectsToArray(select, input, arrContacts);
            }
          });
          break;
        case 'Facebook':
          inputs.forEach((input) => {
            if (selects.indexOf(select) === inputs.indexOf(input)) {
              addObjectsToArray(select, input, arrContacts);
            }
          });
          break;
        case 'Vk':
          inputs.forEach((input) => {
            if (selects.indexOf(select) === inputs.indexOf(input)) {
              addObjectsToArray(select, input, arrContacts);
            }
          });
          break;
        case 'Другое':
          inputs.forEach((input) => {
            if (selects.indexOf(select) === inputs.indexOf(input)) {
              addObjectsToArray(select, input, arrContacts);
            }
          });
          break;
        default:
          break;
      }
    }

    submitAdd.innerHTML = `<svg class="spinner-submit" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" cx="8" cy="8" r="6" fill="none" stroke-width="2"/>
        </svg>Сохранить`;

    await fetch(`${API}`, {
      method: 'POST',
      body: JSON.stringify({
        surname,
        name,
        lastName,
        contacts: arrContacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await render(column, columnDir, tBody, modalEditClient);
    submitAdd.innerHTML = `Сохранить`;

    el.reset();
    closeSubmit();
  }

  // ****************************** subform edit ************************
  function getSubformEdit(
    column,
    columnDir,
    idEdit,
    submitEdit,
    tBody,
    TRs,
    elEdit,
    elem,
    buttonsEditClient,
    modalEditClient
  ) {
    TRs.forEach(async (tr) => {
      if (TRs.indexOf(tr) === buttonsEditClient.indexOf(elEdit)) {
        const surname = capFirst(elem.surname.value.trim().toLowerCase());
        const name = capFirst(elem.name.value.trim().toLowerCase());

        let lastName = elem.patronymic.value;
        if (lastName === '') {
          lastName = '';
        } else {
          lastName = capFirst(elem.patronymic.value.trim().toLowerCase());
        }

        const selects = Array.from(document.querySelectorAll('select'));
        const inputs = Array.from(
          document.querySelectorAll('.form__contact-input')
        );

        const arrContacts = [];

        for (const select of selects) {
          switch (select.textContent) {
            case 'Телефон':
              inputs.forEach((input) => {
                if (selects.indexOf(select) === inputs.indexOf(input)) {
                  addObjectsToArray(select, input, arrContacts);
                }
              });
              break;
            case 'Email':
              inputs.forEach((input) => {
                if (selects.indexOf(select) === inputs.indexOf(input)) {
                  addObjectsToArray(select, input, arrContacts);
                }
              });
              break;
            case 'Facebook':
              inputs.forEach((input) => {
                if (selects.indexOf(select) === inputs.indexOf(input)) {
                  addObjectsToArray(select, input, arrContacts);
                }
              });
              break;
            case 'Vk':
              inputs.forEach((input) => {
                if (selects.indexOf(select) === inputs.indexOf(input)) {
                  addObjectsToArray(select, input, arrContacts);
                }
              });
              break;
            case 'Другое':
              inputs.forEach((input) => {
                if (selects.indexOf(select) === inputs.indexOf(input)) {
                  addObjectsToArray(select, input, arrContacts);
                }
              });
              break;
            default:
              break;
          }
        }

        submitEdit.innerHTML = `<svg class="spinner-submit" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" cx="8" cy="8" r="6" fill="none" stroke-width="2"/>
          </svg>Изменить`;

        await fetch(`${API}/${idEdit}`, {
          method: 'PATCH',
          body: JSON.stringify({
            surname,
            name,
            lastName,
            contacts: arrContacts,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        await render(column, columnDir, tBody, modalEditClient);
        submitEdit.innerHTML = `Изменить`;
        closeSubmit();
      }
    });
  }

  // ****************************** subform delete **********************
  function getSubmitDel(idDel, submitDel, elDel, TRs, buttons) {
    TRs.forEach((tr) => {
      if (TRs.indexOf(tr) === buttons.indexOf(elDel)) {
        tr.remove();

        submitDel.innerHTML = `<svg class="spinner-submit" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" cx="8" cy="8" r="6" fill="none" stroke-width="2"/>
          </svg>Удалить`;

        fetch(`${API}/${idDel}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        submitDel.innerHTML = `Удалить`;
        closeSubmit();
      }
    });
  }

  // ************************ onclick buttons edit **********************
  async function onClickToModalEdit(
    column,
    columnDir,
    idEdit,
    index,
    modalEditClient
  ) {
    const clients = await getSortedClients(column, columnDir);
    modalEditClient.legendSpan.textContent = `ID: ${idEdit
      .toString()
      .slice(7)}`;
    document.getElementById('surname-edit').value = clients[index].surname;
    document.getElementById('name-edit').value = clients[index].name;
    document.getElementById('patronymic-edit').value = clients[index].lastName;

    const contactsFromData = clients[index].contacts;

    if (contactsFromData.length !== 0) {
      modalEditClient.buttonAddContact.classList.add('js-padding');

      if (
        !modalEditClient.listOfContacts.classList.contains(
          '.js-visible-contacts'
        )
      ) {
        modalEditClient.listOfContacts.classList.add('js-visible-contacts');
      }

      contactsFromData.forEach((item) => {
        const addContact = createItemOfContact(item.type);

        switch (item.type) {
          case 'Телефон':
            modalEditClient.listOfContacts.append(addContact.itemOfContact);
            customSelects();
            mask();

            break;
          case 'Email':
            modalEditClient.listOfContacts.append(addContact.itemOfContact);
            customSelects();

            break;
          case 'Facebook':
            modalEditClient.listOfContacts.append(addContact.itemOfContact);
            customSelects();

            break;
          case 'Vk':
            modalEditClient.listOfContacts.append(addContact.itemOfContact);
            customSelects();

            break;
          case 'Другое':
            modalEditClient.listOfContacts.append(addContact.itemOfContact);
            customSelects();

            break;
          default:
            break;
        }

        const selects = Array.from(document.querySelectorAll('select'));
        const inputs = Array.from(
          document.querySelectorAll('.form__contact-input')
        );

        selects.forEach((select) => {
          if (selects.indexOf(select) === contactsFromData.indexOf(item)) {
            switch (select.textContent) {
              case 'Телефон':
                inputs.forEach((input) => {
                  if (selects.indexOf(select) === inputs.indexOf(input)) {
                    input.type = 'tel';
                    input.name = 'phone';
                    input.placeholder = '+7 (___) ___-__-__';
                    input.setAttribute(
                      'pattern',
                      '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}'
                    );
                    input.setAttribute(
                      'oninvalid',
                      "setCustomValidity('Введите корректные данные)"
                    );
                    input.setAttribute('oninput', "setCustomValidity('')");
                    input.setAttribute('title', 'Введите корректные данные');
                    input.value = item.value;
                  }
                });
                break;
              case 'Email':
                inputs.forEach((input) => {
                  if (selects.indexOf(select) === inputs.indexOf(input)) {
                    if (input.inputmask) input.inputmask.remove();
                    input.type = 'email';
                    input.name = 'email';
                    input.placeholder = 'e.g. name@mail.ru';
                    input.setAttribute('data-validate-field', 'email');
                    input.setAttribute(
                      'pattern',
                      '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                    );
                    input.setAttribute(
                      'oninvalid',
                      "setCustomValidity('Введите корректный email - e.g. name@mail.ru')"
                    );
                    input.setAttribute('oninput', "setCustomValidity('')");
                    input.setAttribute(
                      'title',
                      'Введите корректный email - e.g. name@email.ru'
                    );
                    input.value = item.value;
                  }
                });
                break;
              case 'Facebook':
                inputs.forEach((input) => {
                  if (selects.indexOf(select) === inputs.indexOf(input)) {
                    if (input.inputmask) input.inputmask.remove();
                    input.type = 'text';
                    input.name = 'fb';
                    input.pattern = 'facebook.com/.*';
                    input.placeholder = 'e.g. facebook.com/username';
                    input.value = item.value;
                  }
                });
                break;
              case 'Vk':
                inputs.forEach((input) => {
                  if (selects.indexOf(select) === inputs.indexOf(input)) {
                    if (input.inputmask) input.inputmask.remove();
                    input.type = 'text';
                    input.name = 'vk';
                    input.pattern = 'vk.com/.*';
                    input.placeholder = 'e.g. vk.com/username';
                    input.value = item.value;
                  }
                });
                break;
              case 'Другое':
                inputs.forEach((input) => {
                  if (selects.indexOf(select) === inputs.indexOf(input)) {
                    if (input.inputmask) input.inputmask.remove();
                    input.type = 'text';
                    input.name = 'other';
                    input.pattern = '[\\w\\s\\S]{3,50}';
                    input.placeholder = 'Введите данные контакта';
                    input.value = item.value;
                  }
                });
                break;
              default:
                break;
            }
          }
        });

        addContact.deleteContact.addEventListener('click', (event) => {
          event.preventDefault();
          const contacts = document.querySelectorAll('.form__item-contact');

          addContact.itemOfContact.remove();

          if (contacts.length == 1) {
            modalEditClient.listOfContacts.classList.remove(
              'js-visible-contacts'
            );
            modalEditClient.buttonAddContact.classList.remove('js-padding');
          }

          if (contacts.length == 9) {
            modalEditClient.buttonAddContact.classList.remove('js-hidden');
          }
        });

        if (addContact.inputContact.value) {
          addContact.deleteContact.style.display = 'inline-block';
          addContact.inputContact.style.width = '61%';
        }
      });
    }
  }

  // ********************************** App CRM *************************
  async function createAppCRM(container) {
    const crmTitle = createAppTitle('Клиенты');
    const showTable = createTable();
    const buttonAddClient = createButtonAddClient();
    const modalAddClient = createPopupAddClient();
    const modalEditClient = createPopupEditClient();
    const modalDeleteClient = createPopupDeleteClient();

    container.append(crmTitle);
    container.append(showTable);
    container.append(buttonAddClient);
    container.append(modalAddClient.popup);
    container.append(modalEditClient.popup);
    container.append(modalDeleteClient.popup);
    const allTH = document.querySelectorAll('.table th[data-column');
    const tBody = document.getElementById('tbody');

    if (tBody.innerHTML == '') {
      tBody.innerHTML = `<svg class="spinner" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" cx="20" cy="20" r="16" fill="none" stroke-width="4"/>
      </svg>`;
      tBody.classList.add('js-load');
    }

    let column = 'sortID';
    let columnDir = true;
    await render(column, columnDir, tBody, modalEditClient);

    addAndDelContact(modalAddClient, tBody);
    addAndDelContact(modalEditClient, tBody);

    const subformAdd = document.getElementById('form');
    const submitAdd = document.querySelector('.submit-add');
    const subformEdit = document.getElementById('form-edit');
    const submitEdit = document.querySelector('.submit-edit');
    const subformDel = document.getElementById('form-del');
    const submitDel = document.querySelector('.submit-del');

    subformAdd.addEventListener('submit', async (e) => {
      e.preventDefault();
      const el = e.target;
      await getSubformAdd(
        column,
        columnDir,
        el,
        submitAdd,
        tBody,
        modalEditClient
      );
    });

    tBody.addEventListener(
      'click',
      await render(column, columnDir, tBody, modalEditClient)
    );

    subformEdit.addEventListener('submit', async (event) => {
      event.preventDefault();
      const elem = event.target;
      await getSubformEdit(
        column,
        columnDir,
        idEdit,
        submitEdit,
        tBody,
        TRs,
        elEdit,
        elem,
        buttonsEditClient,
        modalEditClient
      );
    });

    subformDel.addEventListener('submit', async (event) => {
      event.preventDefault();
      await getSubmitDel(idEdit, submitDel, elEdit, TRs, buttonsEditClient);
    }) ||
      subformDel.addEventListener('submit', async (event) => {
        event.preventDefault();
        await getSubmitDel(idDel, submitDel, elDel, TRs, buttonsDeleteClient);
      });

    allTH.forEach((element) => {
      element.addEventListener('click', async function (event) {
        const el = event.target;
        column = this.dataset.column;
        columnDir = !columnDir;
        allTH.forEach((th) => {
          th.classList.remove('sorted');
        });
        if (columnDir) el.classList.toggle('sorted');
        await render(column, columnDir, tBody, modalEditClient);
      });
    });
  }

  // ********************************** DOMContentLoaded *****************
  document.addEventListener('DOMContentLoaded', () => {
    createAppCRM(document.getElementById('crm-app'));
  });
})();
