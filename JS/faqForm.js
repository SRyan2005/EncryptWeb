function faq(ele) {
    var x = ele.parentElement.nextElementSibling.style.cssText;
    if (x == 'max-height: 500px;') {
        ele.style.cssText = 'transform: rotate(0deg);';
        ele.parentElement.nextElementSibling.style.cssText = "transition:1s;max-height:0px;";
        setTimeout(function () {
            ele.parentElement.style.cssText = "background-color:;"
        }, 1100);
    }
    else {
        ele.style.cssText = 'transform: rotate(45deg);';
        ele.parentElement.nextElementSibling.style.cssText = "max-height:500px;";
        ele.parentElement.parentElement.style.cssText = "background-color:rgb(244, 244, 244)"
        ele.parentElement.style.cssText = "background-color:rgb(244, 244, 244);"
    }
}
function submitForm() {
    var con = document.getElementsByName('contact-form')[0];
    con.submit();
    con.reset();
    return false;
}
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
}
