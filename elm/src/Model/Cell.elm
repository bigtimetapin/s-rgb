module Model.Cell exposing (Cell)

import Model.Color exposing (Color)


type alias Cell =
    { index : Int
    , color : Color
    }
