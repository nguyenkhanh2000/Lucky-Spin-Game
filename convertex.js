$("body").on("click", "#upload", function () {
    //Reference the FileUpload element.
    var fileUpload = $("#fileUpload")[0];

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
});
const DataEmp = [];
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Create a HTML Table element.
    var table = $("<table/>");
    table[0].border = "2";
    //Add the header row.
    var row = $(table[0].insertRow(-1));
    
    ////Add the header cells.
    var headerCell = $("<th/>");
    headerCell.html("No");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Emp ID");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Emp Name");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Emp Email");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Org");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Department");
    row.append(headerCell);

    var headerCell = $("<th/>");
    headerCell.html("Company");
    row.append(headerCell);
    
    
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = $(table[0].insertRow(-1));

        //Add the data cells.
        var cell = $("<td />");
        cell.html(excelRows[i].No);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].EmpID);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].EmpName);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].EmpEmail);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].Org);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].Dept);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i].Company);
        row.append(cell);
   
    }
    console.log(excelRows);
    
    for(var i = 0; i < excelRows.length; i++){
        const conv = {
            No: excelRows[i].No,
            empID: excelRows[i].EmpID,
            empName: excelRows[i].EmpName,
            empEmail: excelRows[i].EmpEmail,
            org: excelRows[i].Org,
            dept: excelRows[i].Dept,
            company: excelRows[i].Company
        }
        
        DataEmp.splice(i,0,conv);       
    } 
    var dvExcel = $("#dvExcel");
    dvExcel.html("");
    dvExcel.append(table); 
    
};
