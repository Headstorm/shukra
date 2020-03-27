package com.headstorm.shukra.akka.routes

import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.management.scaladsl.{ManagementRouteProvider, ManagementRouteProviderSettings}

class ExtendedAkkaRoutes extends ManagementRouteProvider {
  override def routes(settings: ManagementRouteProviderSettings): Route = {
    path("hello") {
      get {
        complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Say hello to akka-http</h1>"))
      }
    }
  }
}
