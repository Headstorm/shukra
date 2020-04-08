package com.headstorm.shukra.akkamgt.helper

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

final case class ShardNames(names: Set[String])
final case class ErrorMessage(message: String)

trait ExtendedAkkaRoutesProtocol extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val shardNamesFormat: RootJsonFormat[ShardNames] = jsonFormat1(ShardNames)
  implicit val clusterMemberMessageFormat: RootJsonFormat[ErrorMessage] =
    jsonFormat1(ErrorMessage)
}
