export default function (req, res, next){
  console.log(req.cookies.token);
  res.locals.token = req.cookies.token ? true : false
  console.log(res.locals.token);
  next()
}