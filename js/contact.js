class FormValidator {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.inputs = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      phone: document.getElementById("phone"),
      message: document.getElementById("message"),
    };

    this.regexPatterns = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone: /^\d+$/,
    };

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  validateInput(field, value) {
    if (!value.trim()) {
      return "This structural block cannot match empty allocations.";
    }

    if (this.regexPatterns[field] && !this.regexPatterns[field].test(value)) {
      if (field === "email")
        return "Invalid structural signature for target e-mail address domain.";
      if (field === "phone")
        return "Syntax restriction applied: Numeric integers values only.";
    }

    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    let hasErrors = false;

    Object.keys(this.inputs).forEach((key) => {
      const inputElement = this.inputs[key];
      const errorContainer = document.getElementById(`${key}-error`);
      const errorMessage = this.validateInput(key, inputElement.value);

      if (errorMessage) {
        errorContainer.textContent = errorMessage;
        inputElement.style.borderColor = "var(--error)";
        hasErrors = true;
      } else {
        errorContainer.textContent = "";
        inputElement.style.borderColor = "var(--success)";
      }
    });

    if (!hasErrors) {
      alert(
        "Security clearance processing complete. Payload synchronized successfully.",
      );
      this.form.reset();
      Object.values(this.inputs).forEach((el) => (el.style.borderColor = ""));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new FormValidator());
