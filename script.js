

// Add to cart button click
$('.add-to-cart').click(function(){
  event.preventDefault(); // keeps link from reloading page
   var name = $(this).attr('data-name');
   var price = Number($(this).attr('data-price')); // Number convert from str to #

  addItemToCart(name, price, 1);
  displayCart();
});

// Clear cart button click
$('#clear-cart').click(function(){
  emptyCart();
  displayCart();
});


// Display Cart
function displayCart(){
  var cartArray = listCart();
  var output = "";
  for (var i in cartArray){
      output += "<li>Product: " + cartArray[i].name + " - " +
                                  cartArray[i].count + " @ $" +
                                  cartArray[i].price + " = $" +
                                  cartArray[i].total +
                                  "<button class='remove-item' data-name=" +
                                  cartArray[i].name +
                                  ">Remove One</button>" +
                                  "<button class='delete-item' data-name=" +
                                  cartArray[i].name +
                                  ">Delete</button>" +
                                  "<button class='add-item' data-name=" +
                                  cartArray[i].name +
                                  ">Add</button>" + "</li>";
  }
// Displays Cart in UL
  $('#show-cart').html(output);
// Total Cart Cost
  $('#total-cart').html(cartTotalCost());
  // Total Units in Cart
    $('#units-cart').html(countItems());
// Remove btn func
  $('.remove-item').click(function(){
    var name = $(this).attr('data-name');
    removeItemFromCart(name);
    displayCart();
  });
// Delete btn func
  $('.delete-item').click(function(){
    var name = $(this).attr('data-name');
    clearItemFromCart(name);
    displayCart();
  });
// Add btn func
  $('.add-item').click(function(){
    var name = $(this).attr('data-name');
    addItemToCart(name, 0, 1); // needs name to reference, and 1 to add a unit.  0 is placeholder
    displayCart();                // for the price which will not chnage
  });
}  // End of DisplayCart func

// ---  Core Cart Functions ----

// Cart: Array
var cart = [];
// Item: Object/Class
var Item = function(name, price, count){
  this.name = name;
  this.price = price;
  this.count = count;
};

// Add Items to Cart
function addItemToCart(name, price, count){
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count += count;
      saveCart();
      return;
      }
  }
   var item = new Item(name, price, count);
   cart.push(item);
   saveCart();
};

/*
addItemToCart("Apple", 0.79, 1);
addItemToCart("Banana", 0.29, 1);
addItemToCart("Orange", 0.59, 1);
*/

// Remove 1 unit of an Item
function removeItemFromCart(name){
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count -= 1;
      if(cart[i].count == 0){
      cart.splice(i, 1);
      }
      break;
    }
  }
  saveCart();
};

// Remove ALL units of an Item
function clearItemFromCart(name){
  for(var i in cart){
    if(cart[i].name === name){
    cart.splice(i, 1);
    break;
    }
  }
  saveCart();
};

// Clear Entire Cart
function emptyCart(name, price, count){
  cart = [];
  saveCart();
};

// Total Cart Unit Count
function countItems(){
  var totalCount = 0;
  for(var i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
};

// Cart Total Cost
function cartTotalCost(){
  var cartTotal = 0;
  for(var i in cart){
    cartTotal += cart[i].price * cart[i].count;
    }
    return cartTotal.toFixed(2);
};

// List Cart -returns array 'copy' of items to use without (html outside of JS)
// keeps original from being over written
function listCart(){
  var cartCopy = [];
  for (var i in cart){
    var item = cart[i];
    var itemCopy = {};
    for (var x in item){
      itemCopy[x] = item[x];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}
// Save cart- to local storage (can leave cart and return later, or use on another page)
// so it's not erased on a page load
function saveCart(){
  localStorage.setItem("shoppingCart", JSON.stringify(cart));  // takes ("name", value), use JSON to record as a string
}

// Load cart
function loadCart(){
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();  // loads cart from local storage
displayCart(); // displays the cart after loading

// end of script
