package com.headstorm.shukra.akkamgt.helper

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

final case class ShardNames(names: Set[String])

trait ExtendedAkkaRoutesProtocol extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val shardNamesFormat: RootJsonFormat[ShardNames] = jsonFormat1(ShardNames)
}
