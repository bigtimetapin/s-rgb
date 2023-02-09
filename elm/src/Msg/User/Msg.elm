module Msg.User.Msg exposing (Msg(..), toString)

import Model.Pixel as Pixel
import Model.Primary exposing (Primary(..))


type Msg
    = Fetch
    | Stake Primary
    | Harvest Primary
    | InitPixel Pixel.Seeds


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

        InitPixel seeds ->
            "user-init-pixel"
