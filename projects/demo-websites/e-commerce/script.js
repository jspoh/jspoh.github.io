const totalCards = 12;

/*opening checks and updates*/
let likedItems = [];
let cartItems = [];
let tempItemName = '';

if (localStorage.likedItems !== undefined) {
    let tempLikedItems = localStorage.likedItems.split(',');
    for (let i=0; i<tempLikedItems.length; i++) {
        if (i%2 === 0) {
            tempItemName = tempLikedItems[i];
        }
        else {
            likedItems.push([tempItemName, tempLikedItems[i]]);
        }
    }
}
tempItemName = '';
if (localStorage.cartItems !== undefined) {
    let tempcartItems = localStorage.cartItems.split(',');
    for (let i=0; i<tempcartItems.length; i++) {
        if (i%2 === 0) {
            tempItemName = tempcartItems[i];
        }
        else {
            cartItems.push([tempItemName, tempcartItems[i]]);
        }
    }
}
else {}

for (let i=0; i<likedItems.length; i++) {
        for (let j=0; j<totalCards; j++) {
            try {
                if (likedItems[i][0] === document.querySelector(`#product${j}title`).innerText) {
                    document.querySelector(`#product${j}like`).classList.add('noDisplay');
                    document.querySelector(`#product${j}liked`).classList.remove('noDisplay');
                }
            }
            catch (error) {
                console.log(error);
            }
        }
}
for (let i=0; i<cartItems.length; i++) {
    for (let j=0; j<totalCards; j++) {
        try {
            if (cartItems[i][0] === document.querySelector(`#product${j}title`).innerText) {
                document.querySelector(`#product${j}cart`).classList.add('noDisplay');
                document.querySelector(`#product${j}carted`).classList.remove('noDisplay');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}


/* drop down content */
const categoryBtn = document.querySelector('#category');
const dropdownContent = document.querySelector('.dropdownContent');
let isHovering = false;

document.addEventListener('mouseover', (e)=>{
    if (e.target.id === 'category') {
        isHovering = true;
        dropdownContent.classList.add('ddActive');
    }
    else if (e.target.classList[0] === 'ddContent' && isHovering || e.target.classList[0] === 'dd' && isHovering) {
        dropdownContent.classList.add('ddActive');
    }
    else {dropdownContent.classList.remove('ddActive'); isHovering = false;}
})



/* product cards */
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener('mouseenter', (e)=>{
        document.querySelector(`#${e.target.id}`).classList.add('showInfo');
        document.querySelector(`#${e.target.id}info`).classList.remove('hide');
    })
    card.addEventListener('mouseleave', (e)=>{
        document.querySelector(`#${e.target.id}`).classList.remove('showInfo');
        document.querySelector(`#${e.target.id}info`).classList.add('hide');
    })
}



/* liking/adding to cart */

for (let i=0; i<totalCards; i++) {
    /*add*/
    try {
        document.querySelector(`#product${i}like`).addEventListener('click', (e)=>{
            let likedItemName = document.querySelector(`#product${i}title`).innerText;
            let likedItemPrice = document.querySelector(`#product${i}price`).innerText.slice(1);
            likedItems.push([likedItemName, likedItemPrice]);
            localStorage.likedItems = likedItems;

            document.querySelector(`#product${i}like`).classList.add('noDisplay');
            document.querySelector(`#product${i}liked`).classList.remove('noDisplay');
        })
        document.querySelector(`#product${i}cart`).addEventListener('click', (e)=>{
            let cartItemName = document.querySelector(`#product${i}title`).innerText;
            let cartItemPrice = document.querySelector(`#product${i}price`).innerText.slice(1);
            cartItems.push([cartItemName, cartItemPrice]);
            localStorage.cartItems = cartItems;

            console.log(`#product${i}carted`)
            document.querySelector(`#product${i}cart`).classList.add('noDisplay');
            console.log(`#product${i}carted`)
            document.querySelector(`#product${i}carted`).classList.remove('noDisplay');
        })
        /*remove*/
        document.querySelector(`#product${i}liked`).addEventListener('click', (e)=>{
            let unlikedItemName = document.querySelector(`#product${i}title`).innerText;
            for (let j=0; j<totalCards; j++) {
                if (likedItems[j][0] === unlikedItemName) {
                    likedItems.splice(j, 1);
                    break;
                }
            }
            localStorage.likedItems = likedItems;

            document.querySelector(`#product${i}liked`).classList.add('noDisplay');
            document.querySelector(`#product${i}like`).classList.remove('noDisplay');
        })
        document.querySelector(`#product${i}carted`).addEventListener('click', (e)=>{
            let uncartItemName = document.querySelector(`#product${i}title`).innerText;
            for (let j=0; j<totalCards; j++) {
                if (cartItems[j][0] === uncartItemName) {
                    cartItems.splice(j, 1);
                    break;
                }
            }
            localStorage.cartItems = cartItems;

            document.querySelector(`#product${i}carted`).classList.add('noDisplay');
            document.querySelector(`#product${i}cart`).classList.remove('noDisplay');
        })
    }
    catch (error) {console.log(error);}
}



/* adding items to liked page */
const ulLiked = document.querySelector('#likedItemsList');

try {
    for (let i=0;i<likedItems.length;i++) {
        const newLi = document.createElement('li');
        const newP = document.createElement('p');
        const newSpan = document.createElement('span');

        newP.innerHTML = likedItems[i][0];
        newSpan.innerHTML = '$' + likedItems[i][1];

        newP.classList.add('likedTitle');
        newSpan.classList.add('likedPrice');
        newLi.classList.add('doneList');

        newLi.append(newP);
        newLi.append(newSpan);

        ulLiked.append(newLi);   
    }
}
catch (error) {}
try {
    /* adding items to cart page */
    const ulCart = document.querySelector('#cartItemsList');
    let totalCost = 0;

    for (let i=0;i<cartItems.length;i++) {
        const newLi = document.createElement('li');
        const newP = document.createElement('p');
        const newSpan = document.createElement('span');

        newP.innerHTML = cartItems[i][0];
        newSpan.innerHTML = '$' + cartItems[i][1];

        newP.classList.add('likedTitle');
        newSpan.classList.add('likedPrice');
        newLi.classList.add('doneList');

        newLi.append(newP);
        newLi.append(newSpan);

        ulCart.append(newLi);   

        totalCost += parseInt(cartItems[i][1]);
    }
    document.querySelector('#totalCost').innerText = `$${totalCost}`;
}
catch (error) {}

/* clicking on item brings back to page */
const allLi = document.querySelectorAll('.doneList');
for (let li of allLi) {
    let itemType;
    li.addEventListener('click', (e)=>{
        try {
            itemType = e.target.children[0].innerText[1];
        }
        catch (error) {
            console.log(`${error}1`);
            try {
                itemType = e.path[0].innerText[1];
            }
            catch (error) {
                console.log(`${error}2`);
                try {
                    itemType = e.target.previousSibling.textContent[1];
                }
                catch (error) {console.log(`${error}3`);}
            }
        }
        
        if (itemType === 'P') {window.location.href='pianos.html';}
        else if (itemType === 'G') {window.location.href='guitars.html';}
        else {console.log(`Something went wrong\n${itemType}`);}
    })
}

/* checkout */
/*
try {
    document.querySelector('#checkoutBtn').addEventListener('click', (e)=>{
        let cartCost = 0;
        let cartContent = [];
        for (let i=0;i<cartItems.length;i++) {
            cartCost += parseInt(cartItems[i][1]);
            cartContent.push(`${i+1}. ${cartItems[i][0]}`);
        }
        cartContent = cartContent.join().replaceAll(',','\n');

        alert(`Checkout success!\n\nYou have paid $${cartCost} and purchased the following item(s):\n${cartContent}`)
        
        cartItems = [];
        localStorage.cartItems = undefined;
        window.location.reload();
    })
}
catch (typeerror) {console.log(typeerror);}*/

/* mobile compatibility */
const checkScreenWidth = ()=>{
    if (window.innerWidth < 600) {
        document.querySelector('#desktop').classList.add('noDisplay');
        
    }
    else {document.querySelector('#mobile').classList.add('noDisplay');}

    menuBtn = document.querySelector('#menuBtn');
    menuBtn.addEventListener('click', (e)=>{

    })
}
checkScreenWidth();
const mddBtn = document.querySelector('#menuBtn');
mddBtn.addEventListener('click', ()=>{
    document.querySelector('.mddContainer').classList.toggle('mddActive');
})

/* checkout form */
let fName;
let lName;
let country; 
let address;
let paymentType;

document.querySelector('#checkoutForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    fName = document.querySelector('#fname').value;
    lName = document.querySelector('#lname').value;
    country = document.querySelector('#country').value;
    address = document.querySelector('#address').value;
    paymentType = document.querySelector('#paymentType').value;

    try {
        let cartCost = 0;
        let cartContent = [];
        for (let i=0;i<cartItems.length;i++) {
            cartCost += parseInt(cartItems[i][1]);
            cartContent.push(`${i+1}. ${cartItems[i][0]}`);
        }
        cartContent = cartContent.join().replaceAll(',','\n');

        alert(`Checkout success!\n\nYou have paid $${cartCost} via ${paymentType} and purchased the following item(s):\n${cartContent}\n\nDelivery instructions:\n${fName} ${lName}\n${address}, ${country}`)
        
        cartItems = [];
        localStorage.cartItems = undefined;
        window.location.reload();
    }
    catch (error) {}
})