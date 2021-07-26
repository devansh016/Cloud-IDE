const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "http://65.1.94.180:2358/submissions"



const theButton = document.querySelector(".button");

theButton.addEventListener("click", () => {
    theButton.classList.add("button--loading");
});


function codeEditor(lang_id) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");


  console.log("id" + lang_id )
  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue();
      let input = document.getElementById('inputbox').value;
      $("#outputbox").html("Loading...");
      console.log(code);
      let data = {
        source_code: code,
        language_id: lang_id,
        number_of_runs: "1",
        stdin: input,
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
      console.log(data)
      let request = $.ajax({
        url: BASE_URL,
        type: "post",
        data: data,
      });

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // Callback handler that will be called on success
      request.done(async function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        let token = response.token;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 sec
        let second_request = $.ajax({
          url: BASE_URL + "/"+ token,
          type: "get",
        });
        second_request.done(function (response) {
          console.log(response.stdout);
          $("#outputbox").html(response.stdout);
          theButton.classList.remove("button--loading");
        });
      });
    });
  });
  if(lang_id==PYTHON_KEY)
      editor.setValue("def execute(): \n\t for i in range(10):\n\t\t print i \nexecute()")
      editor.getSession().setMode("ace/mode/python");
  //java
  if(lang_id==JAVA_KEY){

      let javacode = `public class Main{
  public static void main(String args[]){
    System.out.println("hello");
  }
}
`;

  editor.setValue(javacode)
  editor.getSession().setMode("ace/mode/java");

  }if(lang_id==CPP_KEY){
      let cppcode = `#include <iostream>
using namespace std;
  int main() {
      cout<<"Hello World";
}`
      editor.setValue(cppcode)
  }
  editor.setTheme("ace/theme/monokai");

} 
