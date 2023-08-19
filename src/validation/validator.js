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
  
export const validationCreateProject = ({ targetAmount, placementPeriod, request, description, name, category}) => {
    try {
      console.log('work 1',description);
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      // if(!name || name.length <= 1) {
      //   valid.isValid = false;
      //   valid.error = 'name error';
      //   valid.reason = 'name';
      // }
      console.log('work 2');
      // if(!description || description.length <= 5) {
      //   valid.isValid = false;
      //   valid.error = 'description error';
      //   valid.reason = 'description';
      // }
      console.log('work 3');
      // if(request.length <= 5) {
      //   valid.isValid = false;
      //   valid.error = 'request error';
      //   valid.reason = 'request';
      // }
      console.log('work 4');
      // if(placementPeriod <= 1) {
      //   valid.isValid = false;
      //   valid.error = 'placementPeriod error';
      //   valid.reason = 'placementPeriod';
      // }
      console.log('work 5');
      // if(targetAmount <= 1) {
      //   valid.isValid = false;
      //   valid.error = 'targetAmount error';
      //   valid.reason = 'targetAmount';
      // }
      // if(!category) {
      //   valid.isValid = false;
      //   valid.error = 'category error';
      //   valid.reason = 'category';
      // }
      console.log('valid',valid);

      return valid;

    } catch (e) {
      console.log(e);
    }
  };