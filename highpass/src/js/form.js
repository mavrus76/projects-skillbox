// MASKVALIDATE FORM
// var selector = document.querySelector("input[type ='tel']");
// var im = new Inputmask("+7 (999) 999-99-99");

// im.mask(selector);

new JustValidate(".js-form", {
  colorWrong: '#FF3030',
  rules: {
    // name: {
    //   required: true,
    //   minLength: 2,
    //   maxLength: 30,
    // },
    // tel: {
    //   required: true,
    //   function: (name, value) => {
    //     const phone = selector.inputmask.unmaskedvalue();
    //     return Number(phone) && phone.length === 10;
    //   },
    // },
    email: {
      required: true,
      email: true
    },
  },
  messages: {
    // name: {
    //   minLength: "Минимальная длина 2 символа",
    //   maxLength: "Максимальная длина 30 символов",
    //   required: "Недопустимый формат",
    // },
    // tel: {
    //   required: "Укажите ваш телефон",
    // },
    email: {
      email: 'Введен некорректный e-mail',
      required: 'Недопустимый формат'
    }
  },

  submitHandler: function (form, values, ajax) {
    ajax({
      url: 'https://just-validate-api.herokuapp.com/submit',
      method: "POST",
      data: values,
      async: true,
      callback: function (response) {
        console.log(response);
      },
    });
  },
});

new JustValidate(".js-form2", {
  colorWrong: '#FF3030',
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
      // function: (name, value) => {
      //   const valName = document.querySelector(".form__name");
      //   return valName.length === '^[A-Z][a-z][А-ЯЁ][а-яё-]';
      // }
    },
    // tel: {
    //   required: true,
    //   function: (name, value) => {
    //     const phone = selector.inputmask.unmaskedvalue();
    //     return Number(phone) && phone.length === 10;
    //   },
    // },
    email: {
      required: true,
      email: true
    },
  },
  messages: {
    name: {
      minLength: "Минимальная длина 2 символа",
      maxLength: "Максимальная длина 30 символов",
      required: "Недопустимый формат",
    },
    // tel: {
    //   required: "Укажите ваш телефон",
    // },
    email: {
      email: 'Недопустимый формат',
      required: 'Недопустимый формат'
    }
  },

  submitHandler: function (form, values, ajax) {
    ajax({
      url: 'https://just-validate-api.herokuapp.com/submit',
      method: "POST",
      data: values,
      async: true,
      callback: function (response) {
        console.log(response);
      },
    });
  },
});
