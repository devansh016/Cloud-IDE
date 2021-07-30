var axios = require('axios');
require('dotenv').config();

var compiler_url = process.env.compiler_url;
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

// Function to send exection request to compiler
// Gets a token from the compiler server
async function executecode(userData){
    var da;
      var options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'false', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': process.env.rapidapikey,
          'x-rapidapi-host':  process.env.rapidapihost
        },
        data: {
          source_code: userData.source_code,
          language_id: userData.language_id,
          number_of_runs: "1",
          stdin: userData.stdin,
          expected_output: null,
          cpu_time_limit: "2",
          cpu_extra_time: "0.5",
          wall_time_limit: "1",
          memory_limit: "128000",
          stack_limit: "64000",
          max_processes_and_or_threads: "60",
          enable_per_process_and_thread_time_limit: false,
          enable_per_process_and_thread_memory_limit: false,
          max_file_size: "1024",
        }
      };
      await axios.request(options).then(function (response) {
        da = response.data;
      }).catch(function (error) {
        console.error(error);
      });
      await sleep(1000);
      return getoutput(da.token);
}

// Function to get the details of the executed program using the token
async function getoutput(da){
  var ans;
  var options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/' + da,
    params: {base64_encoded: 'true', fields: '*'},
    headers: {
      'x-rapidapi-key': process.env.rapidapikey,
      'x-rapidapi-host':  process.env.rapidapihost
    }
  };
  
  await axios.request(options).then(function (response) {
    ans = response.data;
  }).catch(function (error) {
    console.error(error);
  });

  //Decoding base64 strings
  if(ans.stdout != null){
    var b = new Buffer(ans.stdout, 'base64');
    ans.stdout = b.toString();
  }
  if(ans.stderr != null){
    var b = new Buffer(ans.stderr, 'base64')
    ans.stderr = b.toString();
  }
  return ans; 
}

module.exports = {
    executecode
}