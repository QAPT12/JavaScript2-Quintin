class PaintTin {
    constructor() {
        this.code = null;
        this.cost = 200.00;
        this.colour = "WHITE";
    }

    get sellingPrice() {
        const sellingP = this.cost * 3;
        return sellingP;
    }

    /**
    * @param {String} newCode
    */
    set setCode(newCode) {
        this.code = newCode;
    }
}

const processPurchase = (paintCode, colourSelected) => {
    pTin.code = paintCode;
    pTin.colour = colourSelected;
    
    
    const message = `Purchase 
                    Code: ${pTin.code}
                    Colour: ${pTin.colour}
                    Selling Price: ${pTin.sellingPrice}`;
    $("#message_id").text(message);
}

const readRadioButton = () => {
    const selRadioBtnVal = $(":radio:checked").val();
    return selRadioBtnVal;
}

const validatePaintCode = (testCode) => {
    const itemCodePattern = /^[0-9]{4}$/;
    var testString = testCode.val().trim(); // has to be var !!
    if (testString == "") {
        throw new Error("This field is required");
    } else if (!itemCodePattern.test(testString)) {
        throw new Error("Must be exactly 4 Numbers");
    } else {
        return testString;
    }
}