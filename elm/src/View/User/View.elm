module View.User.View exposing (view)

import Html exposing (Html)
import Model.User.State.State exposing (State(..))
import Msg.Msg exposing (Msg(..))
import View.User.Mix
import View.User.Paint
import View.User.Stake
import View.User.Top
import View.User.Vault


view : State -> Html Msg
view state =
    case state of
        Top ->
            View.User.Top.body

        Stake user ->
            View.User.Stake.body user

        Mix user ->
            View.User.Mix.body user

        Vault user ->
            View.User.Vault.body user

        Paint user grid color ->
            View.User.Paint.body user grid color
