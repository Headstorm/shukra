<img align="left" width="150" height="200" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Shukra_graha.JPG">

# Shukra #

Akka actor visualization and management tool for local and distributed actor systems

Shukra relies on [akka-management](https://doc.akka.io/docs/akka-management/current/akka-management.html) which exposes 
http APIs

<br>
<br>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download and install the latest version of [Vagrant](https://www.vagrantup.com/downloads.html) to spin up a sample akka cluster (Shukra Backend). 
Download and install the latest version of [Node.js and NPM](https://nodejs.org/en/download/) to install and start the Shukra UI.

### Installing

Back end:

Use the command below to start a sample akka docker cluster.

```
vagrant up
```

This will create 3 nodes, a seed and two regular nodes, called seed, c1, and c2 respectively (unless changed in ```docker-compose.yml```). While running, try opening a new terminal and try things like ```docker-compose stop seed``` and watch the cluster nodes respond.

This also starts [Akka Management](https://doc.akka.io/docs/akka-management/current/cluster-http-management.html) on the seed node with the endpoint http://localhost:8402/ShukraManager, unless changed in the ```application.conf``` file. 

Front end:

Use the command below to install the dependencies for Shukra UI.

```npm install```

Use the command below to start the Shukra UI.

```npm start```

## Built With

* [Scala](https://docs.scala-lang.org/?_ga=2.243112642.1950037817.1572011844-746476698.1572011844) - Back end programming language
* [SBT](https://www.scala-sbt.org/1.x/docs/) - Back end build tool
* [Akka](https://akka.io/docs/) - Actor system framework
* [React](https://akka.io/docs/) - Front end JavaScript library

## Authors

* **Karthik Pasagada** - *Initial work* - [kpasagada](https://github.com/kpasagada)

See also the list of [contributors](https://github.com/Headstorm/shukra/graphs/contributors) who participated in this project.

## Acknowledgments

* Thanks to [akka-docker-cluster-example](https://github.com/akka/akka-sample-cluster-docker-compose-scala) for initial akka cluster setup.


