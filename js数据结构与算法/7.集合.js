class Set {
    constructor() {
        this.items = {};
    }
    // has(element){
    //     return element in items;
    // };
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element) {
        if (!this.has(element)) {
          this.items[element] = element; // {1}
          return true;
        }
        return false;
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element]; // {1}
            return true;
        }
        return false;
    }
    size() {
        return Object.keys(this.items).length;
    };
}