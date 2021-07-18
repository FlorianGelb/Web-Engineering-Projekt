import json
import requests

dummy_json_case_1 = '{"vname":"test","gschlecht":"männlich","nname":"test","mttr":"","vtr":"","ehepartnr":"","gebort":"ffasdf","geburtsdat":"2021-07-13","todesdat":"2021-07-14","ID":1626628728068}'
dummy_json_case_2 = '{"vname":"test","gschlecht":"männlich","nname":"test","mttr":"","vtr":"","ehepartnr":"300","gebort":"ffasdf","geburtsdat":"2021-07-13","todesdat":"2021-07-14","ID":1626628728068}'
dummy_json_case_3 = '{"vname":"test","gschlecht":"männlich","nname":"test","mttr":"100","vtr":"","ehepartnr":"","gebort":"ffasdf","geburtsdat":"2021-07-13","todesdat":"2021-07-14","ID":1626628728068}'
dummy_json_case_4 = '{"vname":"test","gschlecht":"männlich","nname":"test","mttr":"","vtr":"100","ehepartnr":"","gebort":"ffasdf","geburtsdat":"2021-07-13","todesdat":"2021-07-14","ID":1626628728068}'
dummy_json = '{"vname":"test","gschlecht":"männlich","nname":"test","mttr":"16","vtr":"21","ehepartnr":"17","gebort":"ffasdf","geburtsdat":"2021-07-13","todesdat":"2021-07-14","ID":1626628728068}'


response = requests.get('http://127.0.0.1:1111/test.php/?json={}'.format(dummy_json_case_4))



print(response.text)