$(document).ready(function () {
    $('#submit').show();
    $('#submit').click(function(){  
        $('#ctn').show(); 
        $('#displace').show();    
        $('#add').hide();
        $('#custom').hide();
        $('#containerfile').hide();
        $('#gname').hide();
        // var namegame = $("#gamename").val();  
        // const name = document.getElementById("name");
        // name.innerHTML = namegame;

        if (DataEmp == '') {
            alert("You have not filled in the information!");
        } else {
            var padding = { top: 20, right: 40, bottom: 0, left: 0 },
                w = 500 - padding.left - padding.right,
                h = 500 - padding.top - padding.bottom,
                r = Math.min(w, h) / 2,
                rotation = 0,
                oldrotation = 0,
                picked = 100000,
                oldpick = [],
                color = d3.scale.category20();

            var data = DataEmp;
            var svg = d3.select('#chart')    
                .append("svg")
                .data([data])
                .attr("width", w + padding.left + padding.right)
                .attr("height", h + padding.top + padding.bottom);
            var container = svg.append("g")
                .attr("class", "chartholder")
                .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
            var vis = container
                .append("g");
            var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
            // declare an arc generator function
            var arc = d3.svg.arc().outerRadius(r);
            // select paths, use arc generator to draw
            var arcs = vis.selectAll("g.slice")
                .data(pie)
                .enter()
                .append("g")
                .attr("class", "slice");

            arcs.append("path")
                .attr("fill", function (d, i) { return color(i); })
                .attr("d", function (d) { return arc(d); });
            // add the text
            arcs.append("text").attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
            })
                .attr("text-anchor", "end")
                .text(function (d, i) {
                    return data[i].empName;
                });
            container.on("click", spin);
            function spin(d) {
                container.on("click", null);
                //all slices have been seen, all done
                console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
                if (oldpick.length == data.length) {
                    console.log("done");
                    container.on("click", null);
                    return;
                }
                var ps = 360 / data.length,
                    pieslice = Math.round(4000 / data.length),
                    rng = Math.floor((Math.random() * 4000) + 3600);
                rotation = (Math.round(rng / ps) * ps);

                picked = Math.round(data.length - (rotation % 360) / ps);
                picked = picked >= data.length ? (picked % data.length) : picked;
                if (oldpick.indexOf(picked) !== -1) {
                    d3.select(this).call(spin);
                    return;
                } else {
                    oldpick.push(picked);
                }
                rotation += 90 - Math.round(ps / 2);
                vis.transition()
                    .duration(4000)
                    .attrTween("transform", rotTween)
                    .each("end", function () {
                        //mark question as seen
                        d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                            .attr("fill", "#111");
                        oldrotation = rotation;
                        container.on("click", spin); 

                        let temp = Pri[0];
                        for(i = Pri.length; i > 0; i--){
                            const indexCurr = temp.stt;
                            
                            if(temp.qty === 0){
                                temp = Pri[Pri.length-(Pri.length-1)];
                                Pri.splice(0, 1);
                            }else{
                                document.getElementById(`rowqty${indexCurr}`).innerText = temp.qty - 1 
                                       
                            let temp2 = {
                                ...temp,
                                qty: temp.qty - 1     
                                } 
                            setTimeout(() => {
                                if (temp.qty === 0) {
                                    Pri.splice(0, 1);
                                    }
                                }, 1000)
                            if (temp.qty === 0) {
                                Pri.splice(0, 1);          
                            }else{
                                Pri.splice(0, 1, temp2)
                                var notyf = new Notyf();
                                notyf.success({    
                                    message: data[picked].empName +"-"+ data[picked].empID+"-"+data[picked].dept +" " + "won" + " " + temp.rank,
                                    duration: 5000,
                                    position: {
                                        x: 'center',
                                        y: 'center'
                                        },
                                    icon: false ,
                                    });   
                                    var myButton = document.getElementById("displace");
                                    myButton.onclick = function(){
                                        var noticeDis = confirm("Do you want to replace" + " " + data[picked].empName + " " + "?");
                                        if(noticeDis == true){
                                            tableBody.deleteRow(1);
                                            temp2.qty++; 
                                        }   
                                    }                                                                      
                                }   
                                if(temp.stt === 1 && temp.qty == 1){
                                    setTimeout(function(){  
                                        var notice = confirm("the game is over")
                                        if(notice == true){
                                            alert("Do you agree to exit the wheel?");
                                            $('#chart').hide();
                                            $('#displace').hide();      
                                        }else{
                                            alert("You do not agree to exit the rotation?");
                                        }
                                    },8000);                                         
                                }       
                            }    
                        }   
                        Pri[0].pick.splice(0,1,data[picked].empName); 
                        Pri[0].employeeId.splice(0,1,data[picked].empID);  
                        Pri[0].department.splice(0,1,data[picked].dept);       
                        
                        var tableBody = document.getElementById("tableresult");
                        var row = tableBody.insertRow(+1);
                        var rowData = Pri[0];
                        row.innerHTML = `
                            <td>${rowData.rank}</td>
                            <td>${rowData.Prire}</td>
                            <td>${rowData.Image}</td>
                            <td>${rowData.employeeId}</td>
                            <td>${rowData.pick}</td>
                            <td>${rowData.department}</td>          
                        `;  
                        const NotyfPrize = document.getElementById('noticePrize');
                        const DataPrize = [];
                        DataPrize.push(temp.rank)
                        NotyfPrize.innerHTML = DataPrize;     
                        console.log(Pri[0])                                          
                    });
            }    
            //make arrow
            svg.append("g")
                .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
                .append("path")
                .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
                .style({ "fill": "green" });
            //draw spin circle
            container.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 60)
                .style({ "fill": "white", "cursor": "pointer" });
            //spin text
            container.append("text")
                .attr("x", 0)
                .attr("y", 15)
                .attr("text-anchor", "middle")
                .text("SPIN")
                .style({ "font-weight": "bold", "font-size": "30px" });

            function rotTween(to) {
                var i = d3.interpolate(oldrotation % 360, rotation);
                return function (t) {
                    return "rotate(" + i(t) + ")";
                };
            }
            function getRandomNumbers() {
                var array = new Uint16Array(1000);
                var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
                if (window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function") {
                    window.crypto.getRandomValues(array);
                    console.log("works");
                }else{
                    //no support for crypto, get crappy random numbers
                    for (var i = 0; i < 1000; i++) {
                        array[i] = Math.floor(Math.random() * 100000) + 1;
                    }
                }
                return array;
            }
        }
        if (svg != null) {
            $('#submit').hide();
        }
    });
});
