String.prototype.capitalize = function() {
    value = this.toLowerCase();

    return value.charAt(0).toUpperCase() + value.slice(1);
};


String.prototype.isEmpty = function() {
    return this.length == 0;
};

String.prototype.isNotEmpty = function() {
    return !this.isEmpty();
};