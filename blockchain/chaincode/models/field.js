"use strict";
var Field = (function () {
    function Field(id, location, cropType) {
        this.id = id;
        this.location = location;
        this.cropType = cropType;
    }
    return Field;
}());
exports.Field = Field;
