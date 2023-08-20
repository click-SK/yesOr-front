function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}



export const validationRegistration = ({email, phone, password, firstName, lastName}) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      if(!isValidEmail(email)) {
        console.log('not valid email');
        valid.isValid = false;
        valid.error = 'email error';
        valid.reason = 'email';
      }

      if(password?.length <= 7) {
        valid.isValid = false;
        valid.error = 'password error';
        valid.reason = 'password';
      }

      if(phone?.length <=4) {
        valid.isValid = false;
        valid.error = 'phone error';
        valid.reason = 'phone';
      }
      if(firstName?.length <= 1) {
        valid.isValid = false;
        valid.error = 'firstName error';
        valid.reason = 'firstName';
      }
      if(lastName?.length <= 1) {
        valid.isValid = false;
        valid.error = 'lastName error';
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
        valid.error = 'name error';
        valid.reason = 'name';
      }

      if(description?.length <= 5) {
        valid.isValid = false;
        valid.error = 'description error';
        valid.reason = 'description';
      }

      if(request?.length <= 5) {
        valid.isValid = false;
        valid.error = 'request error';
        valid.reason = 'request';
      }

      if(placementPeriod <= 1) {
        valid.isValid = false;
        valid.error = 'placementPeriod error';
        valid.reason = 'placementPeriod';
      }

      if(targetAmount <= 1) {
        valid.isValid = false;
        valid.error = 'targetAmount error';
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
        valid.error = 'nameFirst error';
        valid.reason = 'nameFirst';
      }

      if(nameLast?.length <= 1) {
        valid.isValid = false;
        valid.error = 'nameLast error';
        valid.reason = 'nameLast';
      }

      if(card?.length <= 8) {
        valid.isValid = false;
        valid.error = 'card error';
        valid.reason = 'card';
      }

      if(validity?.length <= 4) {
        valid.isValid = false;
        valid.error = 'validity error';
        valid.reason = 'validity';
      }
      if(cvv?.length <= 2) {
        valid.isValid = false;
        valid.error = 'cvv error';
        valid.reason = 'cvv';
      }

      if(amount <= 1) {
        valid.isValid = false;
        valid.error = 'amount error';
        valid.reason = 'amount';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };