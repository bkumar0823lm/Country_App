
const api_url ="https://restcountries.com/v3.1/all"
// Variable to store json object

let data = "";

let all_code="";
// API fetch start
function date_time(tzone)
{
    let utc1 = tzone.split("C");
      let seperate = utc1[1].split(":");
      let part1 = parseInt(seperate[0]);
      let part2 = parseInt(seperate[1]);
      let set = part1 + (part2 / 60);
      let x = new Date();
      let month = x.getMonth();
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let day = x.getDate();
      let year = x.getFullYear();
      let str1 = ""
      let str = ""
      let str2 = ""
      str1 = day + " " + months[month] + " " + year;
      let localTime = x.getTime();
      let localOffset = x.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      let nd = new Date(utc + (3600000 * set));
      let h = nd.getHours();
      let m = nd.getMinutes();
      let h1 = "";
      let m1 = "";
      if (h < 10) {
        h1 = h1 + "0" + h.toString();
      }
      if (m < 10) {
        m1 = m1 + "0" + m.toString();
      }
      if (h < 10) {
        if (m < 10) {
          str2 = h1 + ":" + m1;
        }
        else {
          str2 = h1 + ":" + m;
        }
      }
      else {
        if (m < 10) {
          str2 = h + ":" + m1;
        }
        else {
          str2 = h + ":" + m;
        }
      }
      str = str1 + " and " + str2;

      return (str)
}

$("#sbut").on("click", function () {
    let value = $("#srchbr").val();

    $("#search-result").empty();

    $.get("https://restcountries.com/v3.1/name/" + value, function (data, status) {
      data.forEach(element => {

        let curr = "NULL";
        if(element.currencies){
          curr = Object.values(element.currencies)[0].name;
        }

        let str = `<div class='box1 mb-2'><div class="row">
              <div class="col-4"> 
                <img src="`+ element.flags.png + `" width="100%" id="imgchg" />
              </div>
              <div class="col">
                <h2>`+ element.name.common + `</h2>
                <p class="m-0">Currency : `+ curr + ` </p>
                <p class="m-0">Current date and time :`+ dateTime(element.timezones[0]) + ` </p>
                <a class='btn btn-outline-primary' href='`+ element.maps.googleMaps + `'>Show Map</a>
                <a class='btn btn-outline-primary' href='detail.html?country=`+ element.cca3 + `'>Detail</a>
              </div>
            </div></div>`;

        $("search-result").append(str);
      });
    })
  })

function dispall()
{    
    {
        function getData()
        {
            let url = api_url;
            all_code=""
            fetch(url).then((response)=>{
                return response.json();
            }).then((data)=>{
            
            
                console.log(data);
                // Algorithm here
            
                let flag=0;
            for(let i=0;i<data.length;i++)
            {
                var dict ={};
                    let flgnm=data[i]["flags"]["png"];
                    let ctrynm = data[i]["name"]["common"];
                    let mplnk= data[i]["maps"]["googleMaps"];
                    let cca3 = data[i]["cca3"];
                    let tzonee = data[i]["timezones"][0]
                    console.log(cca3)
                    let detlink = "detail.html?country="+cca3;
                    all_code += `
                    <div class="car" id="card">
                        <div id="picdiv">
                            <img class="cpic" src="`+flgnm+`" alt="Country Flag">
                        </div>
                        <div class="ctrydet">
                            <h2>&nbsp;`+ctrynm+`</h2>
                            <h6>&nbsp;&nbsp;&nbsp;&nbsp;Currency : </h6>
                            <h6>&nbsp;&nbsp;&nbsp;&nbsp;Date and Time : `+date_time(tzonee)+`</h6>
                            &nbsp;&nbsp;&nbsp;
                            <button id="detbut"><a href="`+mplnk+`" target="_blank" style="text-decoration:none;">Show Map</a></button>
                            &nbsp;&nbsp;<button id="detbut" onclick="getDetail()"><a href="`+detlink+`" target="_blank" style="text-decoration:none;">Detail</a></button>
                        </div>
                    </div>
                    <br>
                    `
                    document.getElementById("search-result").innerHTML = all_code;
                }
        })
    }    
    }
getData();
}
dispall();

function getData(){
    let url = api_url;
    all_code=""
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{


        console.log(data);
        // Algorithm here
  
        let flag=0;
        var k = document.getElementById("srchbr").value;
        for(let i=0;i<data.length;i++)
        {
            var dict ={};
            if((data[i]["name"]["common"]).startsWith(k))
            {
                
                let flgnm=data[i]["flags"]["png"];
                let ctrynm = data[i]["name"]["common"];
                let mplnk= data[i]["maps"]["googleMaps"];
                let cca3 = data[i]["cca3"];
                let tzonee = data[i]["timezones"][0]
                console.log(cca3)
                let detlink = "detail.html?country="+cca3;
                all_code += `
                
                <div class="car" id="card">
                    <div id="picdiv">
                        <img class="cpic" src="`+flgnm+`" alt="Country Flag">
                    </div>
                    <div class="ctrydet">
                        <h2>&nbsp;`+ctrynm+`</h2>
                        <h6>&nbsp;&nbsp;&nbsp;&nbsp;Currency : </h6>
                        <h6>&nbsp;&nbsp;&nbsp;&nbsp;Date and Time : `+date_time(tzonee)+`</h6>
                        &nbsp;&nbsp;&nbsp;
                        <button id="detbut"><a href="`+mplnk+`" target="_blank" style="text-decoration:none;">Show Map</a></button>
                        &nbsp;&nbsp;<button id="detbut" onclick="getDetail()"><a href="`+detlink+`" target="_blank" style="text-decoration:none;">Detail</a></button>
                    </div>
                </div>
                <br>
                `
                flag=1;
                document.getElementById("search-result").innerHTML = all_code;
            }
        }
        console.log(all_code);
        console.log(dict)
        if(flag==0)
        {
            document.getElementById("search-result").innerHTML= "<h2>Search Not Found!</h2>"
            // console.log("Fail")
        }
    })
}