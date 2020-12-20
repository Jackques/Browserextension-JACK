Browserextension-JACK

How to get the data:
0. Bare-bones structure of the app

1. [DONE] Get each 'pipeline-node-???'.
1a. [80%] Get all instances of "result:" on your page, then get for each of them their respective containers and list their seperate classes AND list their seperate testcase names!. Each node before that will most likely contain the individual test cases. This makes search perations MUCH easier and less data intesive. 
Structure object like this: containers/nodes > testsuite/file >  testcasesgroup (each 'Results') > individual test succeeded/failed & details
    [OPTIONAL]: put these classes one after another (seperate method, maybe for futurte inplementation)

2. [50%] Extract the data i need;
    [100%] test failed / test succeeded, 
    reason failed, 
    [100%] amount of tests, 
    [100%] amount passed/failed, 
    [100%] pending, 
    [100%] skipped,
    [100%] duration,
    spec ran (url)
    and put in an object. 

3. Test this for Hub tests too! And look for others tests like this? Try it on different Rules tests..

4. Display data, 
    inplement bootstrap, 
    show each testsuite/file (accordion headers), 
    show each testcasegroup inside (another accordion with headers), 
    show each individualtest inside. 
    Easy methods to expand all/close all for each testsuite/file & group

5. Prevent user from trying to read page while page DOM is still loading