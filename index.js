const { GoogleSpreadsheet } = require('google-spreadsheet');

function test(){
    console.log("Testing");
}

async function upload(data){

    // NOTE - WRITE FUNCTION TO CONVERT UPLOADED FILE TO HTML USING MAMMOTH JS

    // Initialize the sheet - doc ID is the long id in the sheets URL
    // 12r_GcrQPvyPx8zMT5nuYZoeK2YupATFqo6h1-Ym4Nuc
    const doc = new GoogleSpreadsheet('<SPREADSHEET ID>');

    await doc.useServiceAccountAuth({
        client_email: "<SERVICE ACCOUNT>",
        private_key: "<PRIVATE KEY OF SERVICE ACCOUNT>",
    });

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);

    const rows = await doc.sheetsByIndex[0].getRows();
    const length = rows.length;

    // data = {title : <TITLE OF DOCUMENT>,
    //         date : <DATE OF REQUEST>,
    //         author : <NAME OF DOCUMENT>,
    //         text : <HTML in string format>};

    const date = String(data.date);
    const chunks = data.text.match(/.{1,1000}/g);

    const newRow = [data.title, date, data.author,chunks.length,...chunks];
    // Title Date Author Span Chunks 
    await sheet.addRow(newRow);
}

async function fetch(){

    // Initialize the sheet - doc ID is the long id in the sheets URL
    // 12r_GcrQPvyPx8zMT5nuYZoeK2YupATFqo6h1-Ym4Nuc
    const doc = new GoogleSpreadsheet('<SPREADSHEET ID>');

    await doc.useServiceAccountAuth({
        client_email: "<SERVICE ACCOUNT>",
        private_key: "<PRIVATE KEY OF SERVICE ACCOUNT>",
    });

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);

    const rows = await doc.sheetsByIndex[0].getRows();
    const length = rows.length;

    console.log(rows);
    console.log(rows[1]);

    var data = [];
    // data is array of --> 
    //         {title : <TITLE OF DOCUMENT>,
    //         date : <DATE OF REQUEST>,
    //         author : <NAME OF DOCUMENT>,
    //         text : <HTML in string format>};

    for (const row of rows) {
        // Get the keys in the current row object as an array
        const keys = Object.keys(row);

        // Slice the array to start from the 4th element until the end
        const slicedKeys = keys.slice(3);

        var chained_chunks = "";

        // Loop over the sliced keys
        for (const key of slicedKeys) {

            // Access the value for the current key
            const value = row[key];
            chained_chunks += String(value);

        }

        temp_data = { "title" : rows[i].cols0,
                      "date" : rows[i].cols1,
                      "author" : rows[i].cols2,
                      "text" : chained_chunks
        };

        data.append(temp_data);
    }

    return data;
    
}
