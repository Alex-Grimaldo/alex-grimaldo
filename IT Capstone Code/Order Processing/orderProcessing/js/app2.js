var customer_created;
var custName = [];
var customerID = [];
$.getJSON('https://exceptionalbean.swollenhippo.com/api/SquareCustomer.php', customerInfo = function(result){
    console.log(result);
    var count = 0;
    $.each(result.customers, function(index, cust){
        custName[count] = cust.given_name;
        customerID[count] = cust.id;
        count++;
        //console.log('Customer name: ' + custName + ', ID: ' + customerID);
        //buildCard(custName);
    })
})
var order_cust_id;
var orders;
var order_quantity;
var order_name;
var order_variation;
var date_created;
var order_tender;
var orderModifier = [];

$.getJSON('https://exceptionalbean.swollenhippo.com/api/SquareOrders.php', customerOrder = function(currentOrders){
    console.log(currentOrders);
    var count = 0;
    $.each(currentOrders.orders, function(i,order){
        orders = order;
        order_tender = order.tenders;
            //order_cust_id = order_tender[0].customer_id; //order_info.customer_id
        order_quantity = order.line_items[0].quantity;
        order_name = order.line_items[0].name;
        order_variation = order.line_items[0].variation_name;
        date_created = order.created_at;
                    
        orderModifier = [];
        modifier_Count = 0;
        if(order.line_items != 0){
            $.each(order.line_items[0].modifiers, function(i,modifier){ 
                orderModifier[i] = modifier.name;
                modifier_Count++;
            })
        }

        currentID = customerID[count];
        currentName = custName[count];
    })
    $.each(customerID, function(i,customer){
        current_customer_id = customer.id;
        //current_order_id = 
        $.each(currentOrders, function(i,order){
            current_order_id = order.customer_id;
        //if(current_customer_id != undefined){}
            
            if(current_customer_id == current_order_id){
            //do something..
            //filter by customerID
            //the each statement to go through the filter variable.
                $.each(currentOrders.orders, function(i, order_info){
                    buildCard(currentName, order_quantity, order_name, order_variation, order_cust_id, currentID);
                    count++;
                })
            }
        })
    })
})

//Current issue: Unable to create cards without both name and items
function buildCard(customer, quantity, item_name, variation, order_id, custID){
    //console.log(custID);
    //if(order_id == custID){
        let strHTML = '<li class="card col-12 mb-4">';
        strHTML +='<div class="card-header bg-dark">';
        strHTML +='<div class="d-flex col-12 justify-content-between">';
        strHTML +='<h3 style="font-size:35px" class="text-white">' + customer + '</h3>';
        strHTML +='<button style="font-size:20px;" class="btn text-white btn-success col-3 orderComplete">Complete</button>';
        strHTML +='</div>';
        strHTML +='</div>';
        strHTML +='<div class="card-body bg-light" style="border-radius:5px">';
        strHTML +='<ul class="d-block list-unstyled">';
        strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
        strHTML +='<h4> (' + quantity + ') ' + item_name + ' - ' + variation + '</h4>';
        strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style: disc;">';
        //you have an array of modifiers that needs to change where customerID or orderID
            $.each(orderModifier, function(i,modifier){
                strHTML+= '<li style="text-align: left">'+modifier+'</li>';
            })
        strHTML +='</ul>';
        strHTML +='</li>';
        //strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
        //strHTML +='<h4>Daily Drip - Hot</h4>';
        strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style-type: disc;">';
        strHTML +='<li style="text-align: left">Fill 80% with daily drip</li>';
        strHTML +='<li style="text-align: left">Add flavorings</li>';
        strHTML +='</ul>';
        strHTML +='</li>';
        strHTML +='</ul>';
        strHTML +='</div>';
        strHTML +='</li>';
        $('body').append(strHTML);
        //orderItems.sort((a,b)=>a-b);
    //}
}
