module Msg.User.Msg exposing (Msg(..), toString)

import Model.Primary exposing (Primary(..))


type Msg
    = Fetch
    | Stake Primary


toString : Msg -> String
toString msg =
    case msg of
        Fetch ->
            "user-fetch"

        Stake Red ->
            "user-stake-red"

        Stake Green ->
            "user-stake-green"

        Stake Blue ->
            "user-stake-blue"
