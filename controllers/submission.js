var axios = require('axios');

async function executecode(userData){
    var da;
    let data_send = {
        source_code: userData.source_code,
        language_id: userData.lang_id,
        number_of_runs: "1",
        stdin: userData.input,
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
        url: 'http://65.1.94.180:2358/submissions',
        headers: { },
        data: data_send
      };
      
      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        da = JSON.stringify(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
        return (error);
      });
      return da;

}

module.exports = {
    executecode
}