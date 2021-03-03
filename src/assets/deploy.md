
У меня windows 10
node v15.5.0
npm 7.3.3 


создал  репозиторий  react-game на GitHub


создал папку  локально react-game
зашел в нее
клонировал
 git clone  https://github.com/ya6/react-game.git ./


создал  ветку react-game и перешел в нее

npx create-react-app ./

npm install gh-pages --save-dev

я эксперементировал, если предупреждения были ( npm install react-scripts@latest)

.......

в package.json добавляем

//эту строку, со своим ником и репозиторием)
 "homepage": "https://ya6.github.io/react-game/",


  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",

// и эти две
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },

...
ph-pages работает на публичный репозиториях

на бираеешь в консоли:    npm run deploy   и все


 сначала делается build  затем пушит на ph-pages!






