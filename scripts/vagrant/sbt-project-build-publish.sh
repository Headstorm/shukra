# Build and publish image to local docker
echo "Building and Publishing SBT Project..."
cd /vagrant || exit
sbt clean
sbt docker:publishLocal