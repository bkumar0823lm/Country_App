
    let arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let dobj = new Date();
    let d = dobj.getDate();
    let dord = 'th';
    if(d%10 ==1 && d%100!=11)
    {
        dord = "st";
    }
    else if (d%10==2 && d%100!=12)
    {
        dord ="nd";
    }
    else if (d%10==2 && d%100!=13)
    {
        dord = "rd";
    }
    let st="&nbsp;&nbsp;&nbsp;&nbsp;Current date and time: ";
    let m = dobj.getMonth();
    let y = dobj.getFullYear();
    let ti = dobj.getHours()
    let hr ;
    let ampm = hr>=12 ? "PM" : "AM";
    if (ti>12)
    {
        ti=ti-12;
    }
    let mi = dobj.getMinutes();
    let va="";
    if(mi<10)
    {
        va = st + d+ dord + " "+ arr[m] + ", "+ ti+": 0"+mi +" "+ ampm;
    }
    else
    {
        va = st + d+ dord + " "+ arr[m] + ", "+ ti+":"+mi +" "+ ampm; 
    }
    document.getElementById("afghdt").innerHTML=va;
    document.getElementById("alanddt").innerHTML=va;
    document.getElementById("albadt").innerHTML=va;
    document.getElementById("algedt").innerHTML=va;
    