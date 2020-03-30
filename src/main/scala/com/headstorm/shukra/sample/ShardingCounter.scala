package com.headstorm.shukra.sample

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior}

object ShardingCounter {
  sealed trait Command
  case object Increment extends Command
  final case class GetValue(replyTo: ActorRef[Int]) extends Command

  def apply(entityId: String): Behavior[Command] = Behaviors.setup {
    context => {
      context.setLoggerName(this.getClass)
      def updated(value: Int): Behavior[Command] = {
        Behaviors.receiveMessage[Command] {
          case Increment => {
            val newValue = (value + 1) % 100
            context.log.info(s"Counter: ${newValue}")
            updated(newValue)
          }
          case GetValue(replyTo) =>
            replyTo ! value
            Behaviors.same
        }
      }

      updated(0)
    }
  }
}
