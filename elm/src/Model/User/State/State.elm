module Model.User.State.State exposing (State(..))

import Model.Color exposing (Color)
import Model.Grid exposing (Grid)
import Model.User.User exposing (User)


type State
    = Top
    | Stake User
    | Mix User
    | Vault User
    | Paint User Grid Color
