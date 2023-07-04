const debugInfo = (str1, str2) => {
    if ( typeof str2 !== 'undefined' ) {
        console.log("%c【DEBUG】 " + str1 + " %c" + str2, "color:#2dc9ac;", 'background:green;color:white;');
    } else {
        console.log("%c【DEBUG】 " + str1, "color:#2dc9ac;");
    }
    
};

// node & browser
module.exports = {
    debugInfo
};


