function exportTableToExcel(tableID,filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    filename = filename?filename+'.xls':'excel_data.xls';
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    console.log(downloadLink);
}

// $(function(){
//     function addImage(url, workbook, worksheet, excelCell, resolve) {
//       var xhr = new XMLHttpRequest()
//       xhr.open('GET', url)
//       xhr.responseType = 'blob'
//       xhr.onload = function () {
//         var reader = new FileReader();
//         reader.readAsDataURL(xhr.response);
//         reader.onloadend = function() {
//           var base64data = reader.result;                
//           const image = workbook.addImage({
//             base64: base64data,
//             extension: 'png',
//           });
  
//           worksheet.getRow(excelCell.row).height = 75;
//           worksheet.addImage(image, {
//             tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
//             br: { col: excelCell.col, row: excelCell.row }
//           });
  
//           resolve();
//         }
//       }
//       xhr.onerror = function () {
//         console.error('could not add image to excel cell')
//       };
//       xhr.send();
//     }
    
//     $('tableresult').dxDataGrid({
//       dataSource: Excel,
//       showBorders: true,
//       export: {
//         enabled: true
//       },
//        columns: [{
//          dataField: "Image",
//          width: 100,
//          allowFiltering: false,
//          allowSorting: false,
//          cellTemplate: function (container, options) {
//              return $("<div>").append($("<img>", { "src": options.value }));
//          }
//        }, {
//          dataField: "rank",
//          caption: "Rank",
//          width: 70
//        },
//                  "Prire",
//                  "employeeId",
//                  "Position",
//                  "pick",
//                  "department",
//                 //  {
//                 //    dataField: "BirthDate",
//                 //    dataType: "date"
//                 //  }, {
//                 //    dataField: "HireDate",
//                 //    dataType: "date"
//                 //  }
//                 ],
//       onExporting: e => {
//         var workbook = new ExcelJS.Workbook();    
//         var worksheet = workbook.addWorksheet('Main sheet');
//         var PromiseArray = [];
        
//         DevExpress.excelExporter.exportDataGrid({
//           component: e.component,
//           worksheet: worksheet,
//           autoFilterEnabled: true,
//           customizeCell: (options) => {
//             var { excelCell, gridCell } = options;
//             if(gridCell.rowType === "data") {
//               if(gridCell.column.dataField === "Image") {
//                 excelCell.value = undefined;
//                 PromiseArray.push(
//                   new Promise((resolve, reject) => {
//                     addImage(gridCell.value, workbook, worksheet, excelCell, resolve); 
//                   })
//                 );
//               }
//             }
  
//           }
//         }).then(function() {
//           Promise.all(PromiseArray).then(() => {
//             workbook.xlsx.writeBuffer().then(function (buffer) {
//               saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ExcelJSFormat.xlsx");
//             });
//           });
//         });
//         e.cancel = true;
//       },
//     });
//   });