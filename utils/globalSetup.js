const FullConfig = require('@playwright/test')
const dotenv = require('dotenv')

/**
 * globalSetup for enviroment
 * 
 */
module.exports = async function  globalSetup(config=FullConfig) {

    if(process.env.test_env){
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        })
    }else{
        // default test execution site : milo
        dotenv.config({
            path: `.env.milo`,
            override: true
        })
    }

}