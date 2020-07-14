import { isBlank, isInvalidEmail } from '@/validators';

export const defaultErrors = () => {
	return {
		email           : { error: null, message: "" },
		password       : { error: null, message: "" },
	}
}

export default function(fields) {
	let isValid = true;
	let errors = defaultErrors();

  if(isBlank(fields.email))
  {
    errors.email = { error: true, message: "Email cannot be blank." }
    isValid = false;
  }
  else if(isInvalidEmail(fields.email))
  {
    errors.email = { error: true, message: "Email is not a valid email address." }
    isValid = false;
  }

	if(isBlank(fields.password))
	{
		errors.password = { error: true, message: "Password cannot be blank." }
		isValid = false;
	}

	return { result: isValid, errors }
}

