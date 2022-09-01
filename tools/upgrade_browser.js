const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function upgradeChromeWin() {
  let script = `
start chrome
Sleep 1
$wshell = New-Object -ComObject wscript.shell; 
$wshell.AppActivate('Chrome') 
Sleep 1
$wshell.SendKeys('chrome://settings/help')
Sleep .5
$wshell.SendKeys("{ENTER}")
Sleep 180 
$wshell.AppActivate('Chrome') 
Sleep 1
$wshell.SendKeys("%{F4}") # ALT F4
  `;
  let tmpfile = path.join(os.homedir(), 'Downloads', 'upgrade_chrome.ps1');
  fs.writeFileSync(tmpfile, script);
  let res = spawnSync('powershell', [`-ExecutionPolicy bypass -File ${tmpfile}`], {
    shell: true
  });
  return res.stdout.toString().split('\n')[0];
}

async function upgradeChromeMac() {
  let script = `
tell application "Google Chrome"
  open location "chrome://settings/help"
  activate
end tell
delay 180
tell application "Google Chrome"
  quit
end tell
  `;
  let tmpfile = path.join(os.homedir(), 'Downloads', 'upgrade_chrome.scpt');
  fs.writeFileSync(tmpfile, script);
  let res = spawnSync('osascript', [`${tmpfile}`], {
    shell: true
  });
  return res.stdout.toString().split('\n')[0];
}

async function upgradeChrome() {
  if (process.platform === 'win32') {
    return await upgradeChromeWin();
  } else if (process.platform === 'darwin') {
    return await upgradeChromeMac();
  }
}

async function main() {
  await upgradeChrome();
}

main().catch(err => {
  console.log(err);
});
