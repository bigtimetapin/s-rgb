module View.User.Paint exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, id, style)
import Html.Events exposing (onClick)
import Model.Cell exposing (Cell)
import Model.Color as Color exposing (Color)
import Model.Grid exposing (Grid, Row)
import Model.User.State as State
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import View.User.Header


body : User -> Grid -> Color -> Html Msg
body user grid color =
    let
        f =
            UserMsg.ColorPixel
                user
                grid

        select_ =
            select user grid
    in
    Html.div
        [ class <|
            String.concat
                [ Color.toClass color
                , "-"
                , "cursor"
                ]
        ]
        [ Html.div
            [ class "mb-2"
            ]
            [ View.User.Header.body user (\u -> State.Paint u grid color)
            ]
        , Html.div
            [ class "mb-3"
            , id "s-rgb-pixel-grid"
            ]
          <|
            List.map
                (\r ->
                    row color r f
                )
                grid
        , Html.div
            []
            [ Html.div
                [ class "buttons mb-2"
                ]
                [ select_ Color.White
                , select_ Color.Red
                , select_ Color.Green
                , select_ Color.Blue
                , select_ Color.Yellow
                , select_ Color.Magenta
                , select_ Color.Cyan
                , select_ Color.Black
                ]
            , Html.div
                []
                [ Html.button
                    [ class "button"
                    , onClick <|
                        FromUser <|
                            UserMsg.Paint
                                grid
                    ]
                    [ Html.text "mint"
                    ]
                ]
            ]
        ]


select : User -> Grid -> Color -> Html Msg
select user grid color =
    Html.button
        [ class <|
            String.concat
                [ Color.toClass color
                ]
        , style "width" "100px"
        , style "height" "100px"
        , onClick <|
            FromUser <|
                UserMsg.ChangeColor
                    user
                    grid
                    color
        ]
        []


cell : Color -> Cell -> (Color -> Cell -> UserMsg.Msg) -> Html Msg
cell color cell_ f =
    Html.button
        [ class <|
            String.concat
                [ Color.toClass cell_.color
                , " "
                , Color.toClass color
                , "-"
                , "cursor"
                ]
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
