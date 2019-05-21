var Utils = {};

Utils.getSenitizedText = function (nonSanitaizedText) {
    let temp = document.createElement('div')
    temp.textContent = nonSanitaizedText;
    return temp.innerHTML;
}

