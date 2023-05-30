

$.getJSON('https://exceptionalbean.swollenhippo.com/api/liveBeanData/beanSquareOrdersTest.php', squareOrders = function(currentOrders){
        var orders = currentOrders.orders;
        const sortByClosedTimestamp = (a, b) => {
                const closedAtA = new Date(a.closed_at).getTime();
                const closedAtB = new Date(b.closed_at).getTime();
                return closedAtA - closedAtB;
              };
             var sortedOrders= orders.sort(sortByClosedTimestamp);
        $.each(sortedOrders, function(index, objOrder){
                var result = objOrder.tenders;
                var order = objOrder.line_items;
                let strCustomerName = '';
                let strHTML = '<li class="card col-12 mb-4">';
                strHTML +='<div class="card-header bg-dark">';
                strHTML +='<div class="d-flex col-12 justify-content-between">';
                strHTML +='<h3 style="font-size:35px" class="text-white txtCustomerName" data-orderid="' + objOrder.id + '" data-customerid="' + result[0].customer_id + '">Cash Order</h3>';
                strHTML +='<button style="font-size:20px;" class="btn text-white btn-success col-3 orderComplete">Complete</button>';
                strHTML +='</div>';
                strHTML +='</div>';
                strHTML +='<div class="card-body bg-light" style="border-radius:5px">';
                strHTML +='<ul class="d-block list-unstyled">';
                $.each(order, function(index, items){
                        console.log(items.modifiers);
                        strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
                        strHTML += '<h4>' + items.name + ' ' + '(' + items.variation_name + ')' + ' ' + items.quantity + '</h4>'
                        strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style: disc;">';
                        if(items.modifiers != 'undefined'){
                                $.each(items.modifiers, function(i, mods){
                                        strHTML += '<li style="text-align: left">'+ mods.name +'</li>'
                                })
                        }
                        strHTML += '</li>';
                        strHTML +='</ul>';
                })
                strHTML +='</div>';
                $('body').append(strHTML);


                $.getJSON("https://exceptionalbean.swollenhippo.com/api/liveBeanData/beanCustomers.php?CustomerID="+result[0].customer_id, function(customer){
                        let strCustomerName = '';
                        if(customer.errors){
                                strCustomerName = "Cash Customer";
                        } else {
                                strCustomerName = customer.customer.given_name;
                        }
                        $.each($('.txtCustomerName'), function(index2,customerspot){
                                if(customer.customer){
                                        if($(this).attr('data-customerid') == customer.customer.id){
                                                $(this).text(customer.customer.given_name);
                                                //set the text here
                                        }
                                }
                               
                        })
                        /*
                        let strHTML = '<li class="card col-12 mb-4">';
                        strHTML +='<div class="card-header bg-dark">';
                        strHTML +='<div class="d-flex col-12 justify-content-between">';
                        strHTML +='<h3 style="font-size:35px" class="text-white">' + strCustomerName + '</h3>';
                        strHTML +='<button style="font-size:20px;" class="btn text-white btn-success col-3 orderComplete">Complete</button>';
                        strHTML +='</div>';
                        strHTML +='</div>';
                        strHTML +='<div class="card-body bg-light" style="border-radius:5px">';
                        strHTML +='<ul class="d-block list-unstyled">';
                        $.each(order, function(index, items){
                                console.log(items.modifiers);
                                strHTML +='<li class="btn btn-primary col-12 mb-2 orderItem" style="background-color: black;">';
                                strHTML += '<h4>' + items.name + ' ' + '(' + items.variation_name + ')' + ' ' + items.quantity + '</h4>'
                                strHTML +='<ul class="directions mt-2 font-weight-bold bg-light text-black card" style="display:none; font-size: 22px; list-style: disc;">';
                                if(items.modifiers != 'undefined'){
                                        $.each(items.modifiers, function(i, mods){
                                                console.log(mods.modifiers);
                                                strHTML += '<li style="text-align: left">'+ mods.name +'</li>'
                                        })
                                }
                                strHTML += '</li>';
                                strHTML +='</ul>';
                        })
                        strHTML +='</div>';
                        $('body').append(strHTML);
                        */
                })
        })

});

