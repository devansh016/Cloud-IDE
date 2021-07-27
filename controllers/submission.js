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
    let data_send = {
        source_code: userData.source_code,
        language_id: userData.language_id,
        number_of_runs: "1",
        stdin: userData.stdin,
        expected_output: null,
        cpu_time_limit: "2",
        cpu_extra_time: "0.5",
        wall_time_limit: "5",
        memory_limit: "128000",
        stack_limit: "64000",
        max_processes_and_or_threads: "60",
        enable_per_process_and_thread_time_limit: false,
        enable_per_process_and_thread_memory_limit: false,
        max_file_size: "1024",
      };

      var config = {
        method: 'post',
        url:  compiler_url + '/submissions',
        headers: { },
        data: data_send
      };

      await axios(config)
      .then(function (response) {
        da = response.data;   
      })
      .catch(function (error) {
        return (error);
      });
      await sleep(5000);
      return getoutput(da);
}

// Function to get the details of the executed program using the token
async function getoutput(da){
  var ans;
  var config = {
    method: 'get',
    url: compiler_url + '/submissions/' + da.token + '?base64_encoded=true',
    headers: { }
  };
  await axios(config)
  .then(function (response) {
    ans = response.data;
  })
  .catch(function (error) {
    ans = error;
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