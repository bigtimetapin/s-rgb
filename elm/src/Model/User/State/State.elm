module Model.User.State.State exposing (State(..))

import Model.User.State.Paint exposing (Paint)
import Model.User.User exposing (User)


type State
    = Top
    | Stake User
    | Craft User
    | Vault User
    | Paint Paint User
