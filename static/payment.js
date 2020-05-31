function PayjpElementSet(payjpdata){
    var fundBtn = document.getElementById('fund-button');
    const elements = payjpdata.elements();
    elements.create('card', {style: {base: {color: '#fff'}}})
    const cardElement = elements.getElement('card');
    cardElement.mount('#fundpage');
}