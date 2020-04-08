package com.headstorm.shukra.cluster

import com.typesafe.config.ConfigFactory

object ClusteringConfig {
  private val config = ConfigFactory.load()

  val clusterName = config.getString("clustering.cluster.name")
  val clusterAkkaManagementEnabled = config.getString("clustering.akka.management.enabled")
}
