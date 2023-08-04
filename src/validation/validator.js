function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const validationRegistration = (email, password) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      if(password.length <= 7) {
        valid.isValid = false;
        valid.error = 'password error';
        valid.reason = 'password';
      }
      if(!isValidEmail(email)) {
        valid.isValid = false;
        valid.error = 'email error';
        valid.reason = 'email';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };