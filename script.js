// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
//for login button
const buttons = document.querySelectorAll('.btn');
function changeStyle(event) {
     event.target.style.color = '#fff';
     event.target.style.backgroundColor = '#000';
}
function restoreStyle(event){
    event.target.style.color ='#000000';
    event.target.style.backgroundColor = '#fff';
}
buttons.forEach((button) => {
button.addEventListener('mouseenter', changeStyle);
button.addEventListener('mouseleave', restoreStyle);
});
