#!/bin/bash

GREEN=`tput setaf 2`
RESET=`tput sgr0`
BLUE=`tput setaf 4`
FILL_UID=
FILL_SECRET=

cd back

if [ -f .env ]
	then
		clear
	else
		echo -e "\nIf you don't have your keys yet, you can get them at https://profile.intra.42.fr/oauth/applications\n"
		echo "${BLUE}Enter your UID key ...${RESET}"
		read FILL_UID
		echo "${GREEN}Received [${FILL_UID}] [OK]${RESET}"
		sleep 2s
		clear
		echo "${BLUE}Now enter your SECRET key ... ${RESET}"
		read FILL_SECRET
		echo "${GREEN}Received [${FILL_SECRET}] [OK] ${RESET}"
		sleep 2s
		clear
		echo "${GREEN}Your configuration is being created ...${RESET}"
		echo 'UID='$FILL_UID > .env
		echo 'SECRET='$FILL_SECRET >> .env
		echo 'URL=https://api.intra.42.fr/oauth/token' >> .env
fi

if [ -d node_modules ];
    then
		echo "${GREEN}Environment variable set [OK] ...${RESET}"
        echo "${GREEN}Node_modules [OK] ...${RESET}" 
        node server.js
    else
        clear
        echo "${BLUE}Installing packages and updating ..."
        npm install
        chmod 777 *
        clear
        echo "${GREEN}Loading ...${RESET}"
        node server.js
fi
