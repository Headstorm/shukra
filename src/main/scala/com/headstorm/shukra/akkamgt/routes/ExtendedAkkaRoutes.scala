package com.headstorm.shukra.akkamgt.routes

import akka.cluster.sharding.ClusterSharding
import akka.http.scaladsl.model.{HttpEntity, StatusCodes}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.management.scaladsl.{ManagementRouteProvider, ManagementRouteProviderSettings}
import akka.pattern.AskTimeoutException
import akka.util.Timeout
import com.headstorm.shukra.akkamgt.helper.{ErrorMessage, ExtendedAkkaRoutesProtocol, ShardNames}
import scala.concurrent.duration._

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

  private def routeGetClusterShards(settings: ManagementRouteProviderSettings): Route = {
    get {
      extractActorSystem { implicit system =>
        extractExecutionContext { implicit executor =>
          complete {
            implicit val timeout: Timeout = Timeout(5.seconds)
            try {
              val sharding = ClusterSharding(system)
              val shardRegionName = sharding.shardTypeNames.toList.head
              sharding
                .shardRegion(shardRegionName)
              HttpEntity("helloclustershards")
            }
            catch {
              case _: AskTimeoutException =>
                StatusCodes.NotFound -> ErrorMessage(
                  s"Shard Region not responding, may have been terminated")
              case _: IllegalArgumentException =>
                StatusCodes.NotFound -> ErrorMessage(s"Shard Region is not started")
            }
          }
        }
      }
    }
  }

  override def routes(settings: ManagementRouteProviderSettings): Route = {
    concat(
      pathPrefix("extended" ) {
        concat(
          pathPrefix("shardnames") {
            concat(
              pathEndOrSingleSlash {
                routeGetShardNames(settings)
              }
            )
          },
          pathPrefix("clustershards") {
            concat(
              pathEndOrSingleSlash {
                routeGetClusterShards(settings)
              }
            )
          }
        )
      }
    )
  }
}
