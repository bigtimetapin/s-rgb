module Model.User.State exposing (State(..))

import Model.Grid exposing (Grid)
import Model.User.User exposing (User)


type State
    = Top
    | Fetched User
    | Paint Grid
