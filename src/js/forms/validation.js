const errorMessages = {
  empty: "This field is required",
  shortName: "Min 2 characters required",
  invalidName: "Numbers and symbols are not allowed",
  invalidPhone: "Enter 10-11 digits (e.g. 07123...)",
};

const successMessages = {
  valid: "Looks good!",
};

const initInputMasks = (form) => {
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.type === "tel") {
        let value = input.value;
        let digits = value.replace(/\D/g, "");
        if (value.startsWith("+")) {
          digits = digits.substring(0, 15);
          let chunks = digits.match(/.{1,3}/g);
          input.value = "+" + (chunks ? chunks.join(" ") : "");
        } else {
          digits = digits.substring(0, 11);
          let formatted = digits.substring(0, 5);
          if (digits.length > 5) formatted += " " + digits.substring(5, 8);
          if (digits.length > 8) formatted += " " + digits.substring(8, 11);
          input.value = formatted;
        }
      }
      if (input.name === "name") {
        input.value = input.value.replace(
          /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/g,
          "",
        );
      }
    });
  });
};

const validateField = (input) => {
  const parent = input.closest(".form__input-box");
  const errorSpan = parent.querySelector(".form__error-text");
  const value = input.value.trim();
  let isValid = true;
  let message = "";

  if (input.hasAttribute("required") && value === "") {
    isValid = false;
    message = errorMessages.empty;
  } else if (input.name === "name") {
    if (value.length < 2) {
      isValid = false;
      message = errorMessages.shortName;
    }
  } else if (input.type === "tel") {
    const digitsCount = value.replace(/\D/g, "").length;
    const isInternational = value.startsWith("+");

    const minDigits = isInternational ? 10 : 11;
    const maxDigits = isInternational ? 15 : 11;

    if (digitsCount < minDigits) {
      isValid = false;

      if (isInternational) {
        message = "Phone number is too short";
      } else {
        const remainder = minDigits - digitsCount;
        message = `Enter ${remainder} more digit${remainder > 1 ? "s" : ""}`;
      }
    } else if (digitsCount > maxDigits) {
      isValid = false;
      message = "Too many digits";
    }
  }

  if (!isValid) {
    errorSpan.textContent = message;
    parent.classList.add("_is-invalid");
    parent.classList.remove("_is-valid");
  } else {
    if (value !== "") {
      errorSpan.textContent = successMessages.valid;
      parent.classList.add("_is-valid");
    }
    parent.classList.remove("_is-invalid");
  }

  return isValid;
};

export const initValidation = (formSelector) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.setAttribute("novalidate", "");

    const inputs = form.querySelectorAll("input");
    initInputMasks(form);

    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));

      input.addEventListener("input", () => {
        const parent = input.closest(".form__input-box");

        if (input.type === "tel" || parent.classList.contains("_is-invalid")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", (e) => {
      let isFormValid = true;
      inputs.forEach((input) => {
        if (!validateField(input)) isFormValid = false;
      });

      if (!isFormValid) {
        e.preventDefault();
      } else {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log("Data is ready to send:", data);

        const successBlock = form.parentElement.querySelector(".success-block");
        if (successBlock) {
          successBlock.classList.add("success-block--shown");
          form.reset();

          inputs.forEach((input) =>
            input
              .closest(".form__input-box")
              .classList.remove("_is-valid", "_is-invalid"),
          );
        } else {
          alert("Thank you! We will call you back soon.");
          form.reset();
        }
      }
    });
  });
};
