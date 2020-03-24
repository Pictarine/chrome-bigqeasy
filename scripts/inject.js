
function checkCodeMirror() {
  let cm = document.querySelector(".CodeMirror").CodeMirror;

  console.log("CM", cm); 

  if (cm.getValue().length > 0)
    cm.setValue("/* " + cm.getValue() + "*/\n" + "SELECT * FROM `tempTable`");
}

function injectFn(tempTable) {
  let script = document.createElement("script");
  script.innerHTML = checkCodeMirror.toString().replace('tempTable', tempTable);
  script.innerHTML += "checkCodeMirror();";
  document.body.appendChild(script);
}