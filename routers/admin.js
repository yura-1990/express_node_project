import { Router } from 'express'

const router = Router()

router.get('/admin', (req, res)=>{
  if (req.cookies.token) {
    res.render('admin', {
      title: "Admin",
      isAdmin: true
    })
  } else {
    return res.redirect('/login')
  }
})

export default router