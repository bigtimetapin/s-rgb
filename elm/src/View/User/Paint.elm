module View.User.Paint exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, id, style)
import Html.Events exposing (onClick, onInput)
import Model.Cell exposing (Cell)
import Model.Color as Color exposing (Color)
import Model.Grid exposing (Grid, Row)
import Model.User.State.Paint as Paint exposing (Paint)
import Model.User.State.State as State
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import View.User.Header


body : User -> Paint -> Html Msg
body user paint =
    let
        html =
            case paint of
                Paint.SizingGrid sizing ->
                    Html.div
                        []
                        [ Html.div
                            [ style "align-items" "center"
                            , style "justify-content" "center"
                            , style "display" "flex"
                            , style "margin-bottom" "150px"
                            ]
                            [ Html.div
                                [ class "mr-3"
                                ]
                                [ Html.div
                                    []
                                    [ Html.input
                                        [ class "is-button-4 mb-2"
                                        , onInput
                                            (\str ->
                                                FromUser <|
                                                    UserMsg.SizeGridX
                                                        user
                                                        sizing
                                                        str
                                            )
                                        ]
                                        [ Html.div
                                            [ class "is-text-container-4"
                                            ]
                                            [ Html.div
                                                [ class "is-size-4"
                                                ]
                                                [ Html.text <|
                                                    String.fromInt sizing.x
                                                ]
                                            ]
                                        ]
                                    , Html.div
                                        [ class "is-text-container-4 has-text-centered"
                                        ]
                                        [ Html.div
                                            [ class "is-size-4"
                                            ]
                                            [ Html.text
                                                """W
                                                """
                                            ]
                                        ]
                                    ]
                                ]
                            , Html.div
                                [ class "mr-3"
                                ]
                                [ Html.div
                                    [ class "is-text-container-4"
                                    ]
                                    [ Html.div
                                        [ class "is-size-4"
                                        ]
                                        [ Html.text
                                            """X
                                            """
                                        ]
                                    ]
                                ]
                            , Html.div
                                [ class "mr-3"
                                ]
                                [ Html.div
                                    []
                                    [ Html.input
                                        [ class "is-button-4 mb-2"
                                        , onInput
                                            (\str ->
                                                FromUser <|
                                                    UserMsg.SizeGridY
                                                        user
                                                        sizing
                                                        str
                                            )
                                        ]
                                        [ Html.div
                                            [ class "is-text-container-4"
                                            ]
                                            [ Html.div
                                                [ class "is-size-4"
                                                ]
                                                [ Html.text <|
                                                    String.fromInt sizing.y
                                                ]
                                            ]
                                        ]
                                    , Html.div
                                        [ class "is-text-container-4 has-text-centered"
                                        ]
                                        [ Html.div
                                            [ class "is-size-4"
                                            ]
                                            [ Html.text
                                                """H
                                                """
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        , Html.div
                            [
                            ]
                            [ Html.div
                                [ class "is-text-container-4 has-text-centered"
                                ]
                                [ Html.div
                                    [ class "is-size-4"
                                    ]
                                    [ Html.button
                                        [ class "is-button-3"
                                        , onClick <|
                                            FromUser <|
                                                UserMsg.CommitGrid
                                                    user
                                                    sizing
                                        ]
                                        [ Html.text <|
                                            String.concat
                                                [ "CREATE CANVAS"
                                                , " "
                                                , String.fromInt sizing.x
                                                , " "
                                                , "X"
                                                , " "
                                                , String.fromInt sizing.y
                                                ]
                                        ]
                                    ]
                                ]
                            ]
                        ]


                Paint.HasGrid grid color ->
                    let
                        f =
                            UserMsg.ColorPixel
                                user
                                grid

                        select_ =
                            select user grid
                    in
                    Html.div
                        [ class "container"
                        ]
                        [ Html.div
                            [ class <|
                                String.concat
                                    [ Color.toClass color
                                    , "-"
                                    , "cursor"
                                    ]
                            ]
                            [ Html.div
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
                        ]
    in
    Html.div
        []
        [ Html.div
            [ class "mb-6"
            , style "margin-bottom" "150px"
            ]
            [ View.User.Header.body user (State.Paint paint)
            ]
        , Html.div
            []
            [ html
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
