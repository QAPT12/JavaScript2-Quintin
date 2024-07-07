// This is for testing my object to make sure all my class functions 
// and attributes are working correctly
$(document).ready(function(){
    console.log("creating a box car object");
    let car = new BoxCar(123, 10000, 100000);
    console.log(car);

    console.log("Lets get the ID:");
    console.log(car.carID);

    console.log("lets get the tare weight");
    console.log(car.tareWeight);

    console.log("lets get the max weight");
    console.log(car.maxWeight);

    console.log("Lets get the cargo list, it begins empty");
    console.log(car.cargoList);

    console.log("Lets try adding items to the cargo list, for now it will be dummy data");
    car.addCargo("this is some cargo");
    car.addCargo("this is a second piece of cargo");
    console.log(car.cargoList);

    console.log(`\n`);

    console.log("now lets try making some cargo objects");
    let shirts = new Cargo('TX11104', "50,000 shirts", 1200);
    let pants = new Cargo('TX11108', "25,000 pants", 1400);
    console.log(shirts);
    console.log(pants);
    
    console.log("lets clear the cargo list from the box car and add the new cargo items");
    car.cargoList = [];
    car.addCargo(shirts);
    car.addCargo(pants);
    console.log(car.cargoList);

    console.log("now lets try using the box cars cargo weight function");
    console.log(car.getTotalCargoWeight());

});