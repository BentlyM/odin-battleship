class Ship {
    constructor(length = null){
        this.length = length;
        this.hits = 0;
        this.Sunk = false;
        this.portions = []
    }

    hit(){
        this.hits++;
        if(this.hits >= this.length){
            this.Sunk = true;
        }
    }

    isSunk(){
        return this.Sunk;
    }
}

export default Ship;