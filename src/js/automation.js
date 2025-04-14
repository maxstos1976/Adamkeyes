/**
 * Crea una clase FormComponent con todos los elementos del formulario y el formulario en sí.
 */
class FormComponent {
  #form = /** @type {HTMLFormElement}*/ (document.getElementById('form'));
  #name = /** @type {HTMLInputElement} */ (document.getElementById('name'));
  #email = /** @type {HTMLInputElement} */ (document.getElementById('email'));
  #textarea = /** @type {HTMLTextAreaElement} */ (
    document.getElementById('message')
  );

  /**
   * No recibe ningún argumento o parámetro
   */
  constructor() {
    this.#form.addEventListener('submit', this.#submitForm.bind(this));
  }

  /**
   * @param {Event} evtObj - La interfaz del evento que ocurre en el formulario.
   * @return {void} - Este método no retorna nada
   */
  #submitForm(evtObj) {
    this.#validateName(evtObj);
    this.#validateEmail(evtObj);
    this.#validateText(evtObj);
  }

  /**
   * @param {Event} evtObj - La interfaz del evento que ocurre en el formulario
   * @return {void}
   */
  #validateText(evtObj) {
    if (
      this.#textarea.value.trim() === '' ||
      this.#textarea.validity.valueMissing
    ) {
      evtObj.preventDefault();
      this.#showErrorState(this.#textarea, 'Please enter a text');
    }

     // Verifica si la cantidad de caracteres que el usuario ingresó es menor a lo esperado
    if (this.#textarea.validity.tooShort) {
      evtObj.preventDefault();
      this.#showErrorState(this.#textarea, 'Message is too short');
    }

    // Verifica si la cantidad de caracteres que el usuario ingresó es mayor a lo esperado
    if (this.#textarea.validity.tooLong) {
      evtObj.preventDefault();
      this.#showErrorState(this.#textarea, 'Message is too long');
    }

    // El usuario ha cumplido con todas las condiciones para que la regla sea válida.
    if (this.#textarea.validity.valid) {
      this.#showErrorState(this.#textarea, '');
    }
  }

  /**
   * @param {Event} evtObj - La interfaz del evento que ocurre en el formulario.
   * @return {void} - Este método no retorna nada
   */
  #validateEmail(evtObj) {
    // Muestra un error al usuario si no se ingresa nada al enviar el formulario
    if (this.#email.value.trim() === '' || this.#name.validity.valueMissing) {
      evtObj.preventDefault();
      this.#showErrorState(this.#email, 'Please enter an email');
    }

    // Si el usuario ingresa un correo electrónico sin '@' o '.org', '.com', etc., se muestra un error.
    if (this.#email.validity.typeMismatch) {
      evtObj.preventDefault();
      this.#showErrorState(this.#email, 'Sorry, invalid format here');
    }

    // El usuario ha cumplido con todas las condiciones para que el campo sea válido.
    if (this.#email.validity.valid) {
      this.#removeErrorState(this.#email, '');
    }
  }

  /**
   * @param {Event} evtObj - La interfaz del evento que ocurre en el formulario.
   * @return {void} - Este método no retorna nada
   */
  #validateName(evtObj) {
    // Muestra un error al usuario si no se ingresa nada al enviar el formulario.
    if (this.#name.value.trim() === '' || this.#name.validity.valueMissing) {
      evtObj.preventDefault();
      this.#showErrorState(this.#name, 'Please enter a name');
    }

     // Verifica si la cantidad de caracteres que el usuario ingresó es menor a lo esperado
    if (this.#name.validity.tooShort) {
      evtObj.preventDefault();
      this.#showErrorState(this.#name, 'Name entered is too short');
    }

    // Verifica si la cantidad de caracteres que el usuario ingresó es mayor a lo esperado.
    if (this.#name.validity.tooLong) {
      evtObj.preventDefault();
      this.#showErrorState(this.#name, 'Name entered is too long');
    }

    // Verifica si el usuario ingresa un número en lugar de una cadena de texto.
    if (this.#name.validity.patternMismatch) {
      evtObj.preventDefault();
      this.#showErrorState(this.#name, 'Please enter a name');
    }

    // Todas las demás condiciones deberían ser válidas.
    if (this.#name.validity.valid) {
      this.#removeErrorState(this.#name, '');
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement - El elemento de entrada o el área de texto
   * @param {string} message - El mensaje de error dependiendo de lo que el usuario viole.
   * @return {void}
   */
  #showErrorState(formElement, message) {
    formElement.setAttribute('aria-invalid', 'true');
    /**
     * Este bloque se utiliza para manejar los mensajes de error en un formulario
     * Verifica si el siguiente hermano del elemento de formulario es un <p></p> con la clase 'err-msg'
     * Si lo es, asignamos una variable err-msg a él.
     * Si no lo es, vamos al siguiente hermano.
     * @type {Element | null | undefined} errorMessage
     */
    let errorMessage = null;

    if (formElement.nextElementSibling?.classList.contains('err-msg')) {
      errorMessage = formElement.nextElementSibling;
    } else {
      errorMessage = formElement.nextElementSibling?.nextElementSibling;
      if (formElement.nextElementSibling !== null) {
        formElement.nextElementSibling.className =
          'icon-error__show icon-error';
      }
    }

    if (errorMessage instanceof HTMLElement) {
      errorMessage.innerText = message;
      errorMessage.removeAttribute('hidden');
    } else {
      return;
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement - El elemento de entrada o el área de texto
   * @param {string} message - El mensaje de error dependiendo de lo que el usuario viole.
   * @return {void}
   */
  #removeErrorState(formElement, message) {
    formElement.setAttribute('aria-invalid', 'false');
    /**
     * Este bloque se utiliza para manejar los mensajes de error en un formulario
     * Verifica si el siguiente hermano del elemento de formulario es un <p></p> con la clase 'err-msg'
     * Si lo es, asignamos una variable err-msg a él.
     * Si no lo es, vamos al siguiente hermano.
     * @type {Element | null | undefined} errorMessage
     */
    let errorMessage = null;

    if (formElement.nextElementSibling?.classList.contains('err-msg')) {
      errorMessage = formElement.nextElementSibling;
    } else {
      errorMessage = formElement.nextElementSibling?.nextElementSibling;
      if (formElement.nextElementSibling !== null) {
        formElement.nextElementSibling.className =
          'icon-error__hide icon-error';
      }
    }

    if (errorMessage instanceof HTMLElement) {
      errorMessage.innerText = message;
      errorMessage.setAttribute('hidden', 'hidden');
    } else {
      return;
    }
  }
}

new FormComponent();

/**
 * La clase establece el esquema para iniciar las animaciones
 */
class BootstrapAnimation {
  #target;

  /**
   *
   * @param {Node} target - Los elementos que estaremos observando
   */
  constructor(target) {
    this.#target = target;
    this.#observeIntersection();
  }

  /**
   *
   * @param {Array<IntersectionObserverEntry>} entries
   * @param {IntersectionObserver} observer
   */
  #handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('OnIt');
        if (this.#target instanceof Element) {
          observer.unobserve(this.#target);
        }
      }
    });
  }

  /**
   * Este método se llamará en el constructor para iniciar el observeIntersection.
   */
  #observeIntersection() {
    const observerOptions = {
      root: null,
      threshold: 0.2,
      rootMargin: '20px 0px 0px 0px'
    };

    const observer = new IntersectionObserver(
      this.#handleIntersection.bind(this),
      observerOptions
    );

    if (this.#target instanceof Element) {
      observer.observe(this.#target);
    }
  }
}

/**
 * La función instanciará una clase que iniciará la animación de la página cuando se cargue. 
 * También debería poder usar window.addEventListener('load', callback)
 * @return {void}
 */
function animateOnIt() {
  const sections = /** @type {NodeList}*/ (
    document.querySelectorAll('.animate')
  );
  sections.forEach(function (section) {
    // Aquí, debido a los saltos de línea que se interpretan como nodo de texto, 
    // el elemento div es el segundo nodo hijo en el elemento section mientras se recorre el DOM.
    const target = section.childNodes[1];
    new BootstrapAnimation(target);
  });
}

animateOnIt();
