function colorRGBtoHex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

console.log(colorRGBtoHex('rgb(143,18,254)'));

function hextoRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);   
    // return result ? {       
    //     r: parseInt(result[1], 16),              
    //     g: parseInt(result[2], 16),       
    //     b: parseInt(result[3], 16)   
    // } : null;
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},00)`;
}
console.log(hextoRgb('#8f12fe'));