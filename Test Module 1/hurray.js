const rulesOpen = document.getElementById('rules-button');
const ruleBox = document.getElementById('rules-box');

rulesOpen.addEventListener('click', () => {
  ruleBox.show();
});

const rulesClose = document.getElementById('rules-close');
rulesClose.addEventListener('click', () => {
  ruleBox.close();
});