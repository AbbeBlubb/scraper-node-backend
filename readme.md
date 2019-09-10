### package.json

scripts: "dev": "nodemon", 
// Kommer köra filen som står i "main" som default, annars skriv "nodemon filNamn.js" och då körs både filNamn och "main"

scripts: "start": "node index.js"
// Heroku kör "npm start". Om du ändrar namnet på start-filen så behöver därför filnamnet uppdateras även här

### Selectorer för Aftonbladet
var hej = document.querySelectorAll("a._3xv_Q[data-test-id='teaser']")
// nodelist 88
