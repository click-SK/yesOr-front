function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const validationRegistration = ({email, phone, password, firstName, lastName, secondPassword}) => {
    try {
      let arr = [];
      const firstPassword = password;

      if(!isValidEmail(email)) {
        arr.push({
          isValid: false,
          error: 'This email is not valid',
          reason: 'email'
        })
      }

      if(firstPassword != secondPassword) {
        arr.push({
          isValid: false,
          error: 'Unfaithful repeat password',
          reason: 'secondPassword'
        })
      }

      if(password?.length <= 6) {
        arr.push({
          isValid: false,
          error: 'The password must be at least 7 characters long',
          reason: 'password'
        })
      }

      if(phone?.length <= 9) {
        arr.push({
          isValid: false,
          error: 'Phone must be minimum 10 symbols',
          reason: 'phone'
        })
      }
      if(firstName?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'First name must be minimum 2 symbols',
          reason: 'firstName'
        })
      }
      if(lastName?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Last name must be minimum 2 symbols',
          reason: 'lastName'
        })
      }

      return arr;

    } catch (e) {
      console.log(e);
    }
  };
  
  export const validationCreateProject = ({ targetAmount, placementPeriod, request, description, name, secondCategory, secondSubCategory}) => {
    try {
      let arr = [];

      if(name?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Name must be minimum 2 symbols',
          reason: 'name'
        })
      }
      if(secondCategory?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Category must be minimum 2 symbols',
          reason: 'secondCategory'
        })
      }
      if(secondSubCategory?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Sub сtegory must be minimum 2 symbols',
          reason: 'secondSubCategory'
        })
      }

      if(description?.length <= 14) {
        arr.push({
          isValid: false,
          error: 'Description must be minimum 15 symbols',
          reason: 'description'
        })
      }

      if(request?.length <= 9) {
        arr.push({
          isValid: false,
          error: 'Request must be minimum 10 symbols',
          reason: 'request'
        })
      }

      if(placementPeriod <= 1) {
        arr.push({
          isValid: false,
          error: 'Placement period  is not specified',
          reason: 'placementPeriod'
        })
      }

      if(targetAmount <= 9) {
        arr.push({
          isValid: false,
          error: 'Target amount must be minimum 10$',
          reason: 'targetAmount'
        })
      }

      return arr;

    } catch (e) {
      console.log(e);
    }
  };
export const validationDonate = ({ nameFirst, nameLast, amount, card, validity, cvv}) => {
    try {
      let arr = [];

      if(nameFirst?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'First name must be minimum 2 mymbols',
          reason: 'nameFirst'
        })
      }

      if(nameLast?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Last name must be minimum 2 mymbols',
          reason: 'nameLast'
        })
      }

      if(card?.length <= 18 || card?.length >= 20) {
        arr.push({
          isValid: false,
          error: 'Card must be 16 symbols',
          reason: 'card'
        })
      }

      if(validity?.length <= 4 || validity?.length >= 6) {
        arr.push({
          isValid: false,
          error: 'Date must be 5 symbols',
          reason: 'validity'
        })
      }
      if(cvv?.length <= 2 || cvv?.length >= 4) {
        arr.push({
          isValid: false,
          error: 'CVV must be 3 symbols',
          reason: 'cvv'
        })
      }

      if(amount <= 1) {
        arr.push({
          isValid: false,
          error: 'Amount must be minimum 2$',
          reason: 'amount'
        })
      }

      return arr;

    } catch (e) {
      console.log(e);
    }
  };
  
export const validationComment = ({ name, description}) => {
    try {
      let arr = [];

      if(name?.length <= 1) {
        arr.push({
          isValid: false,
          error: 'Name must be minimum 2 mymbols',
          reason: 'name'
        })
      }

      if(description?.length <= 4) {
        arr.push({
          isValid: false,
          error: 'description must be minimum 5 mymbols',
          reason: 'description'
        })
      }

      return arr;

    } catch (e) {
      console.log(e);
    }
  };