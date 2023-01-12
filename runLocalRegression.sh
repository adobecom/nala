#!/bin/bash

# This script allows users to run regression tests against localhost
T_FLAG=''
H_FLAG=''
B_FLAG=''
P_FLAG=3000

Help() {
  echo "This script allows users to run regression tests against localhost.\n"
  echo "Options:"
  echo "-t Tag name. Default=all.\n 
  ie. ./runLocalRegression.sh -t @modal\n"
  echo "-h Headed mode. Defaults to headless.\n
  ie. ./runLocalRegression.sh -h headed\n"
  echo "-b Project(browser) name. Default=all.\n 
  ie. ./runLocalRegression.sh -b webkit\n"
  echo "-p Localhost port. Defaults to localhost:3000.\n
  ie. ./runLocalRegression.sh -p 6456\n"
}

while getopts 't:h:b:p:' flag; do
  case ${flag} in
    t) T_FLAG=$OPTARG;;
    h) H_FLAG=--$OPTARG;;
    b) B_FLAG=--project=$OPTARG;;
    p) P_FLAG=$OPTARG;;
    *) Help 
       exit 1 ;;
  esac
done

echo "Setting envs to local"
sed -i "" "/envs:/s/^/      envs: '@local$P_FLAG', \/\//" ./features/*.js

echo "Executing tests against localhost:$P_FLAG"
if [ ! -z "$T_FLAG" ]
then
  npm test -- -g $T_FLAG $H_FLAG $B_FLAG
else
  npm test --  $H_FLAG $B_FLAG
fi

echo "Reverting envs back to original values"
sed -i "" "s/envs: '@local$P_FLAG', \/\/      //g" ./features/*.js
