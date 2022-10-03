# parser-rss

#### Main responsibilities:

- parses the posts
- adds new posts to database
- adds/remove/update posts


## Containerized Node API and React APP, created docker-compose to connect them
A project that runs a Node server and a react app via two separate containers, using Docker Compose.

For development, the ```parser-rss-api/``` and ```parser-rss-ui/``` directories have their own docker containers, which are configured via the docker-compose.yml file.


The client server is spun up at ```localhost:3000``` and it proxies internally to the server using the linked name as ```server:8080```.

#### Clone the repository

```bash
git clone git@github.com:iraand/parser-rss.git
cd parser-rss
```
####  Install npm dependencies
Docker Compose should be installed. Documentation https://docs.docker.com/compose/install/.
You should be able to run the following and see version information.

```bash
docker compose version
```
Run the container:

```bash
docker container run -d nginx
```
From root folder where the docker-compose.yml file is start up containers by running: 

```bash
make run-dev
```
See the app stack in browser:

```bash
 http://localhost:8888/
``` 

To stop containers run:

```bash
make stop
```