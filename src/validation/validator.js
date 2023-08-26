function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const validationRegistration = ({email, phone, password, firstName, lastName, secondPassword}) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      const firstPassword = password;

      if(!isValidEmail(email)) {
        console.log('not valid email');
        valid.isValid = false;
        valid.error = 'This email is not valid';
        valid.reason = 'email';
      }

      if(firstPassword != secondPassword) {
        valid.isValid = false;
        valid.error = 'Unfaithful repeat password';
        valid.reason = 'secondPassword';
      }

      if(password?.length <= 7) {
        valid.isValid = false;
        valid.error = 'The password must be at least 7 characters long';
        valid.reason = 'password';
      }

      if(phone?.length <= 9) {
        valid.isValid = false;
        valid.error = 'Phone must be minimum 10 symbols';
        valid.reason = 'phone';
      }
      if(firstName?.length <= 1) {
        valid.isValid = false;
        valid.error = 'First name must be minimum 2 mymbols';
        valid.reason = 'firstName';
      }
      if(lastName?.length <= 1) {
        valid.isValid = false;
        valid.error = 'Last name must be minimum 2 mymbols';
        valid.reason = 'lastName';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };
  
export const validationCreateProject = ({ targetAmount, placementPeriod, request, description, name}) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      if(name?.length <= 1) {
        valid.isValid = false;
        valid.error = 'Name must be minimum 2 mymbols';
        valid.reason = 'name';
      }

      if(description?.length <= 14) {
        valid.isValid = false;
        valid.error = 'Description must be minimum 15 mymbols';
        valid.reason = 'description';
      }

      if(request?.length <= 4) {
        valid.isValid = false;
        valid.error = 'Request must be minimum 15 mymbols';
        valid.reason = 'request';
      }

      if(placementPeriod <= 1) {
        valid.isValid = false;
        valid.error = 'Placement period must be minimum 2 days';
        valid.reason = 'placementPeriod';
      }

      if(targetAmount <= 9) {
        valid.isValid = false;
        valid.error = 'Target amount must be minimum 10$';
        valid.reason = 'targetAmount';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };
export const validationDonate = ({ nameFirst, nameLast, amount, card, validity, cvv}) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      if(nameFirst?.length <= 1) {
        valid.isValid = false;
        valid.error = 'First name must be minimum 2 mymbols';
        valid.reason = 'nameFirst';
      }

      if(nameLast?.length <= 1) {
        valid.isValid = false;
        valid.error = 'Last name must be minimum 2 mymbols';
        valid.reason = 'nameLast';
      }

      if(card?.length <= 15) {
        valid.isValid = false;
        valid.error = 'Card must be minimum 16 symbols';
        valid.reason = 'card';
      }

      if(validity?.length <= 6) {
        valid.isValid = false;
        valid.error = 'Date must be minimum 7 symbols';
        valid.reason = 'validity';
      }
      if(cvv?.length <= 2) {
        valid.isValid = false;
        valid.error = 'CVV must be minimum 3 symbols';
        valid.reason = 'cvv';
      }

      if(amount <= 1) {
        valid.isValid = false;
        valid.error = 'Amount must be minimum 2$';
        valid.reason = 'amount';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };