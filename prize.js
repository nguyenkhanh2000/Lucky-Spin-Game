var imagesObject = [];
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            // displayImgData(e.target.result)
            addImage(e.target.result);
        };
        reader.readAsDataURL(f);
    }
}
function loadFromLocalStorage() {
    var images = JSON.parse(localStorage.getItem("images"))
    if (images && images.length > 0) {
        imagesObject = images;
        displayNumberOfImgs();
        // images.forEach(displayImgData);
    }

}
function addImage(imgData) {
    imagesObject.push(imgData);
    displayNumberOfImgs();
    localStorage.setItem("images", JSON.stringify(imagesObject));

}
// function displayImgData(imgData){
//     var span = document.createElement('span');
//     span.innerHTML = '<img class="thumb" id="thumb" src="' + imgData + '"/>';
//     document.getElementById('list').insertBefore(span, null);
// }
function displayNumberOfImgs() {
    if (imagesObject.length > 0) {

        document.getElementById("state").innerHTML = imagesObject.length + " image" + ((imagesObject.length > 1) ? "s" : "") + " stored in your browser";

        document.getElementById("deleteImgs").style.display = "inline";

    } else {
        document.getElementById("state").innerHTML = "No images stored in your browser.";
        document.getElementById("deleteImgs").style.display = "none";
    }
}
function deleteImages() {
    imagesObject = [];
    localStorage.removeItem("images");
    displayNumberOfImgs()
    document.getElementById('list').innerHTML = "";
    console.log(list);
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById('deleteImgs').addEventListener("click", deleteImages);
loadFromLocalStorage();


var list1 = [];
var list2 = [];
var list3 = [];
var list4 = [];
var list5 = [];


var arr = new Array(list1, list2, list3, list4, list5)
var Pri = [];
var n = 1;
var x = 0;
var Inputrank = document.getElementById("rank").value;
var Inputprize = document.getElementById("prize").value;
var Inputimage = document.getElementById("files").value;
var Inputqty = document.getElementById("quantity").value;

function AddRow() {
    var Inputrank = document.getElementById("rank").value;
    var Inputprize = document.getElementById("prize").value;
    var Inputimage = document.getElementById("files").value;
    var Inputqty = document.getElementById("quantity").value;

    if(Inputrank ==='' || Inputprize === '' || Inputimage ==='' || Inputqty ===''){
        alert('please enter your information');
    }else{

        var AddRown = document.getElementById('table');
        var NewRow = AddRown.insertRow(n);
    
        list1[x] = document.getElementById("rank").value;
        list2[x] = document.getElementById("prize").value;
        list3[x] = document.getElementById("files").value;
        list4[x] = document.getElementById("quantity").value;
        
        const obj = {
            rank: document.getElementById("rank").value,
            Prire: document.getElementById("prize").value,
            Image: '<img id="add" src="' + imagesObject[x] + '"/>',
            qty: document.getElementById("quantity").value,
            stt: n,
            pick: [],
            employeeId: [],
            department:[],
        }
    
        var cel1 = NewRow.insertCell(0);
        var cel2 = NewRow.insertCell(1);
        var cel3 = NewRow.insertCell(2);
        var cel4 = NewRow.insertCell(3);
        var cel5 = NewRow.insertCell(4);
    
        cel1.innerHTML = list1[x];
        cel2.innerHTML = list2[x]; 
        cel3.innerHTML = '<img id="add" src="' + imagesObject[x] + '"/>'
        cel4.innerHTML = list4[x];
        cel4.setAttribute("id", `rowqty${n}`);
        
        cel5.innerHTML = n;
        
        cel4.style.color = "red";
        cel4.style.fontSize = "20px";
        cel4.style.textAlign="center";

        list5.push(n);
        n++;
        x++;
    
        Pri.splice(0, 0, obj)
        
       
    
        var Iprank = document.getElementById("rank");
        var Ipprize = document.getElementById("prize");
        var Ipimage = document.getElementById("files");
        var Ipqty = document.getElementById("quantity");
        Iprank.value = "";
        Ipprize.value = "";
        Ipimage.value = "";
        Ipqty.value = "";     
        
    }

}

