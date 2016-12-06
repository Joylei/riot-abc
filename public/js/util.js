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

    util.http = function(url, done){
        if(!url || !done) return

        var request = new XMLHttpRequest()
        request.onreadystatechange(function(ev){
            if(request.readyState === 4){
                var response = request.response
                var text = request.responseText
                try {
                    var data = JSON.parse(text)
                    return done.call(null, data)
                } catch (e) {
                    console.error(e)
                }
                done.call(null, text)
            }
        })
        request.open('GET', url, true)
    }
})(window.util || (window.util = {}))