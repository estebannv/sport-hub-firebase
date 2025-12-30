export interface ValidationResult {
  isValid: boolean;
  message: string;
}

const ValidationService = {

  /**
   * Valida un nombre completo
   * @param fullName - El nombre completo a validar
   * @returns ValidationResult con isValid y message
   */
  validateFullName(fullName: string): ValidationResult {
    if (!fullName || fullName.trim() === '') {
      return {
        isValid: false,
        message: 'El nombre completo es requerido.'
      };
    }

    if (fullName.trim().length < 8) {
      return {
        isValid: false,
        message: 'El nombre completo debe tener al menos 8 caracteres.'
      };
    }

    return {
      isValid: true,
      message: ''
    };
  },

  /**
   * Valida un correo electrónico
   * @param email - El correo electrónico a validar
   * @returns ValidationResult con isValid y message
   */
  validateEmail(email: string): ValidationResult {
    if (!email || email.trim() === '') {
      return {
        isValid: false,
        message: 'El correo electrónico es requerido.'
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'El correo electrónico ingresado no es válido.'
      };
    }

    return {
      isValid: true,
      message: ''
    };
  },

  /**
   * Valida una contraseña
   * @param password - La contraseña a validar
   * @returns ValidationResult con isValid y message
   */
  validatePassword(password: string): ValidationResult {
    if (!password || password.trim() === '') {
      return {
        isValid: false,
        message: 'La contraseña es requerida.'
      };
    }

    return {
      isValid: true,
      message: ''
    };
  },

  /**
   * Valida tanto el correo electrónico como la contraseña
   * @param email - El correo electrónico a validar
   * @param password - La contraseña a validar
   * @returns ValidationResult con isValid y message (el primer error encontrado)
   */
  validateEmailAndPassword(email: string, password: string): ValidationResult {
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      return passwordValidation;
    }

    return {
      isValid: true,
      message: ''
    };
  }

};

export default ValidationService;

