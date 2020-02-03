package com.headstorm.shukra

import ClusteringConfig.clusterAkkaManagementEnabled

import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.scaladsl.adapter._
import akka.cluster.ClusterEvent._
import akka.cluster.typed.{Cluster, Subscribe}
import akka.management.scaladsl.AkkaManagement

object ClusterListener {

  // subscribe to cluster changes, re-subscribe when restart
  val eventListener: Behavior[ClusterDomainEvent] = Behaviors.setup[ClusterDomainEvent] (context => {
    context.setLoggerName(this.getClass)
    context.log.info("Starting up cluster listener...")
    if (clusterAkkaManagementEnabled.equalsIgnoreCase("enabled")) {
      context.log.info("Starting management service...")
      AkkaManagement(context.system.toClassic).start()
    }
    val cluster = Cluster(context.system)
    cluster.subscriptions ! Subscribe(context.self, classOf[ClusterDomainEvent])

    Behaviors.receive[ClusterDomainEvent] {
      case (_, message: ClusterDomainEvent) => {
        message match {
          case MemberUp(member) => {
            context.log.info("Member is Up: {}", member.address)
          }
          case UnreachableMember(member) => {
            context.log.info("Member detected as unreachable: {}", member)
          }
          case MemberRemoved(member, previousStatus) => {
            context.log.info("Member is Removed: {} after {}", member.address, previousStatus)
          }
          case LeaderChanged(member) => {
            context.log.info("Leader changed: " + member)
          }
          case any: ClusterDomainEvent => {
            context.log.info("Cluster Domain Event: " + any.toString)
          }
          case _ => {
            context.log.info("Cluster Domain Event: Unhandled")
          }
        }
        Behaviors.same
      }
      case _ => {
        Behaviors.unhandled
      }
    }
  })
}
