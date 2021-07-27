const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "https://cloud-ide-app.herokuapp.com/submission"

const theButton = document.querySelector(".button");

theButton.addEventListener("click", () => {
    theButton.classList.add("button--loading");
});

//Function to execute code requires language id as parameter
function codeEditor(lang_id) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue();
      let input = document.getElementById('inputbox').value;
      $("#outputbox").html("Loading...");
      let data = {
        source_code: code,
        language_id: lang_id,
        stdin: input,
      };
      let request = $.ajax({
        url: BASE_URL,
        type: "post",
        data: data,
      });
      request.done(async function (response, textStatus, jqXHR) {
        $("#outputbox").html(response.stdout);
        theButton.classList.remove("button--loading");
      });
    });
  });

  if(lang_id==PYTHON_KEY){
    editor.setValue("def execute(): \n\t for i in range(10):\n\t\t print i \nexecute()")
    editor.getSession().setMode("ace/mode/python");
  }

  if(lang_id==JAVA_KEY){
    let javacode = `public class Main{
    public static void main(String args[]){
      System.out.println("Hello World!");
    }
  }`;
  editor.setValue(javacode)
  editor.getSession().setMode("ace/mode/java");
  }

  if(lang_id==CPP_KEY){
    let cppcode = `#include <iostream>
    using namespace std;
    int main() {
      cout<<"Hello World";
    }`
    editor.setValue(cppcode)
    editor.getSession().setMode("ace/mode/cpp");
  }
  editor.setTheme("ace/theme/monokai");
} 
