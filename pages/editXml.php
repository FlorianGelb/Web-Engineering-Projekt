$xml = simplexml_load_string($stammbaum.xml);
$json = json_encode($xml);
$array = json_decode($json,TRUE);

echo "asdf";