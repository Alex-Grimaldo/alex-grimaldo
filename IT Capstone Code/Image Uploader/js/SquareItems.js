/* 
    Populate Menu 
*/
var coffeeCategoryID = 'TNBUJHU54ZVVDJXLZAHJHHUT';//Coffee Category ID
var nonCoffeeCategoryID = 'DNUSHG4A3N2J36ET3YJGJTUJ';//Tea/Non-Coffee Drinks ID
var drinkModifierID = 'I5TO7WL7Z7ET6ZADPDOUTCGS';//Milk Modifiers
var flavorModifierID = 'NB5MUEI3LHJPQSUZEJ6WPRSW';//Extra Flavors (Includes Sugar-Free Options; will be able to separate?[Look at "SF" near beginning])

class MenuItems {
    constructor(strName, strPrice1, strPrice2){
        this.name = strName;
        this.price1 = strPrice1;
        this.price2 = strPrice2;
    }
}
class FlavorItems {
    constructor(strName){
        this.name = strName;
    }
}

$.ajax({
    url: 'https://exceptionalbean.swollenhippo.com/api/SquareCatalog.php',
    type: 'GET',
    dataType: 'JSON'
}).done(function(result){
    var catalog = result.objects;
    for(i = 0; i < catalog.length; i++){
        coffee = [];
        var nonCoffee = [];
        itemName = '';
        price1 = '';
        price2 = '';
        var arrFlavorName = [];
        if(catalog[i].type == 'ITEM'){
            if(catalog[i].item_data.category_id == coffeeCategoryID && catalog[i].item_data.ecom_visibility == 'VISIBLE'){
                let variationLength = catalog[i].item_data.variations;
                let variationCount = variationLength.length;
                if(variationCount == 1){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    let coffeeDrinks = new MenuItems(itemName, price1, price2);
                    coffee.push(coffeeDrinks);
                } else if(variationCount > 2){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[2].item_variation_data.price_money.amount / 100;
                    let coffeeDrinks = new MenuItems(itemName, price1, price2);
                    coffee.push(coffeeDrinks);
                } else {
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[1].item_variation_data.price_money.amount / 100;
                    let coffeeDrinks = new MenuItems(itemName, price1, price2);
                    coffee.push(coffeeDrinks);
                }
                let strHTML = '<li class="row col-12"';
                strHTML += '<div class="">';
                strHTML += '<div class="col-6">' + coffee[0].name + '</div>';
                if(coffee[0].price2 == ''){
                    strHTML += '<div class="align-items-center col-6 text-center border-dark border-top">$' + coffee[0].price1 + '</div>';
                } else {
                    strHTML += '<div class="col-3 text-center">$' + coffee[0].price1 + '</div>';
                    strHTML += '<div class="col-3 text-center">$' + coffee[0].price2 + '</div>';
                }
                strHTML += '</div>';
                strHTML += '</li>';
                $('#coffeeDrinks').append(strHTML);
            } else if(catalog[i].item_data.category_id == nonCoffeeCategoryID && catalog[i].item_data.ecom_visibility == 'VISIBLE'){
                let variationLength = catalog[i].item_data.variations;
                let variationCount = variationLength.length;
                if(variationCount == 1){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName, price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                } else if(variationCount == 4){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[2].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName, price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                } else if(variationCount == 5){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName, price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                }else if(variationCount == 6){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[3].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName, price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                } else if(variationCount == 8){
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[1].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName, price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                } else {
                    itemName = catalog[i].item_data.name;
                    price1 = catalog[i].item_data.variations[0].item_variation_data.price_money.amount / 100;
                    price2 = catalog[i].item_data.variations[1].item_variation_data.price_money.amount / 100;
                    let nonCoffeeDrinks = new MenuItems(itemName , price1, price2);
                    nonCoffee.push(nonCoffeeDrinks);
                }
                console.log(nonCoffee);
                let strHTML = '<li class="row col-12"';
                strHTML += '<div class="">';
                strHTML += '<div class="col-6">' + nonCoffee[0].name + '</div>';
                if(nonCoffee[0].price2 == ''){
                    strHTML += '<div class="align-items-center col-6 text-center border-dark border-top">$' + nonCoffee[0].price1 + '</div>';
                } else {
                    strHTML += '<div class="col-3 text-center">$' + nonCoffee[0].price1 + '</div>';
                    strHTML += '<div class="col-3 text-center">$' + nonCoffee[0].price2 + '</div>';
                }
                strHTML += '</div>';
                strHTML += '</li>';
                $('#nonCoffeeDrinks').append(strHTML);
            }
        /* 
            Pull Modifiers and Flavors
        */
        } else if(catalog[i].type == 'MODIFIER_LIST'){
            if(catalog[i].modifier_list_data.name == 'Milks'){
                let milkOptions = catalog[i].modifier_list_data.modifiers;
                $(milkOptions).each(function(i, result){
                    let milkName = result.modifier_data.name
                    let strHTML = '<div class="col-12 text-center">' + milkName + '</div>';
                    $('#milks').append(strHTML);
                })
            }
        }
    }
})

$.ajax({
    url: 'https://exceptionalbean.swollenhippo.com/api/SquareCatalog2.php',
    type: 'GET',
    dataType: 'JSON'
}).done(function(result){
    var catalog = result.objects;
    for(i = 0; i < catalog.length; i++){
        if(catalog[i].type == 'MODIFIER_LIST'){
            if(catalog[i].modifier_list_data.name == 'Extra Flavor Options'){
                console.log('test');
                let extraFlavors = catalog[i].modifier_list_data.modifiers;
                var flavorName = '';
                $(extraFlavors).each(function(i, result){
                    flavorName = result.modifier_data.name;
                    Upper = flavorName.charAt(0).toUpperCase();
                    ending = flavorName.substr(1);
                    flavorName = Upper + ending;
                    let strHTML = '<div class="text-center">' + flavorName + '</div>';
                    $('#flavors').append(strHTML);
                    //console.log(flavorName);
                })
            }
        }
    }
})