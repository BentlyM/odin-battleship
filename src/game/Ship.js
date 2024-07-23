class Ship {
    constructor(length = null){
        this.length = length;
        this.hits = 0;
        this.Sunk = false;
        this.portions = []

        for(let i = 0; i < length; i++){
            this.portions.push({
                x: null,
                y: null,
                isHit: false
            })
        }
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