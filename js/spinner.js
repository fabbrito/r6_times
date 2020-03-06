var spinner = document.querySelector("#spinner");

//=============================================================
function addSpinner() {
  spinner.classList.add("spinner-border");
  spinner.classList.add("text-danger")

};
//=============================================================
function removeSpinner() {
  spinner.classList.remove("spinner-border");
  spinner.classList.remove("text-danger")
};