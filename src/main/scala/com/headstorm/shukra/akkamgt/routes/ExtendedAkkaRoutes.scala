package com.headstorm.shukra.akkamgt.routes

import akka.cluster.sharding.ShardRegion.GetClusterShardingStats
import akka.cluster.sharding.{ClusterSharding, ShardCoordinator}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.management.scaladsl.{ManagementRouteProvider, ManagementRouteProviderSettings}
import com.headstorm.shukra.akkamgt.helper.{ExtendedAkkaRoutesProtocol, ShardNames}

class ExtendedAkkaRoutes extends ManagementRouteProvider with ExtendedAkkaRoutesProtocol {

  private def routeGetShardNames(settings: ManagementRouteProviderSettings): Route = {
    get {
      extractActorSystem { implicit system =>
        complete {
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
