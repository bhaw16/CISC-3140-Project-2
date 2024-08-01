class Medal{
    constructor(country, numGold, numSilver, numBronze) {
        this.country = country;
        this.numGold = numGold;
        this.numSilver = numSilver;
        this.numBronze = numBronze;
        this.total = this.numGold + this.numSilver + this.numBronze;
    }

    toString() {
        return `Gold: ${this.numGold} Silver: ${this.numSilver} Bronze: ${this.numBronze} Total: ${this.total}`;
    }
}