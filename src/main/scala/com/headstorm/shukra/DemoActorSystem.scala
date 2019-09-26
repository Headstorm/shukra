package com.headstorm.shukra

import akka.actor.typed.{ActorRef, Behavior}
import akka.actor.typed.scaladsl.Behaviors

object DemoActorSystem {

  object HelloWorld {
    final case class Greet(whom: String, replyTo: ActorRef[Greeted])
    final case class Greeted(whom: String, from: ActorRef[Greet])

    val greeter: Behavior[Greet] = Behaviors.receive { (context, message) =>
      context.log.info("Hello {}!", message.whom)
      message.replyTo ! Greeted(message.whom, context.self)
      Behaviors.same
    }
  }
}
