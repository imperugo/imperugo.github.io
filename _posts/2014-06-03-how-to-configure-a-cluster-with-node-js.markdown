---
layout: post
title: "How to configure a cluster with Node Js"
description: "This tutorial explains how to have an instance of node for each CPU, thereby taking advantage of the recent hardware."
date: 2014-06-03
comments: true
imagePath: /assets/2014/06/NodeCluster.png
categories:
- NodeJs
tags:
- node
- nodejs
- cluster
---

In the last period I'm working a lot with [Node JS](http://nodejs.org/) and, for a developer like me who loves C# and .NET, I'm still not sure I really love Node :confused:

The first impression is positive but I don't know if it's just because I'm playing with something new or if I really like the approach; however, for the moment, now I'm happy with it.

This friday I was explaining my experience with Node to my colleague speaking about the differences between Node and .NET.

From my point of view the biggest difference among .NET and Node is the async implementation. The first one is **MTA (multi thread application)** and the second one is **STA (single thread application)**.

STA means you can't open a thread to execute something so your application can manage only one request per time.

Ok, that's **absolutely fault** because Node is smart :smile:

It's true that Node is STA but it is async by default, in fact when you do something that goes outside of your application (database query, I/O, web request and so on) Node uses the thread to do other stuff like answer to another request, execute other code in you application and so on.

That means Node is really really optimised, in fact the performance among .NET and Node JS are very similar and, in several case, Node is faster than .NET.

But how to increase the number of process with Node so that you can have a good scaling system?

In the .NET world you can find something similar is ASP.NET (hosted on IIS) and it's called "[web garden](http://stackoverflow.com/questions/5155684/iis-and-web-garden-configuration)", in Node instead it's called Cluster.
Basically there are more than one active process and a "manager".

In that scenario you can use one process for each core of you computer, so your Node application can scale better with you hardware.

Basically it's like running 'node app.js' for each core you have, and another process to manage them all.

First step, install some packages:

```bash
npm install cluster --save
```

The goal of this example is to create one process for each core, so the first thing to do is to read the number of cores installed on your laptop:

```javascript
var cluster = require('cluster');

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log(cluster.workers[id].process.pid);
  });
}
```

>```cluster.isMaster``` is necessary to be sure that you are forking it just one time.

Now if you run the app you should have one process for each core, plus the master

![image]({{ site.url }}/assets/2014/06/NodeCluster.png)

>In my case I've 8 core, so 9 process because of master.

The next step is to add a webserver, so

```console
npm install http --save
```
and put your logic for each fork:

```javascript
var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log(cluster.workers[id].process.pid);
  });
} else{

  // Create HTTP server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("This answer comes from the process " + process.pid);

  }).listen(8080);
}
```

Now calling the webserver you can see which process is answering your request:

![image]({{ site.url}}/assets/2014/06/NodeClusterBrowserAnswer.png)

Because the code is too simple, probably you'll get the same 'pid' for each request from your browser. The easier way to test it is to lock the thread (yes, I said that) so the "balancer" can switch the request to another process demonstrating the cluster.

In Node there isn't something like Thread.Sleep, so the best way to lock a thread is create something that keeps it busy, something like an infinite loop :smirk:

```javascript
var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log(cluster.workers[id].process.pid);
  });
} else{

  // Create HTTP server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("This answer comes from the process " + process.pid);

    //that's just for example
    while(true){

    }

  }).listen(8080);
}
```

If you want to manage all the processes and to log some events, it could be helpful to track some events for each process and to send a message from the "worker" to the "master" or to check when a process dies.

To do that it's necessary to use ```message``` event on the worker, so here's the code:

```javascript
var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {

  console.log("Master pid: " + process.pid);

  var numberOfRequests = 0;

  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log('creating process with id = ' + cluster.workers[id].process.pid);

    //getting message
    cluster.workers[id].on('message', function messageHandler(msg) {
      if (msg.cmd && msg.cmd == 'notifyRequest') {
        numberOfRequests += 1;
      }

      console.log("Getting message from process : ", msg.procId);
    });

    //Getting worker online
    cluster.workers[id].on('online', function online()
    {
      console.log("Worker pid: " + cluster.workers[id].process.pid + " is online");
    });

    //printing the listening port
    cluster.workers[id].on('listening', function online(address)
    {
      console.log("Listening on port + " , address.port);
    });

    //Catching errors
    cluster.workers[id].on('exit', function(code, signal) {
      if( signal ) {
        console.log("worker was killed by signal: "+signal);
      } else if( code !== 0 ) {
        console.log("worker exited with error code: "+code);
      } else {
        console.log("worker success!");
      }
    });
  });

  //Printing number of requests
  setInterval(function(){
    console.log("Handled " + numberOfRequests + " requests");
  }, 3000);

} else {

  // Create HTTP server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("This answer comes from the process " + process.pid);

    console.log("Message sent from http server");

    // Notify master about the request
    process.send({ cmd: 'notifyRequest', procId : process.pid });


  }).listen(8080);
}
```
I've created a repository on github with some demos about Node.js (including this one). You can find the repository [here](https://github.com/imperugo/NodeJs-Sample).

Have fun.
