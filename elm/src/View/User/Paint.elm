module View.User.Paint exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, style)
import Msg.Msg exposing (Msg)


body : Html Msg
body =
    Html.div
        []
        [ Html.div
            []
          <|
            List.map
                (\_ ->
                    row 10
                )
                (List.range 1 10)
        ]


cell : Html Msg
cell =
    Html.button
        [ class "has-white"
        , style "padding-top" "100%"
        ]
        []


row : Int -> Html Msg
row int =
    Html.div
        [ style "display" "grid"
        , style "grid-auto-columns" "1fr"
        , style "grid-auto-flow" "column"
        ]
    <|
        List.map
            (\_ ->
                cell
            )
            (List.range 1 int)
