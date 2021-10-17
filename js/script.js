// $(document).ready(function () {
console.log('hello');
var billAmount = document.querySelector("#bill-amount");
var tipValue = document.querySelectorAll('.tip-form-value');
var peopleNumber = document.querySelector('#number-people');
var tipTotal = document.querySelector('.results-tip-total');
var totalBill = document.querySelector('.results-total-total');
var reset = document.querySelector('.results-reset');

let dollar = Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD'
});

let bill = 0 ;
let tip = 0 ;
let people = 0;

billAmount.addEventListener("change", (event) => {
    if(billAmount.value) {
        bill = parseFloat(billAmount.value);
    }
    console.log('bill', bill);
    calculateTotal()
});

tipValue.forEach( function (e) {
    if(e.id == 'tip-form-value-custom'){
        e.addEventListener('change', (event) =>{
         removeActiveButton(e);
         if(e.value){
             tip = parseFloat(e.value) /100 ;
             calculateTotal()
         }
        })
    }else{
       let tipArray = e.id.split('-');
       let tipQuantity = parseInt(tipArray[tipArray.length -1]);
       console.log('tip',tipQuantity);
       e.addEventListener('click' , (event) => {
           removeActiveButton(tip);
           e.classList.add('active');
           tip = tipQuantity / 100 ;
           calculateTotal()
       })
    }
} )
peopleNumber.addEventListener('change' , function(){
    if(parseInt(peopleNumber.value) !== 0){
        document.querySelector('.people-form-zero').style.display = 'none';
    }else{
        document.querySelector('.people-form-zero').style.display = 'block';
    }
    people = parseInt(peopleNumber.value);
    calculateTotal();
})
reset.addEventListener('click', (event) => {
    bill = 0 ;
    people = 0 ;
    tip = 0 ;
    billAmount.value = '';
    peopleNumber.value ='';
    tipValue[tipValue.length - 1 ].value ='';
    totalBill.value = '';
    tipTotal.innerHTML = dollar.format(0);
    totalBill.innerHTML = dollar.format(0);
    calculateTotal();
    removeActiveButton(undefined);
}) 
function calculateTotal(){
    if (bill ===0 ) return ;
    else if(people === 0) return ;

    let tipValue = (bill * tip) / people ;
    let totalValue = bill / people ;
    tipTotal.innerHTML = dollar.format(tipValue);
    totalBill.innerHTML = dollar.format(totalValue + tipValue);
}
function removeActiveButton(tip){
 tipValue.forEach(button =>{
     if(button !== tip){
         if(button.id == 'tip-form-value-custom'){
             button.value ='';
         }
         if(button.classList.contains('active')){
             button.classList.remove('active');
         }
     }
 });
}
// });