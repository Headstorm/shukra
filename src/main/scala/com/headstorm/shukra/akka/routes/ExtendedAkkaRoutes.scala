package com.headstorm.shukra.akka.routes

import akka.cluster.sharding.ClusterSharding
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.management.scaladsl.{ManagementRouteProvider, ManagementRouteProviderSettings}

class ExtendedAkkaRoutes extends ManagementRouteProvider with ExtendedAkkaRoutesProtocol {

  private def routeGetShardNames(settings: ManagementRouteProviderSettings): Route = {
    get {
      extractActorSystem { implicit system =>
        complete {
          system
          val shardNames = ClusterSharding(system).shardTypeNames
          ShardNames(shardNames)
        }
      }
    }
  }

  override def routes(settings: ManagementRouteProviderSettings): Route = {
    concat(
      pathPrefix("extended" / "shardnames") {
        concat(
          pathEndOrSingleSlash {
            routeGetShardNames(settings)
          }
        )
      }
    )
  }
}
