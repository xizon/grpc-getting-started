const {debugInfo} = require('./debug-info');


const cancelRun = (call, clasStr) => {
    // disconnect the client of gRPC services
    try {
        call.cancel();

        if (window['API_DEBUG'] === true) {
            debugInfo('disconnect: ', clasStr);
        }
    } catch (e) { 
        if (
            e.toString().toLowerCase().indexOf('cannot read properties of undefined') < 0 && 
            window['API_DEBUG'] === true
        ) {
            debugInfo(e.toString());
        }
    }

    
};

// node & browser
module.exports = {
    cancelRun
};


