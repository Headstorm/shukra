name := "shukra"

/* scala versions and options */
scalaVersion := "2.13.1"

// These options will be used for *all* versions.
scalacOptions ++= Seq(
  "-deprecation",
  "-unchecked",
  "-encoding", "UTF-8",
  "-Xlint",
)

val akka = "2.6.0"
val akkaMngt = "1.0.3"

/* dependencies */
libraryDependencies ++= Seq (
  // -- Logging --
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  // -- Akka --
  "com.typesafe.akka" %% "akka-actor-typed" % akka,
  "com.typesafe.akka" %% "akka-slf4j"   % akka,
  "com.typesafe.akka" %% "akka-cluster-typed" % akka,
  "com.typesafe.akka" %% "akka-discovery" % akka,
  "com.typesafe.akka" %% "akka-persistence" % akka,
  "com.typesafe.akka" %% "akka-cluster-sharding" % akka,
  "com.typesafe.akka" %% "akka-protobuf" % akka,
  "com.typesafe.akka" %% "akka-actor-testkit-typed" % akka % "test",
  // -- Akka Management --
  "com.lightbend.akka.management" %% "akka-management" % akkaMngt,
  "com.lightbend.akka.management" %% "akka-management-cluster-http" % akkaMngt
)

import com.typesafe.sbt.packager.docker.DockerPlugin

enablePlugins(com.typesafe.sbt.packager.docker.DockerPlugin)
version in Docker := "latest"
dockerExposedPorts in Docker := Seq(1600)
packageName in Docker := "headstorm/shukra"
dockerBaseImage := "java"
enablePlugins(JavaAppPackaging)
