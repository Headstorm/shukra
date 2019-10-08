#!/bin/bash

set -x

sbt docker:publishLocal

docker-compose up -d

docker logs shukra_seed_1

for i in {1..10}
do
  echo "Checking for MemberUp logging..."
  docker logs shukra_seed_1 | grep "Member is Up" | wc -l || true
  # shellcheck disable=SC2046
  [ `docker logs shukra_seed_1 | grep "Member is Up" | wc -l` -eq 3 ] && break
  sleep 4
done

if [ $i -eq 10 ]
then
  echo "No 3 MemberUp log events found:"
  docker logs shukra_seed_1
  # shellcheck disable=SC2242
  exit -1
fi
