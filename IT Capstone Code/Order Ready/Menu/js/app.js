$.ajax({
    url: 'https://exceptionalbean.swollenhippo.com/api/orders.php',
    type: 'GET',
    dataType: 'JSON'
}).done(function(result){
    var objSquareOrders = result;
    $.each(objSquareOrders, function(i, customers){
        if(customers.Status == "NEW"){
            var customerName = customers.CustomerName;
            console.log(customerName);
            let strHTML = 
            `
            <li class="">
                <div class="customerList">
                    <h1 class="customers">` + customerName + `</h1>
                </div>
            </li> 
            `;
            $('#ulPreparing').append(strHTML);
        }
        if(customers.Status == "COMPLETE"){
            var customerName = customers.CustomerName;
            console.log(customerName);
            let strHTML = 
            `
            <li class="">
                <div class="customerList">
                    <h1 class="customers">` + customerName + `</h1>
                </div>
            </li> 
            `;
            $('#ulReady').append(strHTML);
        }
    })
})