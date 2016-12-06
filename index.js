//babel register hook
// require("babel-register")({
//   // Optional only regex - if any filenames **don't** match this regex then they
//   // aren't compiled
//   only: /server/,

//   // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
//   // and .js so you'll have to add them back if you want them to be used again.
//   extensions: [".es6", ".es", ".jsx", ".js"]
// });

require('babel-register')

require('babel-polyfill')

//start server
require('./server')