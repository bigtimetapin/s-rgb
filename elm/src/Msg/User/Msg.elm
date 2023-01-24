module Msg.User.Msg exposing (Msg(..), toString)

import Model.Primary exposing (Primary(..))


type Msg
    = Fetch
    | Stake Primary
    | Harvest Primary


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

        Harvest Red ->
            "user-harvest-red"

        Harvest Green ->
            "user-harvest-green"

        Harvest Blue ->
            "user-harvest-blue"
