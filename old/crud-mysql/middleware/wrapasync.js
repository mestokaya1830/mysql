//set try catch block
const wrapAsync = (param) => {
  return (req, res, next) => {
    param(req, res, next).catch(next)
  }
}

module.exports =  wrapAsync