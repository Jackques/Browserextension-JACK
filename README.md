Browserextension-JACK

How to get the data:
0. Get each 'pipeline-node-???', then put them all together one after another. This will be your scope!
0a. The last node will most likely be the 'tests overview'
0b. Each node before that will most likely contain the individual test cases. This makes search perations MUCH easier and less data intesive. 

1. Each testsuite has a '(Run Finished)', which i can get the parent HTML node from. 
2. from there i can easily get each test (path) & result. (with some effort of finding the longest piece of text, devided by whitespaces/tabs, with a divider on the lines "----").. bloody hell that's going to be complicated AF
3. but.. once i get the texts (which i can paste together if there are multiple lines of text).. 

4.a indien de test slaagt hoef ik uiteraard niks te tonen
4.b als de test faalt.. pak de container waar de individuele test in wordt benoemd (kan ik op checken zodat ik enkel de juiste container pak),
    Vervolgens.. pak ALLE test NA " x failing" en VOOR (Results). 
    Sla alle TEXTNODES over die leeg zijn.
    Pak de tekst die je over houdt in de bootstrap accordion om netjes weer te geven als DE error

5. Stel een object op die de structuur van de tests enigzins reflecteert (object met keys welke de individuele tests zijn), inhoud wordt dus de testresultaten
    Dit object ga ik overzetten naar tab.js, daar uitlezen en daarmee de pagina opbouwen.