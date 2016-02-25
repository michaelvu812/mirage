export const $http = {
    get: function(url: string, auth: string) {
        return _sendRequest(url, null, 'GET', auth);
    },
    post: function(url: string, payload: any, auth: string){
        return _sendRequest(url, payload, 'POST', auth);
    },
    put: function(url: string, payload: any,  auth: string){
        return _sendRequest(url, payload, 'PUT', auth);
    },
    delete: function(url: string, payload: any,  auth: string){
        return _sendRequest(url, null, 'DELETE', auth);
    }
}
function _sendRequest(url: string, payLoad: any, type: string, auth: string): Promise {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(type, url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.setRequestHeader("Authorization", auth);
        req.withCredentials = true;

        req.onload = function() {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject(JSON.parse(req.response));
            }
        };
 
        req.onerror = function() {
            reject(JSON.parse(req.response));
        };
 
        if (payLoad) {
            req.send(JSON.stringify(payLoad));
        } else {
            req.send(null);
        }
    });
}