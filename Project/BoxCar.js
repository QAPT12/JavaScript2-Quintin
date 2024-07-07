class BoxCar {

    constructor(carID, tareWeight, maxWeight){
        this.carID = carID;
        this.tareWeight = tareWeight;
        this.maxWeight = maxWeight;
        this.cargoList = [];
    }

    getTotalCargoWeight(){
        let totalCargoWeight = 0;
        this.cargoList.forEach((item) => {
            totalCargoWeight += item.weight;
        });
        return totalCargoWeight;
    }

    addCargo(cargo){
        this.cargoList.push(cargo);
    }

}