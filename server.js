// Setting up all packages and modules to be used
const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl');
const app = express()

require('dotenv/config')



// Allowing use of EJS templating
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false}))



// Rendering the page + importing the Schema
app.get('/', async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})



/* 
Once the Full URL is entered in the form field and the submit button is clicked, 
add to database and generate shortened URL as per Schema 
*/
app.post('/shortUrls', async (req,res)=> {
    await ShortUrl.create({ full: req.body.fullUrl})

    res.redirect('/')
})



/* 
When shortened URL is clicked,
Check for errors,
if none are found, then save shortend URL and update the number of clicks to that URL,
finally, redirect from shortened URL to full Url
*/
app.get('/:shortUrl', async (req, res) => {
   const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})

   if (shortUrl == null) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()

   res.redirect(shortUrl.full);
})



// Connecting to the DataBase
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true} ,()=> {
    console.log("Connected to URL shrinker DB!")
})



// Listening to port
app.listen(process.env.PORT || 5000);