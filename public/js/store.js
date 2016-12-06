//require ./util.js

(function(PPTStore){
    var PPTURL = '/ppt.md'
    PPTStore.fetch = function(done){
        return util.http(PPTURL, done)
    }
})(window.PPTStore || (window.PPTStore = {}))