(function (util) {
    util.resolveUrl = (function () {
        var img = document.createElement('img')
        return function qualifyURL(url) {
            img.src = url // set string url
            url = img.src // get qualified url
            img.src = null // no server request
            return url
        }
    })()

    util.http = function(url, method, done){
        if(!url) return

        if(typeof method === 'function'){
            done = method
            method = 'GET'
        }else{
            method = method || 'GET'
            done = done || function(){}
        }

        var request = new XMLHttpRequest()
        request.open(method, url, true)
        request.onreadystatechange=function(ev){
            if(request.readyState === 4){
                if(request.status>=200 && request.status<400){
                    var text = request.responseText
                    done(null, text)
                    return
                }
                done(request)
            }
        }
        
        request.send(null)
    }
})(window.util || (window.util = {}))