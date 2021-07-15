
   const a = document.getElementsByTagName("a");
   const contact = document.getElementsByClassName("contact");
   const team = document.getElementsByClassName("team");
   const stammbaum = document.getElementsByClassName("stammbaum");
   const copyright = document.getElementsByClassName("copyright");


function greyTheme() {

    var css = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #f1f1f1 }';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
       
        a[i].style.color = "black";
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

      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "grey";
        copyright[i].style.color = "black";
      }
     
      document.getElementById("templateNav").style.backgroundColor = "lightgrey";
      document.getElementById("templateActive").style.backgroundColor = "grey";
      document.getElementById("dropbtn").style.color = "black";
      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "lightgrey";
   
    }


    
    function lightgreenTheme() {

      var ts = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #d0f5e5 }';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(ts));
      document.getElementsByTagName('head')[0].appendChild(style);

      for (var i = 0; i< a.length; i++) {
       
       a[i].style.color = "black";
     }
    
      for (var i = 0; i< copyright.length; i++) {
        copyright[i].style.backgroundColor = "#b3c7be";
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
      document.getElementById("templateNav").style.backgroundColor = "#aaf0d1";
      document.getElementById("templateActive").style.backgroundColor = "#b3c7be";
      document.getElementById("dropbtn").style.color = "black";
      document.getElementsByClassName("footer-container")[0].style.backgroundColor = "#aaf0d1";
     
    }

    function greyThemeImpressum() {

      var css = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #f1f1f1 }';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(style);
  
      for (var i = 0; i< a.length; i++) {
       
        a[i].style.color = "black";
      }
  
  
      
       
        document.getElementById("templateNav").style.backgroundColor = "lightgrey";
        document.getElementById("templateActive").style.backgroundColor = "grey";
        document.getElementById("dropbtn").style.color = "black";
      
     
      }

      function lightgreenThemeImpressum() {

        var ts = '.navbar a:hover, .dropdown:hover .dropbtn { background-color: #d0f5e5 }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(ts));
        document.getElementsByTagName('head')[0].appendChild(style);
  
        for (var i = 0; i< a.length; i++) {
       
          a[i].style.color = "black";
        }
      
      
        document.getElementById("templateNav").style.backgroundColor = "#aaf0d1";
        document.getElementById("templateActive").style.backgroundColor = "#b3c7be";
        document.getElementById("dropbtn").style.color = "black";
       
       
      }

