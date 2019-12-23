### skapa projektet

> npm init -y // Genererar en package.json utan att ställa frågor
> npm install nodemon // Skriv sen in nodemon och start i scripts


### package.json

scripts: "dev": "nodemon", 
// Kommer köra filen som står i "main" som default, annars skriv "nodemon filNamn.js" och då körs både filNamn och "main"

scripts: "start": "node index.js"
// Heroku kör "npm start". Om du ändrar namnet på start-filen så behöver därför filnamnet uppdateras även här
