package com.headstorm.shukra.cluster

import akka.actor.typed.{ActorRef, ActorSystem, Behavior, Terminated}
import akka.actor.typed.scaladsl.Behaviors
import akka.cluster.sharding.typed.ShardingEnvelope
import akka.cluster.sharding.typed.scaladsl.{ClusterSharding, Entity, EntityTypeKey}
import com.headstorm.shukra.cluster.ClusteringConfig.clusterName
import scala.concurrent.duration._

object ClusteringApp {

  final case class Start(name: String)

  val setup: Behavior[Start] =
    Behaviors.setup { context =>
      val clusterEventListener = context.spawn(ClusterListener.eventListener, name = "clusterEventListener")
      context.watch(clusterEventListener)

      val sharding = ClusterSharding(context.system)
      val TypeKey = EntityTypeKey[ShardingCounter.Command]("Counter")
      val shardRegion: ActorRef[ShardingEnvelope[ShardingCounter.Command]] =
        sharding.init(Entity(TypeKey)(createBehavior = entityContext => ShardingCounter(entityContext.entityId)))

      context.system.scheduler.scheduleWithFixedDelay(3000.milliseconds, 2000.milliseconds)(() => {
        shardRegion ! ShardingEnvelope("counter-1", ShardingCounter.Increment)
      })(context.executionContext)

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
