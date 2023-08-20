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