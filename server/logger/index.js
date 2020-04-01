const REQ_START_MSG = '\n\n=========== REQUEST LOGGER ============'
const LINE_BREAK_L  = '======================================='
const LINE_BREAK_S  = '---------------------------------------'
const REQ_END_MSG   = '================ END ==================\n\n'

function listener(port) {
  console.log('\n\nExpress server is running!\n');
  console.log('You can view the application at:');
  console.log(`http://localhost:${port}/\n\n`);
}

function requests(req, _, next) {
  console.log(REQ_START_MSG);
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  if (Object.entries(req.body).length) {
    console.log(LINE_BREAK_L);
    console.log('REQUEST BODY:');
    console.log(LINE_BREAK_S);
    console.log(req.body);
  }
  if (Object.entries(req.query).length) {
    console.log(LINE_BREAK_L);
    console.log('Request Query:');
    console.log(LINE_BREAK_S);
    console.log(req.query);
  }
  console.log(REQ_END_MSG);
  next();
}

module.exports = {
  listener,
  requests,
};
