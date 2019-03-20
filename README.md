# InfoCarte

# Getting started with Angular

## Instalación de NVM

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

## Verificar si NVM está instalado

command -v nvm

Fuente: https://github.com/creationix/nvm

## Instalación de node.js

nvm install node

## NPM

NPM viene instalado con Node.js

Para verificar si estan instalados correctamente ejecutar los siguientes comandos:

node -v

npm -v

## Instalación de Angular CLI

npm install -g @angular/cli

## Generar un proyecto y correrlo en el servidor:

ng new project-name

cd project-name

ng serve

El proyecto corre por defecto en el puerto 4200

http://localhost:4200/

# Para ejecutar este proyecto

## Instarlar las dependencias

npm install

## Ejecutar el servidor web integrado de Angular CLI

ng serve

## Acceder a la aplicacion

http://localhost:4200/
