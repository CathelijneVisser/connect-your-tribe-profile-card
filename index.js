// Importeer express uit de node_modules map
import express, { response } from 'express'

const url = 'https://whois.fdnd.nl/api/v1/member/cathelijne-visser'

let data

try { 
  data = await fetch(url)
        .then((response) => response.json())
        .catch(error => console.log(error))
} catch(error) {
  console.log(error)
}
console.log(data.member.bio)


// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  res.render('index', data)
})

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8800)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
