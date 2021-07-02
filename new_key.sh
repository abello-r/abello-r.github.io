#!/bin/bash

GREEN=`tput setaf 2`
RESET=`tput sgr0`
BLUE=`tput setaf 4`
FILL_UID=
FILL_SECRET=

cd back
rm -rf .env

if [ -f .env ]
	then
		clear
	else
		echo -e "\nIf you don't have your keys yet, you can get them at https://profile.intra.42.fr/oauth/applications/5888\n"
		echo "${BLUE}Enter your new UID key ...${RESET}"
		read FILL_UID
		echo "${GREEN}Received [${FILL_UID}] [OK]${RESET}"
		sleep 2s
		echo "${BLUE}Now enter your new SECRET key ... ${RESET}"
		read FILL_SECRET
		echo "${GREEN}Received [${FILL_SECRET}] [OK] ${RESET}"
		sleep 2s
		echo -e "\n${GREEN}Your configuration is being created'...${RESET}"
		sleep 1s
		echo 'UID='$FILL_UID > .env
		echo 'SECRET='$FILL_SECRET >> .env
		echo 'URL=https://api.intra.42.fr/oauth/token' >> .env
fi

cd ..
bash run.sh