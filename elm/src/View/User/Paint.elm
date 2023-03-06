module View.User.Paint exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, id, style)
import Html.Events exposing (onClick)
import Model.Cell exposing (Cell)
import Model.Color as Color exposing (Color)
import Model.Grid exposing (Grid, Row)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg


body : Grid -> Color -> Html Msg
body grid color =
    let
        f =
            UserMsg.ColorPixel
                grid
    in
    Html.div
        []
        [ Html.div
            [ id "s-rgb-pixel-grid"
            ]
          <|
            List.map
                (\r ->
                    row color r f
                )
                grid
        , Html.div
            []
            [ Html.button
                [ onClick <|
                    FromUser <|
                        UserMsg.Paint
                ]
                [ Html.text "mint"
                ]
            ]
        ]


cell : Color -> Cell -> (Color -> Cell -> UserMsg.Msg) -> Html Msg
cell color cell_ f =
    Html.button
        [ class <| Color.toClass cell_.color
        , style "padding-top" "100%"
        , onClick <|
            FromUser <|
                f color cell_
        ]
        []


row : Color -> Row -> (Color -> Cell -> UserMsg.Msg) -> Html Msg
row color cells f =
    Html.div
        [ style "display" "grid"
        , style "grid-auto-columns" "1fr"
        , style "grid-auto-flow" "column"
        ]
    <|
        List.map
            (\c ->
                cell color c f
            )
            cells
