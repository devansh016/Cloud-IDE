const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "https://cloud-ide-app.herokuapp.com/submission"

const theButton = document.querySelector(".button");

theButton.addEventListener("click", () => {
    theButton.classList.add("button--loading");
});

// Function for langauge selection box
function onSelectChange(selectedVal){ 
  if(selectedVal != undefined && selectedVal!=null && selectedVal!=""){
    $("button").off('click');
    codeEditor(selectedVal)
  }
}

// CPP as default language selector
window.onload = function () {
  codeEditor("53");
};

//Function to execute code requires language id as parameter
function codeEditor(lang_id) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue();
      let input = document.getElementById('inputbox').value;
      $("#outputbox").html("Compiling...");
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
        if(response.status.id==3){
          console.log(response);
          $("#outputbox").html(response.stdout);
        } else{
          $("#outputbox").html(response.status.description);
        }
        theButton.classList.remove("button--loading");
        
      });
    });
  });

  if(lang_id==PYTHON_KEY){
    editor.setValue(`def execute(): \n\t for i in range(10):\n\t\t print i \nexecute()`)
    editor.getSession().setMode("ace/mode/python");
    document.getElementById('inputbox').value = "";
  }
  if(lang_id==JAVA_KEY){
    editor.setValue(`public class Main{\n\tpublic static void main(String args[]){\n\t\tSystem.out.println("Hello World!");\n\t}\n}`);
    editor.getSession().setMode("ace/mode/java");
    document.getElementById('inputbox').value = "";
  }
  if(lang_id==CPP_KEY){
    editor.setValue(`#include <iostream>\nusing namespace std;\nint main() {\n\tstring name;\n\tcin >> name;\n\tcout<<"Hello, Welcome to " << name << "!";\n}`);
    editor.getSession().setMode("ace/mode/c_cpp");
    document.getElementById('inputbox').value = "Cloud-IDE";
  }
  editor.setTheme("ace/theme/monokai");
} 