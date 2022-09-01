# Screenshot Tools

Compare screenshots in two environments

## Configuration
use a YAML file to configure for screenshots only

```
outputDir: screenshots          # default: screenshots

envUrl: https://acrobat.adobe.com

wait:
  element : .feds-login         # wait for the element
  timeout: 30000                # until timeout
  pause: 3000                   # pause between pages

pages:
  - /us/en
  - /us/en/sign.html
```

To compare screenshots, use `envUrlA` and `envUrlB`.

```
envUrlA: https://acrobat.adobe.com
envUrlB: https://www-stage01.acrobat.adobe.com
```

## take

Take screenshots

For one environment

```
node run common tools/screenshot/take.js --config dc/tools/screenshot/dc.yml --envUrl https://www-stage.acrobat.adobe.com
```

For comparison of two environments

```
node run common tools/screenshot/take.js --config dc/tools/screenshot/dc.yml --profiles dc/profiles.yml --envUrlA prod --envUrlB stage
```

How the tool gets full page screenshots:

* Chrome: headless mode
* Firefox: headless mode
* Intenet Explorer: use IE webdriver v.2.53 on a machine with 1920x1080 resolution
* Safari: browser window can be bigger than desktop size
* iPhone/iPad: stitch scrolling screenshots
* Android: stitch scrolling screenshots

When stitching is using, the browser header and footer heights should be configured in screenshot.yml. The stitch line may be visible in the final image and a fixed header and button will appear in each section.

## compare

Compare screenshots

```
node common/tools/screenshot/compare.js --config results.json
```

## upload

Prepare screenshot folder for upload

```
node common/tools/screenshot/upload.js --config results.json
```

## configs

To generate combinations of paths, use `configs` in the configuration. 

```
configs:
  locale:
    - path: /us/en
    - path: /jp/ja
      query: 
        akamaiLocale: jp
     
pages:
  - <locale>
  - <locale>/sign.html
```

## variables

If the path is depended on the environment, `variables` can be used in the configuration. 

```
variables:
  fr: 
    fr/fr: acrobat.adobe.com
    fr: www(|\..+).adobe.com
  page1:
    index.html: acrobat.adobe.com
    acrobat/index.html: www(|\..+).adobe.com

pages:
 - <fr>/index.html?mboxDisable=1&akamaiLocale=FR
 - <page1>  
```