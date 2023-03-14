module Model.User.State.Paint exposing (Paint(..), Sizing)

import Model.Color exposing (Color)
import Model.Grid exposing (Grid)


type Paint
    = SizingGrid Sizing
    | HasGrid Grid Color


type alias Sizing =
    { x : Int
    , y : Int
    }
