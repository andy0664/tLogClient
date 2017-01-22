# tLogClient

Init:
1. clone from github
2. npm install
3. ionic state restore
4. ionic platform remove ios
5. ionic platform add android
6. ionic build
7. ionic serve
8. Webstorm ECMAScript 6 auswählen

im package.json cordovaPlatforms ändern auf:
"cordovaPlatforms": [],

falls ihr bei ionic state restore die Fehlermeldung bekommt:
  "cordova plugin add cordova-plugin-device
  Caught exception:
  undefined"
dann einfach ionic serve zuerst ausführen sollte den "www" ordner anlegen und dann mit ionic state restore fortfahren

