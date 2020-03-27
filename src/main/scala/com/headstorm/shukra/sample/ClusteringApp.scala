package com.headstorm.shukra.sample

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorSystem, Behavior, Terminated}
import com.headstorm.shukra.sample.ClusteringConfig.clusterName

object ClusteringApp {

  final case class Start(name: String)

  val setup: Behavior[Start] =
    Behaviors.setup { context =>
      val clusterEventListener = context.spawn(ClusterListener.eventListener, name = "clusterEventListener")
      context.watch(clusterEventListener)

      Behaviors.receiveSignal {
        case (_, Terminated(_)) =>
          Behaviors.stopped
      }
    }

  def main(args: Array[String]): Unit = {
    val system = ActorSystem(ClusteringApp.setup, clusterName)
    system ! ClusteringApp.Start("ClusterManagementSystem")
  }
}
