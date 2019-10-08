name := "shukra"

/* scala versions and options */
scalaVersion := "2.12.7"

// These options will be used for *all* versions.
scalacOptions ++= Seq(
  "-deprecation",
  "-unchecked",
  "-encoding", "UTF-8",
  "-Xlint",
)

val akka = "2.5.25"

/* dependencies */
libraryDependencies ++= Seq (
  // -- Logging --
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  // -- Akka --
  "com.typesafe.akka" %% "akka-actor-typed" % akka,
  "com.typesafe.akka" %% "akka-slf4j"   % akka,
  "com.typesafe.akka" %% "akka-cluster-typed" % akka,
  "com.typesafe.akka" %% "akka-actor-testkit-typed" % akka % "test",
  // -- Akka Management --
  "com.lightbend.akka.management" %% "akka-management" % "1.0.3",
  "com.lightbend.akka.management" %% "akka-management-cluster-http" % "1.0.3"
)

enablePlugins(DockerPlugin)
version in Docker := "latest"
dockerExposedPorts in Docker := Seq(1600)
packageName in Docker := "headstorm/shukra"
dockerBaseImage := "java"
enablePlugins(JavaAppPackaging)
