const validation = {

    isEmpty(val){
        if(val === ""){
            return true;
        }
        return false;
    },

    hasNoSlashes(val){
        if(val.indexOf("/") === -1){
            return true;
        }
        return false;
    },

    isInvalidYear(val){
        if(val.length != 4 || isNaN(val)){
            return true;
        }
        return false;
    },

    isInvalidDate(val){
        if(val.toString() === "Invalid Date"){
            return true;
        }
        return false;
    },

}