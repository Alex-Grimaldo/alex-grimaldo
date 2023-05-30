
class SquareOrder{
    constructor(customerName,squareOrderID,squareOrder,orderID){
        this.CustomerName = customerName;
        this.SquareOrderID = squareOrderID;
        this.SquareOrder = squareOrder;
        this.InternalOrderID = orderID;
    }
}
$.getJSON('http://192.168.1.222/exceptionalbean/copySquareOrders', testorders = function(result){
    console.log(result);
    console.log("hello world")
});

var promiseSquareOrders = $.getJSON('https://exceptionalbean.swollenhippo.com/api/SquareOrders.php', squareOrders = function(currentOrders){
    arrSquareOrders = currentOrders.orders;
    arrTenders = []
    $.each(arrSquareOrders, function(index, orderTender){
        arrTenders.push(orderTender.tenders);
    });
    orderSort();
    cardData();
});

var promiseSquareCustomers = $.getJSON('https://exceptionalbean.swollenhippo.com/api/SquareCustomer.php', squareCustomers = function(squareCustomers){
    arrSquareCustomers = squareCustomers.customers;
    
});

function orderSort(){$.when(promiseSquareCustomers, promiseSquareCustomers).done(()=>{
    let arrOrders = []
    $.each(arrTenders, function(index, orderTender){
        arrOrders.push(orderTender[0]);
    });
    let arrCustomer = []
    $.each(arrSquareCustomers, function(index, squareCustomer){
        arrCustomer.push(squareCustomer);
    });


    function customerPost() {
        return arrOrders 
            .filter(el => arrCustomer.some(f => f.id === el.customer_id))
            .map(item => ({
                ...item,
                "given_name": arrCustomer.find(f => f.id === item.customer_id).given_name
            }));
    }
    $.each(customerPost(), function(index, postData){
       //$.post("https://exceptionalbean.swollenhippo.com/api/orders.php", {SquareOrder: postData.transaction_id, Customer: postData.given_name})
    });
});
}

function cardData(){
var arrCardData
    $.getJSON('https://exceptionalbean.swollenhippo.com/api/orders.php?Status=COMPLETE', ordersGet = function(orderDB){
         arrCardData = orderDB;
        cardFilter();
    });
    function cardFilter() {
        arrTest = [];
            $.each(arrCardData,function(index,order){
                let arrTemp = arrSquareOrders.filter(el => el.tenders[0].transaction_id == order.SquareOrderID);
                arrTest.push(new SquareOrder(order.CustomerName,order.SquareOrderID,arrTemp,order.OrderID));
            })
            
            $.each(arrTest,function(index,orderInfo){
                
                if(orderInfo.SquareOrder[0]){
                    if(orderInfo.SquareOrder[0].line_items){
                        class orderContent{
                            constructor(name, quantity, variation, modifiers){
                                this.name = name;
                                this.quantity = quantity;
                                this.variation_name = variation;
                                this.modifiers = modifiers;
                            }
                        }
                        arrContent = [];
                        $.each(orderInfo.SquareOrder[0].line_items,function(index1,item){
                            arrContent.push(new orderContent (item.name, item.quantity, item.variation_name, item.modifiers));
                    })
                   
                }
            }
            let strHTML = '<li class="card col-12 mb-4">';
            strHTML +='<div class="card-header bg-dark">';
            strHTML +='<div class="d-flex col-12 justify-content-end">';
            strHTML +='<h3 style="font-size:35px" class="text-white">' + orderInfo.CustomerName +'</h3>';
            strHTML +='<div class="col-3"></div>'
            strHTML +='<button style="font-size:20px;" class="btn text-white btn-danger col-3 orderBack" backOrderID="'+orderInfo.InternalOrderID+'">Send Back</button>'
            strHTML +='<button style="font-size:20px; margin-left: 12px;" class="btn text-white btn-success col-3 orderPickUp" pickupOrderID="'+orderInfo.InternalOrderID+'">Picked Up</button>'
            strHTML +='</div>';
            strHTML +='</div>';
            strHTML +='<div class="card-body bg-light" style="border-radius:5px">';
            $.each(arrContent, function(index, result){
                strHTML +='<ul class="d-block list-unstyled">';
                strHTML +='<li class="btn btn-primary col-12 orderItem" style="background-color: black;">';
                strHTML += '<h4>' +result.name+ ' | ' +result.variation_name+ ' | ' +result.quantity+ '</h4>'
                if(result.modifiers != 'undefined'){
                strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style: disc;">';
                $.each(result.modifiers, function(index, mods){
                    strHTML += '<li style="text-align: left">'+mods.name+'</li>'
                    })
                strHTML +='</ul>';
                }
                strHTML += '</li>';
                strHTML +='</ul>';
            })
            strHTML +='</div>';
            $('body').append(strHTML);
            })
    }
}
$(document).on('click','.orderPickUp',function(){          
    let strTargetID = $(this).attr('pickupOrderID');	      
    
    $.ajax({
        url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
        type: 'PUT',
        data: {OrderID:strTargetID, Status: 'PICKEDUP'},
        success: function(response){
        
    }
    })
    })

$(document).on('click','.orderBack',function(){          
    let strTargetID = $(this).attr('backOrderID');	      
 
    $.ajax({
        url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
        type: 'PUT',
        data: {OrderID:strTargetID, Status: 'NEW'},
        success: function(response){
        
    }
    })
    })

    // PUT request to change order status to COMPLETE; ran on console
/*$.ajax({
    url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
    type: 'PUT',
    data: {OrderID:'INSERT_ORDERID_to_be_changed', Status: 'COMPLETE'},
    success: function(response){
        console.log(response);
    }
});*/

// PUT request to change order status to NEW; ran on console
/*$.ajax({
    url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
    type: 'PUT',
    data: {OrderID:'INSERT_ORDERID_to_be_changed', Status: 'NEW'},
    success: function(response){
        console.log(response);
    }
});*/
