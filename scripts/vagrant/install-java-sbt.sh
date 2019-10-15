# Installing Commons
echo "Installing Commons..."
apt-get install -y software-properties-common

# Installing Java
echo "Installing Java..."
add-apt-repository ppa:openjdk-r/ppa
apt-get update
apt-get install -y openjdk-8-jdk
echo "Setting JAVA_HOME..."
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> /home/vagrant/.bashrc

# Installing SBT
echo "Installing SBT..."
apt-get install -y curl
echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add
apt-get update
apt-get install -y --assume-yes sbt