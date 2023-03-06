module Model.Grid exposing (Grid, init)

import Model.Cell exposing (Cell)
import Model.Color as Color


type alias Grid =
    List Row


type alias Row =
    List Cell


init : Grid
init =
    [ List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 1 10)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 11 20)
    , List.map
        (\int ->
            { index = int, color = Color.Black }
        )
        (List.range 21 30)
    ]
