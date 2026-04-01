# Google Apps Script Setup for Central Bio Data

To connect this form to a Google Sheet, follow these steps:

1. Create a new Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Delete any code in the editor and paste the code below.
4. Click **Deploy** > **New deployment**.
5. Click the "Select type" gear icon and select **Web app**.
6. Configuration:
   - **Description**: Central Bio Data Backend
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**.
8. Copy the **Web App URL**.
9. Paste this URL into your `constants.ts` file as `GOOGLE_SCRIPT_URL`.

**Important**: If you update the code in Apps Script, you must click **Deploy** > **Manage deployments**, edit the active deployment, select "New version", and click **Deploy** again.

## Code to Paste

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 1. Log the event for debugging (View in 'Executions' tab)
    console.log("Received POST request");
    
    // Safety check for event object
    if (!e || !e.postData) {
      console.error("No postData received");
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "No data" })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Parse Data
    // We use getDataAsString() which is safer for various content-types
    var rawData = e.postData.getDataAsString();
    console.log("Raw Data:", rawData);
    
    var data = JSON.parse(rawData);

    // Define the headers you want in the sheet
    var headers = [
      "Timestamp",
      "Start Date on TIA",
      "Employee Code",
      "Title",
      "First Name/s",
      "Surname",
      "Role",
      "Cluster",
      "Work Mainplace",
      "Region",
      "Gender",
      "ID Type",
      "ID/Passport number",
      "Passport number",
      "Tax Number",
      "MOMO Number",
      "Residential address",
      "Postal Code",
      "Town",
      "City",
      "Primary contact number",
      "Secondary contact number",
      "Email address",
      "Has Drivers License",
      "Has Car",
      "Car Name",
      "Marital status",
      "Next-of-kin name and surname",
      "Next-of-kin contact number",
      "Account Number",
      "Bank Name",
      "Account Type",
      "Branch Code"
    ];

    // Check if headers exist in the first row, if not, create them
    var range = sheet.getRange(1, 1, 1, headers.length);
    if (sheet.getLastRow() === 0) {
      range.setValues([headers]);
      range.setFontWeight("bold");
      range.setBackground("#fce7f3"); // Light pink background
    }

    // Map the incoming JSON data to the headers order
    // We strictly format numbers as strings (using "'") to prevent Sheets from 
    // auto-formatting IDs or Phone numbers.
    var row = [
      new Date(),
      data.startDateOnTIA || "",
      data.employeeCode || "",
      data.title || "",
      data.firstNames || "",
      data.surname || "",
      data.role || "",
      data.cluster || "",
      data.workMainplace || "",
      data.region || "",
      data.gender || "",
      data.idType || "",
      "'" + (data.identityNumber || ""),
      data.passportNumber || "",
      "'" + (data.taxNumber || ""),
      "'" + (data.momoNumber || ""),
      data.residentialAddress || "",
      "'" + (data.postalCode || ""),
      data.town || "",
      data.city || "",
      "'" + (data.primaryContactNumber || ""),
      "'" + (data.secondaryContactNumber || ""),
      data.emailAddress || "",
      data.hasDriversLicense || "",
      data.hasCar || "",
      data.carName || "",
      data.maritalStatus || "",
      data.nextOfKinName || "",
      "'" + (data.nextOfKinContact || ""),
      "'" + (data.accountNumber || ""),
      data.bankName || "",
      data.accountType || "",
      "'" + (data.branchCode || "")
    ];

    sheet.appendRow(row);
    console.log("Row appended successfully");

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    console.error("Error occurred:", e.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```
