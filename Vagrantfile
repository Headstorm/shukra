# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

# Check to see if docker-compose plugin is already installed
# If not, the plugin is installed and you then have to rerun `vagrant up`
unless Vagrant.has_plugin?("vagrant-docker-compose")
  system("vagrant plugin install vagrant-docker-compose")
  puts "Dependencies installed. Please try the command again"
  exit
end

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/bionic64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL

  # Setting GUI and memory for vm
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false
    # Customize the amount of memory on the VM
    vb.memory = 6144
  end

  # Forwarding ports
  config.vm.network "forwarded_port", guest: 8401, host: 8401, host_ip: "127.0.0.1"

  # Install docker
  config.vm.provision "shell", inline: <<-SHELL
    echo "Installing docker..."
    apt-get update
  SHELL
  config.vm.provision :docker, preserve_order: true

  # Installing java, scala and sbt
  config.vm.provision "shell", preserve_order: true, path: "scripts/vagrant/install-java-sbt.sh"

  # Building and publishing sbt project to local docker
  config.vm.provision "shell", preserve_order: true, inline: <<-SHELL
    echo "Building and publishing sbt project"
    cd /vagrant
    sbt clean
    sbt docker:publishLocal
  SHELL

  # Docker compose
  config.vm.provision "shell", preserve_order: true, inline: <<-SHELL
    echo "Docker compose"
  SHELL
  config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", preserve_order: true, run: "always"
end
