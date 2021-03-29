//write import statements here

function init() {
  // code to initialize log service
}

function log(error) {
  //code to log the error
  // for now just logging the error to the console
  console.log(error);
}

const logService = {
  init,
  log,
};

export default logService;
