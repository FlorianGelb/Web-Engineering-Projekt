<html>
<body>
<?php
        $file = 'stammbaum.xml'; 

        
        $name = $_GET["json"];
        $name = json_decode($name);
       
        
        $xml = simplexml_load_file($file);

       generate_person($name);

       function get_family_by_id($id){
        global $xml;
        foreach($xml->familie as $fam){
            if($xml->Person[0]["id"] == $id){
                return($fam);
            }
            
        }
       }
       

       function get_person_by_id($id){
            global $xml;
                foreach($xml->Person as $pers){
                if($pers->attributes()[9] == $id){
                    return $pers;
                }
            }
        
        }

        function write_to_xml($tag, $person){
            $pers = $tag->addChild('Person');
            $pers->addAttribute('vorname', $person->vname);
            $pers->addAttribute('nachname', $person->nname);
            $pers->addAttribute('geschlecht', $person->gschlecht);
            $pers->addAttribute('geburtsdatum', $person->geburtsdat);
            $pers->addAttribute('geburtsort', $person->gebort);
            $pers->addAttribute('todesdatum', $person->todesdat);
            $pers->addAttribute('ehepartner', $person->ehepartnr);
            $pers->addAttribute('mutter', $person->mttr);
            $pers->addAttribute('vater', $person->vtr);
            $pers->addAttribute('id', $person->ID);

        }

        function check_if_exists($person){
            global $xml;
            if(get_person_by_id($person->ID) != NULL){
                return true;
            }

                $empty = true;
                foreach(array_slice(get_object_vars ($person), 0, 8) as $entry)
                {
                    $empty = ($empty and $entry == "");
                }
            if($empty){
                return true;                
            }

                foreach($xml->Person as $pers){
                    $status = true;
                    $pers_slice = array_slice(get_object_vars ($pers)["@attributes"], 0, 9);
                    $person_slice = array_slice(get_object_vars ($person), 0, 9);
                    $status = ($status and $pers_slice["vorname"] == $person_slice["vname"]);
                    $status = ($status and $pers_slice["nachname"] == $person_slice["nname"]);
                    $status = ($status and $pers_slice["geschlecht"] == $person_slice["gschlecht"]);
                    $status = ($status and $pers_slice["geburtsdatum"] == $person_slice["geburtsdat"]);
                    $status = ($status and $pers_slice["geburtsort"] == $person_slice["gebort"]);
                    $status = ($status and $pers_slice["todesdatum"] == $person_slice["todesdat"]);
                    $status = ($status and $pers_slice["ehepartner"] == $person_slice["ehepartnr"]);
                    $status = ($status and $pers_slice["mutter"] == $person_slice["mttr"]);
                    $status = ($status and $pers_slice["vater"] == $person_slice["vtr"]);
                    
                    if($status){
                        return $status;
                    }
                   
            }
        
        return false;

        }
        

        function generate_person($person){
            global $file;
            global $xml;
            
            if(check_if_exists($person)){
                return;
            }
            
            write_to_xml($xml, $person);

            $xml->asXML($file);            
        }
?>

</body>
</html>