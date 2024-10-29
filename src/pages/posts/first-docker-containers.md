---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Getting Started with Docker"
pubDate: 2024-10-27
description: "Spinning up your first Docker containers"
authors: ["Andrew Flores"]
# image:
#     url: 'https://docs.astro.build/assets/rose.webp'
#     alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["docker", "tutorial"]
---

Docker has fundamentally changed the way I install applications and services on my computer and every other machine that I use as a server.

Docker allows you to essentially install, update, and manage services without cluttering up your computer by installing a bunch of software dependencies that bloat your filesystem.
The ease of use and organized nature of self-contained Docker containers is what draws me away from installing programs the way I have my entire life.

## What is a service?

In order to provide some background clarity on why Docker makes your life easier, let me first define the term 'service'.
A service is simply a program that runs on your computer in the background. Your computer has many services that start up when you turn on your computer, then stay running in order to serve their function in the larger operating system.
Docker has made it incredibly easy for me to install, or 'spin-up' new containers, each with their own primary piece of software installed inside of it, so that now I have been able to try out tons of software that I never would have otherwise, because it would just be too much work to install them manually.

### How does a container work?

Conceptually, you can think of containers as very lightweight virtual machines. It's like having a tiny linux operating system running inside of _your_ computer. Each container is typically designed to serve one specific purpose and that is to run a single program as a service. If you want multiple services, you can either spin up multiple containers, or even build your own docker container 'image' with the exact software configuration you need.
People create their own images all the time, and then upload the image file to a cloud registry like [docker hub](https://hub.docker.com), where anybody can pull that image to their own computer and spin up a container from it. Any container created from an image will have the exact same configuration as the creator had when they built it.

This is why Docker is so powerful. You just let the software developers create images with the software that you want, then spin up a container and start using it immediately. Very little configuration needed

### Spinning up a container

Well with that background out of the way, lets get our first container spun up! As you might notice, I am using a Linux operating system called Uboontu, or Ubuntu. Your operating system doesn't matter very much, as long as you are able to install Docker to the point where you can open up a terminal or command prompt and type "docker ps" and it doesn't tell you that the command is unknown. I will circle back to installing Docker in a couple minutes, but I am just excited to show you how simple it is to spin up a brand new container. If the command doesn't fail, you will see all of your currently running containers, which, at this point, should be nothing.

The very first container I always choose after setting up a new computer or server is Portainer. I'll show you why portainer is so special once we run this command.
This is called a 'Docker run' command, and it can get quite long if you have a lot of configuration settings you want to pass to the new container.
Writing the command in a text editor before pasting it in your terminal is usually a good idea so you can click around and edit lines easily.
The backslashes (\) are only for readability purposes so you can omit these and just type the command in one line.

As a quick breakdown of what's happening here, we are constructing a docker run command, with the first flag `-d`. This allows the command to continue running in the background even after you close the terminal window.
`-p 9000:9000` maps which port the service is running on inside of the container to which port the service will be exposed to on your host machine. The left side of the colon is your host machine's port, and the right side is the container's port. Do not change the container's port since the image creator has already decided that 9000 is the port they want it to run on.
`--name portainer` assigns the container a human-readable name so we can easily identify it down the line.
`--restart=always` Tells the container to restart itself automatically if you manually stop it or reboot your computer
`-v` defines a volume. There are two parts to defining a volume, separated by a colon (:). The left side of the colon is the file path on your host computer. The right side is the file path inside of the container. In most cases if you found the command online, you do not want to change the path inside the container because it's pointing to something important and we do not have the freedom to choose the location of it. Volumes typically work bidirectionally: meaning that the same file will be synchronized back and forth on your host machine and inside of the container. This first volume declaration points to the docker socket on our host machine and gives the container access to it. The second volume will store all of Portainer's configuration data when you make changes inside of its user intrerface. This data folder is pointing to our current directory in a folder called `data`.
`portainer/portainer-ce:latest` is the name of the docker image. By default, Docker searches Docker Hub for an image tagged with this name and pulls it down to your computer if you haven't pulled it down before.

```bash
docker run -d \
        -p 9000:9000 \
        --name portainer \
        --restart=always \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v ./data:/data \
        portainer/portainer-ce:latest
```

Hit `Enter` and the image should begin pulling down to your computer! Once the service is started, you can double check by running `docker ps` again. Now there should be an entry with the name 'Portainer'! The port listed should be 9000, and you can interact with its interface by opening a browser and going to `localhost:9000`. Congratulations! You have spun up your first Docker container!

As I said earlier, Portainer is always my first container on a new computer because it allows me to easily start and manage any subsequent containers all in one place. To start using it, create an administrator account with a username and password, and you'll be landed on the home page. Set up the default environment by clicking _these buttons_, then enter that environment.

### Second container docker-compose Nginx

Now, to spin up your second container, we're going to get rid of the long `docker run` command that we ran earlier and instead use docker-compose. Portainer has a super easy way to create compose files. Click Stacks, and Add Stack. Give it a name 'nginx'. Then in the Web Editor box, copy these lines in.

First, we define which compose version we are using. You'll see different versions used here for different containers, and I really don't think it matters which one you use.
Then we will define our service, which in our case we will only have one.
Tell it which nginx image to pull from Docker Hub
Give the container a human-readable name
Tell the container to restart any time our computer restarts
Define which ports to listen on. This will expose the nginx web server on port 80 on our machine
Define a volume where you would put your html files if you actually wanted to use this to host a website. This is pointing to a folder in my root directory called `config` which I always use to hold the data of each of my containers. This container is called nginx, and there is a folder called html inside that the container will watch for updates to whichever files you put in there.

```yaml
version: "3"

services:
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    ports:
      - 80:80
    volumes:
      - /config/nginx/html:/usr/share/nginx/html
```

Once the commands are written, you can 'Deploy the stack' which will pull down the nginx image and spin up the container. Once it is successfully up, you can verify in your terminal by running `docker ps`, then go to your web browser at `localhost:80`. A unique thing to note is that port 80 will disappear from the URL because all URLs point to port 80 by default if a different port is not specified.

I recommend you always use docker compose files (or Portainer stacks) to initialize new containers. It is a static text file that you don't need to store in another file just to copy and paste when you want to start the container again. You can easily edit properties and redeploy with your updates.

### Wrapping up Portainer

There is quite a bit more to Portainer, and I recommend that you get this running on your own and spin up some containers! It is very easy to find docker compose files online, even for services that you never knew you needed! If for some reason, you're only able to find docker run commands for your service online, you can just convert the command text to a compose file manually or even use an online converter. There is one linked in the description that I have used before and works fairly well.

### Conclusion

I have found it is always best to change and upgrade things incrementally when using Docker.
Each time I try to run a big compose file that I find online, I always encounter issues because I don't understand the way it works.
If possible, always spin up a container with the absolute bare minimum configuration. No bells and whistles, just get it running so you're able to make sure it's running by visiting its web interface if there is one.
Then, stop the container, add a thing or two to get closer to the fully functional version that you originally found online.
Doing it this way ensures that you don't go down a bunch of irrelevant rabbit holes when, in reality, the root cause is much simpler or higher level.

You could even put all these commands and files on a flash drive or store them in google drive and be able to set up a new computer with the exact same services

You can start, stop, and restart these services using simple commands
It becomes addicting to spin up new containers because it is so easy to do. Eventually you'll end up with a large number of containers, likely using multiple docker-compose files or docker run commands. This is why almost everybody uses a container management service to have a nice interface to spin up and manage your Docker containers.

Portainer is the one I have always used and continue to use to this day. For that reason, it will be our first container. You can spin up portainer by using this command. You can, of course, find all these references in the video's description.

In my videos, you will almost always see me using portainer stacks for my docker containers, even if there is only one service in the file. It is easier to read in YAML format, you don't have to write down the command and execute it later because it is already saved in a standalone file, and because then I can use portainer as the central location for updating all of my stacks. I recommend you start doing it this way too until you have a solid foundation on how docker works.

Demonstration:
spin up a container using docker run
spin down the container
create a docker-compose file, highlighting the differences and similarities
spin up the compose file, and bring it back down.
Run `docker ps` and visit the web interface after each spin-up

Now set up a compose file with 2 containers, show they both work

Conclusion
I have found it is always best to change and upgrade things incrementally when using Docker.
Each time I try to run a big compose file that I find online, I always encounter issues because I don't understand the way it works.
If possible, always spin up a container with the absolute bare minimum configuration. No bells and whistles, just get it running so you're able to make sure it's running by visiting its web interface if there is one.
Then, stop the container, add a thing or two to get closer to the fully functional version that you originally found online.
Doing it this way ensures that you don't go down a bunch of irrelevant rabbit holes when, in reality, the root cause is much simpler or higher level.

#### Portainer Continued

I have multiple servers on my network, with docker containers running on each of them because that is the best way to manage services in my experience.
I always use Portainer to manage these containers, so the first container I spin up on an new machine is always Portainer.
The problem encountered here is that you will end up with multiple instances of Portainer on your network, all accessable by different web interface URLs.
Portainer offers a solution to this by adding new 'Environments'.

To allow your Portainer instance to be added as an environment on your primary server, you have to spin up a new container/stack called portainer-agent. This exposes your docker socket to a port on your machine which can be accessed by your new primary Portainer instance.

```yaml
version: "3.2"

services:
  portainer-agent:
    container_name: portainer-agent
    image: portainer/agent:2.19.4
    ports:
      - 9001:9001
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes
```

Once the agent container is running, go to your primary Portainer instance and navigate to Environments -> + Add environment -> Docker Standalone -> Start Wizard -> Agent
Here, enter a name for the server you're adding, along with its IP address and port of the Portainer instance you just configured.
Click Connect
Click Home in left pane
See the new environment!

You will not be able to configure existing stacks using this method, but you are able to create new stacks!

This method is most effective if you are configuring a brand new server with no containers yet installed.
If this is the case for you, you don't even need to create a Portainer container on your new server! Just spin up the portainer-agent and connect to it from your master Portainer instance.
From there you are able to create new stacks for all of your server that are connected.
