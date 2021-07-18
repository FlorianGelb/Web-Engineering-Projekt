<html>
<body>

<h1>Welcome to my home page!</h1>
<p>Some text.</p>
<p>Some more text.</p>
<?php
        $file = 'test.xml'; 

        
        $name = $_GET["json"];
        $name = json_decode($name);
       
        
        $xml = simplexml_load_file($file);

       generate_person($name);

       function get_family_by_id($id){
        global $xml;
        foreach($xml->familie as $fam){
            if($fam->Person[0]["id"] == $id){
                return($fam);
            }
            
        }
       }
       
       function get_person_by_id($id){
            global $xml;
            foreach($xml->familie as $fam){
                foreach($fam->Person as $pers){
                if($pers->attributes()[9] == $id){
                    //var_dump($pers);
                    return $pers;
                }
            }
        }
        }

        function write_to_xml($tag, $person, $case){
            $pers = $tag->addChild('Person');
            $pers->addAttribute('vorname', $person->vname);
            $pers->addAttribute('nachname', $person->nname);
            $pers->addAttribute('geschlecht', $person->gschlecht);
            $pers->addAttribute('geburtsdat', $person->geburtsdat);
            $pers->addAttribute('geburtsort', $person->gebort);
            $pers->addAttribute('todesdatum', $person->todesdat);
            $pers->addAttribute('ehepartner', $person->ehepartnr);
            $pers->addAttribute('mutter', $person->mttr);
            $pers->addAttribute('vater', $person->vtr);
            $pers->addAttribute('id', $person->ID);
            if($case == 0){
                $pers->addAttribute('familyId', strval(time()));
            }
            if($case == 1){
                var_dump($tag->Person[0]["familyId"]);
                $pers->addAttribute('familyId', $tag->Person[0]["familyId"]);
                }

        }
        

        function generate_person($person){
            global $file;
            global $xml;
            //if(get_person_by_id($person->ID) != NULL){
              //  return NULL;
           // }
            
            if($person->ehepartnr != "" and $person->mttr == "" and $person->vtr == ""){
                $fam = get_family_by_id($person->ehepartnr);
                write_to_xml($fam, $person, 1);

           }

           if($person->ehepartnr == "" and $person->mttr == "" and $person->vtr != ""){
            $fam = get_family_by_id($person->vtr);
            write_to_xml($fam, $person, 1);
       }
        
           if($person->ehepartnr == "" and $person->mttr != "" and $person->vtr == ""){
            $fam = get_family_by_id($person->mttr);
            write_to_xml($fam, $person, 1);

       }
          

            if($person->ehepartnr == "" and $person->mttr == "" and $person->vtr == ""){
 
                $familie = $xml->addChild('familie');
                write_to_xml($familie, $person, 0);
               /* $pers = $familie->addChild('Person');
                $pers->addAttribute('vorname', $person->vname);
                $pers->addAttribute('nachname', $person->nname);
                $pers->addAttribute('geschlecht', $person->gschlecht);
                $pers->addAttribute('geburtsdat', $person->geburtsdat);
                $pers->addAttribute('geburtsort', $person->gebort);
                $pers->addAttribute('todesdatum', $person->todesdat);
                $pers->addAttribute('ehepartner', $person->ehepartnr);
                $pers->addAttribute('mutter', $person->mttr);
                $pers->addAttribute('vater', $person->vtr);
                $pers->addAttribute('id', $person->ID);
                $pers->addAttribute('familyId', strval(time()));
                */
                
            }
            $xml->asXML($file);
        
        }


        


        
        

       

?>

</body>
</html>