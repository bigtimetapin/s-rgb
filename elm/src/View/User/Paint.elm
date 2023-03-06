module View.User.Paint exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, style)
import Model.Cell exposing (Cell)
import Model.Color as Color
import Model.Grid exposing (Grid)
import Msg.Msg exposing (Msg)


body : Grid -> Html Msg
body grid =
    Html.div
        []
        [ Html.div
            []
          <|
            List.map
                (\r ->
                    row r
                )
                grid
        ]


cell : Cell -> Html Msg
cell c =
    Html.button
        [ class <| Color.toClass c.color
        , style "padding-top" "100%"
        ]
        []


row : List Cell -> Html Msg
row cells =
    Html.div
        [ style "display" "grid"
        , style "grid-auto-columns" "1fr"
        , style "grid-auto-flow" "column"
        ]
    <|
        List.map
            (\c ->
                cell c
            )
            cells
