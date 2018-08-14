# Google Spreadsheet Data

A node.js script to import data from Google Drive. Useful to use Google Spreadsheet data in static websites.

This script is based on the [tutorial of Sprint Works](https://sprintworks.se/blog/data-from-google-drive-in-static-websites/).

This script connects to your spreadsheet, gets data and saves them in a `yaml` file to use with Jekyll.

Of course, you can edit the script to save the data in another format (`json`, `xml`...).

## How to use it

### Google Cloud Platform

1. Go to Google Cloud Platform: https://console.developers.google.com/iam-admin
2. Enable the Google Drive API in API and Services > Library > Google Drive.
3. Create credentials (service account key in `json` type). You may have to create a service account or you could use one you've already created.
4. Download the `json` file and place it in your project
5. Open the file to discover email address of the service account:
    ```json
    {
        ...
        "client_email": "XXXXX@atomic-climate-XXXXXX.iam.gserviceaccount.com",
        ...
    }
    ```

### Google Spreadsheet

- Share the spreadsheet you want to use with your IAM user email address

### Node JS

1. Move the `package.json`, `.babelrc` and `google-spreadsheet.js` files in your project
2. Install dependencies:
    ```shell
    $ npm install
    ```
3. Setup the `google-spreadsheet.js` script:
    - Add your service account key file in `creds` variable.
    - Add the identifier of your spreadsheet in `doc` variable.
        - Example: https://docs.google.com/spreadsheets/d/1o_NWrDsVNSVU1jViexKQi08aI6h76fXrMIcvbT9faoM/edit#gid=0 : "1o_NWrDsVNSVU1jViexKQi08aI6h76fXrMIcvbT9faoM"
    - Add the number of the sheet you want to use in `sheetNumber` variable.
    - Change your exportation filename: `exportFile`.
    - Change the exportation code to match with the format you want to use.