

const router = require('express').Router();
const admin = require('firebase-admin')
router.get('/', (req, res) => {
  return res.send('inside the user router')
})

router.get("/jwtVerfication", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: 'token Not found' })
  }

  const token = req.headers.authorization.split(" ")[1]
  // return res.status(200).send({ token: token })
  try {
    const decodedValue = await admin.auth().verifyIdToken(token)
    if (!decodedValue) {
      return res.status(500).json({ success: false, msg: 'Unauthorized access ' })

    }
    return res.status(200).json({ success: true, data: decodedValue });
  }
  catch (e) {
    return res.send({ success: false, msg: `Error in extracting the token : ${e}` })
  }

});

module.exports = router;