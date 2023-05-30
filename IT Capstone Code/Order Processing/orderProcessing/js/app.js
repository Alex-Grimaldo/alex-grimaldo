var Customer;
var CustomerJSON;


var objCustomer;
var objOrders;


var customerPromise = $.getJSON("https://exceptionalbean.swollenhippo.com/api/SquareCustomer.php", function(customerInfo){
    objCustomer = customerInfo;
   
})  

var orderID;
var orderPromise = $.getJSON("https://exceptionalbean.swollenhippo.com/api/SquareOrders.php", function(currentOrders){
    objOrders = currentOrders;
   
})

$.when(customerPromise, orderPromise).done(()=>{
    console.log(customerInfo);      
    $.each(objCustomer.customers, function(index, current){
        console.log(current.id);
        console.log('Customer information retrieved. Customer name is ' + current.given_name);
        CustomerJSON = current;
        /* ordersPost();*/
        //buildOrderCard(); 
    })
    $.each(objOrders.orders, function(index,current){
        current.customer_id = objectCustomers.customers.filter(el=>el.id == current.customer_id)[0].given_name;
        $.each(current.line_items, function(index2,currentItem){
            console.log('Customer ordered ' + currentItem.quantity + ' of ' + currentItem.name + ' (' + currentItem.variation_name + ') at a price of ' + currentItem.variation_total_price_money.amount);
            orderID = currentItem.id;
            SquareItemJSON = currentItem;
            
        })
        SquareOrderJSON = current;
        /* ordersPost();*/
        //buildOrderCard();
    })
})

$.getJSON("https://exceptionalbean.swollenhippo.com/api/orders.php", function(currentOrderItems){
    $.each(currentOrderItems, function(index,current){
        orderItems = current;
        console.log(current.SquareOrderID);
        buildOrderCard();
    })

})



 var arrOrderCard;
function ordersPost(){
        console.log(SquareItemJSON.name);
        console.log(CustomerJSON.given_name);
        console.log(CustomerJSON);
        console.log(SquareOrderJSON);
        console.log(SquareOrderJSON.customer_id);
        arrOrderCard = {ItemName: SquareItemJSON.name, CustName: CustomerJSON.given_name, OrderID: SquareOrderJSON.id, ItemVar: SquareItemJSON.variation_name,ItemQuantity: SquareItemJSON.quantity, CustomerID: CustomerJSON.id, CustOrderID: SquareOrderJSON.customer_id};
        //$.post("https://exceptionalbean.swollenhippo.com/api/orders.php", {SquareOrder: SquareOrderJSON.id, Customer: CustomerJSON.given_name});
        //$.post("https://exceptionalbean.swollenhippo.com/api/orders.php?SquareOrder="+ SquareOrder + "&Customer="+ Customer, function(resulttps://excepti){
            
       // })
        //this post request sends data everytime the orderprocessing page is reloaded. Only uncomment when you're ready to start sending things. 
        // this is the documentation for the jQuery function. https://api.jquery.com/jquery.post/

} 

//What if we use the orders database to match an order id and use that for the name instead? 

function buildOrderCard (){
    //console.log(orderItems);
    //console.log(orderItems.SquareOrderID);
    $.each(orderItems, function(i,order){
        /* if (SquareOrderJSON.customer_id == CustomerJSON.id){ */
            let strHTML = '<li class="card col-12 mb-4">';
            strHTML +='<div class="card-header bg-dark">';
            strHTML +='<div class="d-flex col-12 justify-content-between">';
            strHTML +='<h3 style="font-size:35px" class="text-white">'+ orderItems.CustomerName + '</h3>';
            strHTML +='<button style="font-size:20px;" class="btn text-white btn-success col-3 orderComplete">Complete</button>';
            strHTML +='</div>';
            strHTML +='</div>';
            strHTML +='<div class="card-body bg-light" style="border-radius:5px">';
            strHTML +='<ul class="d-block list-unstyled">';
            strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
           // strHTML +='<h4>' +  + ' - ' +  + ' (' +  +')</h4>';
            strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style: disc;">';
            strHTML +='<li style="text-align: left">2 shots Espresso</li>';
            strHTML +='<li style="text-align: left">1 pump pumpkin spice</li>';
            strHTML +='<li style="text-align: left">Top with whipped cream</li>';
            strHTML +='</ul>';
            strHTML +='</li>';
            strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
            strHTML +='<h4>Daily Drip - Hot</h4>';
            strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style-type: disc;">';
            strHTML +='<li style="text-align: left">Fill 80% with daily drip</li>';
            strHTML +='<li style="text-align: left">Add flavorings</li>';
            strHTML +='</ul>';
            strHTML +='</li>';
            strHTML +='</ul>';
            strHTML +='</div>';
            strHTML +='</li>';
        $('body').append(strHTML);
        
        //}
    })
}

