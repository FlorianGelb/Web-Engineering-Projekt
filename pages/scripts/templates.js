
   const a = document.getElementsByTagName("a");
   const contact = document.getElementsByClassName("contact");
   const team = document.getElementsByClassName("team");
   const stammbaum = document.getElementsByClassName("stammbaum");
   const copyright = document.getElementsByClassName("copyright");
   const res = document.getElementsByClassName("resize");
   const link = document.getElementsByClassName("link");
   const ddc = document.getElementsByClassName("ddc");

function greyTheme() {

    var css = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #f1f1f1 }';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
        a[i].style.color = "black";
      }

      if (contact.length != 0 && stammbaum.length != 0 && copyright.length != 0 && team.length != 0) {
         for (var i = 0; i< contact.length; i++) {
        contact[i].style.color = "black";
       }
       for (var i = 0; i< team.length; i++) {
        team[i].style.color = "black";
      }
      for (var i = 0; i< stammbaum.length; i++) {
        stammbaum[i].style.color = "black";
      }
      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "grey";
        copyright[i].style.color = "black";
      }
      for (var i = 0; i< link.length; i++) {
        link[i].style.color = "#505050";
      }


      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "lightgrey";
      }


      
     
     
      document.getElementById("templateNav").style.backgroundColor = "lightgrey";
      document.getElementById("templateActive").style.backgroundColor = "grey";
      document.getElementById("dropbtn").style.color = "black";
      
   

     
      
      if (res.length != 0) {
        res[0].style.backgroundColor = "#A8A8A8";
        document.body.style.backgroundColor = "#F6F6F6";
      }
      
    }


    
    function seaTheme() {

      var ts = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #bffaff }';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(ts));
      document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
       
       a[i].style.color = "black";
     }
     
    
     if (contact.length != 0 && stammbaum.length != 0 && copyright.length != 0 && team.length != 0) {
      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "#ffe5a6";
        copyright[i].style.color = "black";
      }

      for (var i = 0; i< contact.length; i++) {
        contact[i].style.color = "black";
      }
      for (var i = 0; i< team.length; i++) {
        team[i].style.color = "black";
      }

      for (var i = 0; i< stammbaum.length; i++) {
        stammbaum[i].style.color = "black";
      }

      for (var i = 0; i< link.length; i++) {
        link[i].style.color = "#005A87";
      }

      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "#00B7D5";
    }
      document.getElementById("templateNav").style.backgroundColor = "#97F3FA";
      document.getElementById("templateActive").style.backgroundColor = "#FFEFC8";
    
      document.getElementById("dropbtn").style.color = "black";

      if (res.length != 0) {
        res[0].style.backgroundColor = "#005A87";
        document.body.style.backgroundColor = "#edfdff";
      }
 
    }


    function brownTheme() {

      var ts = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #FAF0F1 }';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(ts));
      document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
       
       a[i].style.color = "black";
     }
    
     if (contact.length != 0 && stammbaum.length != 0 && copyright.length != 0 && team.length != 0) {
      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "#5E393A";
        copyright[i].style.color = "black";
      }

      for (var i = 0; i< contact.length; i++) {
        contact[i].style.color = "black";
      }

      for (var i = 0; i< team.length; i++) {
        team[i].style.color = "black";
      }

      for (var i = 0; i< stammbaum.length; i++) {
        stammbaum[i].style.color = "black";
      }

      for (var i = 0; i< link.length; i++) {
        link[i].style.color = "#734949";
        link[i].style.fontWeight = "900";
      }

    

      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "#D9A691";
    }
      document.getElementById("templateNav").style.backgroundColor = "#D9A691";
      document.getElementById("templateActive").style.backgroundColor = "#5E393A";
      document.getElementById("dropbtn").style.color = "black";

      if (res.length != 0) {
        res[0].style.backgroundColor = "#5E393A";
        document.body.style.backgroundColor = "#ece1d9";
      }
 
    }


    function blackGreenTheme() {

      var ts = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #05593a;}';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(ts));
      document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
       
       a[i].style.color = "white";
     }

     for (var i = 0; i< ddc.length; i++) {
       
      ddc[i].style.color = "black";
    }
    
     if (contact.length != 0 && stammbaum.length != 0 && copyright.length != 0 && team.length != 0) {
      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "#292929";
        copyright[i].style.color = "white";
      }

      for (var i = 0; i< contact.length; i++) {
        contact[i].style.color = "white";
      }
      for (var i = 0; i< team.length; i++) {
        team[i].style.color = "white";
      }

      for (var i = 0; i< stammbaum.length; i++) {
        stammbaum[i].style.color = "white";
      }

      for (var i = 0; i< link.length; i++) {
        link[i].style.color = "#04aa6d";
       
      }

     
      
      document.getElementById("linkImpressum").style.color = "#04aa6d";

      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "#333333";
    }
      document.getElementById("templateNav").style.backgroundColor = "#333";
      document.getElementById("templateActive").style.backgroundColor = "#04aa6d";
      document.getElementById("dropbtn").style.color = "white";

      if (res.length != 0) {
        res[0].style.backgroundColor = "burlywood";
        document.body.style.backgroundColor = "#ebfaee";
      }
 
    }

   
      

