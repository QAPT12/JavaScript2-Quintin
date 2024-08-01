class BoxCar {

    constructor(carID, tareWeight, maxWeight){
        this.carID = carID;
        this.tareWeight = tareWeight;
        this.maxWeight = maxWeight;
        this.cargoList = [];
        this.cargoWeight = 0;
    }

    reCalculateTotalCargoWeight(){
        let weightTotal = 0;
        this.cargoList.forEach((item) => {
            weightTotal += item.weight;
        });
        this.cargoWeight = weightTotal;
    }

    addCargo(cargo){
        this.cargoList.push(cargo);
        this.reCalculateTotalCargoWeight();
    }

    removeCargo(cargo){
        this.cargoList.forEach((item, index) => {
            if (item.transportID == cargo.transportID){
                this.cargoList.splice(index, 1);
            }
        });
        this.reCalculateTotalCargoWeight();
    }

}