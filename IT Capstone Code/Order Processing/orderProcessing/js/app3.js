class SquareOrder{
    constructor(customerName,squareOrderID,squareOrder,orderID){
        this.CustomerName = customerName;
        this.SquareOrderID = squareOrderID;
        this.SquareOrder = squareOrder;
        this.InternalOrderID = orderID;
    }
}



var promiseSquareOrders = $.getJSON('https://exceptionalbean.swollenhippo.com/api/liveBeanData/beanSquareOrdersV2.php', squareOrders = function(currentOrders){
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


    function customerPost(){
        $.each(arrOrders, function(index, order){
            $.post('https://exceptionalbean.swollenhippo.com/api/liveBeanData/beanCustomers.php?customer_id='+order.customer_id, function(result){
                order.given_name = result.given_name 
                console.log(result);
                })
        })
        return arrOrders;
        // return arrOrders 
        //     .filter(el => arrCustomer.some(f => f.id === el.customer_id))
        //     .map(item => ({
        //         ...item,
        //         "given_name": arrCustomer.find(f => f.id === item.customer_id).given_name
        //     }));
    }
    arrOrders = customerPost();

    $.each(arrOrders, function(index, postData){
      // $.post("https://exceptionalbean.swollenhippo.com/api/orders.php", {SquareOrder: postData.transaction_id, Customer: postData.given_name})
    });
});
}

function cardData(){
var arrCardData
    $.getJSON('https://exceptionalbean.swollenhippo.com/api/orders.php?Status=NEW', ordersGet = function(orderDB){
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
                console.log(orderInfo);
                let arrContent = [];
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
      
            })
            $(document).on('click','.orderComplete',function(){
                let strTargetID = $(this).attr('data-orderID');
                console.log(strTargetID);
                $.ajax({
                    url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
                    type: 'PUT',
                    data: {OrderID:strTargetID, Status: 'COMPLETE'},
                    success: function(response){
                    console.log(response);
                }
                })
                })
          
    }
}



