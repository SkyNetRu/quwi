export const isBlank = (value) => {
    return (value + "").trim() === "";
}

export const isInvalidEmail = (value) => {
  var emailPattern = /\S+@\S+\.\S+/;
  return !emailPattern.test(value);
}

export const parseError = (err) => {
	console.log("PARSING ERROR");
	console.log(err);
	return typeof err.errors !== 'undefined' ? err.errors : ["An error occurred while saving your information.  Please try refreshing the page."];
}
