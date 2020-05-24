### Nodemon

scripts: { "dev": "nodemon" } 
// npm run dev kommer köra filen som står i "main" som default, annars skriv "nodemon filNamn.js" och då körs både filNamn och "main"


### Heroku

scripts: { "start": "node index.js" }
// Heroku kör "npm start". Om du ändrar namnet på startfilen så behöver därför filnamnet uppdateras även här
