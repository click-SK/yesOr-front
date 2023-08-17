function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const validationRegistration = ({email, phone, password, firstName, lastName, passport, socialNetwork, requisites}) => {
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
      if(passport?.length <= 4) {
        valid.isValid = false;
        valid.error = 'passport error';
        valid.reason = 'passport';
      }
      if(socialNetwork?.length <= 1) {
        valid.isValid = false;
        valid.error = 'socialNetwork error';
        valid.reason = 'socialNetwork';
      }
      if(requisites?.length <= 4) {
        valid.isValid = false;
        valid.error = 'requisites error';
        valid.reason = 'requisites';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };
export const validationCreateProject = ({bonus, targetAmount, placementPeriod, team, request, description, name, category}) => {
    try {
      let valid = {
        isValid: true,
        error: '',
        reason: ''
      }
      if(name.length <= 1) {
        valid.isValid = false;
        valid.error = 'name error';
        valid.reason = 'name';
      }
      if(description.length <= 5) {
        valid.isValid = false;
        valid.error = 'description error';
        valid.reason = 'description';
      }
      if(request.length <= 5) {
        valid.isValid = false;
        valid.error = 'request error';
        valid.reason = 'request';
      }
      if(team.length <= 1) {
        valid.isValid = false;
        valid.error = 'team error';
        valid.reason = 'team';
      }
      if(bonus.length <= 1) {
        valid.isValid = false;
        valid.error = 'bonus error';
        valid.reason = 'bonus';
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
      if(!category) {
        valid.isValid = false;
        valid.error = 'category error';
        valid.reason = 'category';
      }

      return valid;

    } catch (e) {
      console.log(e);
    }
  };