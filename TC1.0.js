import fs from 'fs';
import readline from 'readline';
import fetch from 'node-fetch';
import figlet from 'figlet';

let lineCount = 0;
export async function readCsvToObjects(filename) {
    try {
        const fileStream = fs.createReadStream(filename);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const data = {};
        for await (const line of rl) {
            lineCount++;
            const [account, password] = line.split(':').map(part => part.trim());
            if (account && password) {
                data[lineCount] = { account, password };
            }
        }

        return data;
        // Of course you can return{data，lineCount}，to avoid use lineCount outside the function, but not necessary.
    } catch (error) {
        console.error('Failed to read the CSV file:', error);
        throw error;  
    }
}
async function tryPasswords(account, password) {
    try {
        let rcount=0
        // Try 3 times to make sure it's the correct password
        for (let i = 0; i <=3; i++) {
            // From here
            let body = `user_name=${account}&old_password=${password}&new_password=${password}&re_password=${password}`;
            try {
                // URL is here
                let fetchResponse = await fetch("", {
                    "headers": {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "en",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "body": body,
                    "method": "POST",
                });
                // To there. You may need to modify the URL and body to make it run in your environment.
                let responseData = await fetchResponse.json();
                if (responseData.message === "请求未授权") {
                    rcount++
                }
                if (rcount==3) {
                    console.log(`\x1b[32m${account}:${password}\x1b[0m`);
                    rcount=0
                    break;
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        }
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}

async function main(){
    let data=await readCsvToObjects('data.csv')// This should be your database's name
    for(let i=1;i<=lineCount;i++){// Make sure i start from 1, don't change, because lineCount is start from 1.
        if (data[i]) {
            await tryPasswords(data[i].account, data[i].password);
        }
    }
    console.log("Finished!")
}
const myPromise = new Promise((resolve, reject) => {
    // You can add reject part by yourself, because I think it's not necessary.
    figlet('T Accoount Tester', function(err, data) {
        if (err) {
            console.error('Something went wrong...');
            console.error(err);
            return;
        }
        console.log(data);
        resolve()
    });
});
myPromise
    .then(()=>main())