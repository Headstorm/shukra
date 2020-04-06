<img align="left" width="350" height="150" src="frontend/public/logo.png">

# Shukra #

Shukra is an Akka cluster visualization and management dashboard for inspecting local and remote Akka clusters. 

Shukra is lovingly developed by Headstorm's Open Source group. Please reach out to us at: opensource@headstorm.com

![image](https://user-images.githubusercontent.com/915955/78514456-0eb86300-7777-11ea-85df-b6bdd4563fd7.png)

Shukra relies on [akka-management](https://doc.akka.io/docs/akka-management/current/akka-management.html) which exposes an HTTP interface to interact with an Akka cluster.

## Production Usage Instructions

These instructions guide you through the process to run Shukra in a production environment.

### Generate Production Build

* Set `homepage` property in `package.json` file to reflect the deployment URL of the server. For example, `"homepage": "http://localhost:8080/shukra"`. 
* Use the command `npm run build` (uses create react app `react-scripts build` internally) to generate a production build to serve it with a static server.
* The `build` folder contains files that are ready to be deployed. 
* Refer to https://create-react-app.dev/docs/production-build or https://reactjs.org/docs/optimizing-performance.html for more information on generating production ready builds.

### Deploy Production Build

* Move the files created in the `build` folder to a static server. Do not change the folder structure.
* Follow instructions in the **Configuration** section below to modify the Akka Management URL.

## Development Usage Instructions

The following instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download and install the latest version of [Vagrant](https://www.vagrantup.com/downloads.html) to spin up a sample Akka cluster (Shukra Backend). 
Download and install the latest version of [Node.js and NPM](https://nodejs.org/en/download/) to install and start the Shukra UI.

### Installation

#### Back end:

Use the command below to start a sample Akka Docker cluster.
```
vagrant up
```

This will create 3 nodes, a seed and two regular nodes, called seed, c1, and c2 respectively (unless changed in ```docker-compose.yml```). While running, try opening a new terminal and try things like ```docker-compose stop seed``` and watch the cluster nodes respond.

This also starts Akka Management on the seed node with the endpoint `http://localhost:8402/ShukraCluster`, unless changed in the ```application.conf``` file. 

#### Front end:

Navigate to the `frontend` folder and use the command below to install the dependencies for Shukra UI.
```
npm install
```

Use the command below to start the Shukra UI.
```
npm start
```

### Configuration

#### Back end:

Akka Management for a member is disabled by default.

In order to enable Akka Management for a member, set `AKKA_MANAGEMENT_ENABLE: enabled` property under `environment` section in `docker-compose.yml`.

Specify the `AKKA_MANAGEMENT_PORT: <port-number>` property to change the Akka Management HTTP endpoint port.

Properties `SEED_PORT_1600_TCP_ADDR` and `SEED_PORT_1600_TCP_PORT` can be used to modify the seed node for a member.

#### Front end:

By default, Shukra UI points to the Akka HTTP URL `http://localhost:8402/ShukraCluster`.

For local development or testing, change the `proxy` property in `package.json` to the Akka Management Host HTTP server address and change the `akka.management.url` property in `public/akkaClusterProps.json` to the Akka Management Host HTTP base path. The `proxy` property is used to set up reverse proxy to avoid CORS issue on local environments. 

For production, change the `akka.management.url` property in `public/akkaClusterProps.json` to the entire Akka Management URL, i.e., Akka Management HTTP address + base path.

## Built With

* [Scala](https://docs.scala-lang.org/?_ga=2.243112642.1950037817.1572011844-746476698.1572011844) - Back end programming language
* [SBT](https://www.scala-sbt.org/1.x/docs/) - Back end build tool
* [Akka](https://akka.io/docs/) - Actor system framework
* [React](https://akka.io/docs/) - Front end JavaScript library

## Contributing

1. Fork it (<https://github.com/Headstorm/shukra/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors

* **Karthik Pasagada** - [kpasagada](https://github.com/kpasagada)

See also the list of [contributors](https://github.com/Headstorm/shukra/graphs/contributors) who participated in this project.

## Acknowledgments

* Thanks to [akka-docker-cluster-example](https://github.com/akka/akka-sample-cluster-docker-compose-scala) for initial akka cluster setup.

## Read More

https://github.com/Headstorm/shukra/wiki/Shukra

## Meta

Distributed under the Apache 2 license. See [LICENSE](LICENSE) for more information.
