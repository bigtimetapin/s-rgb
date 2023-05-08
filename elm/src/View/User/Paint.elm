module View.User.Paint exposing (body)

import Html exposing (Html, i)
import Html.Attributes exposing (class, id, style, type_, value)
import Html.Events exposing (onClick, onInput, onMouseDown, onMouseOver, onMouseUp)
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
                            [ class "has-text-centered"
                            ]
                            [ Html.button
                                [ class "is-button-3"
                                , onClick <|
                                    FromUser <|
                                        UserMsg.CommitGrid
                                            user
                                            sizing
                                ]
                                [ Html.div
                                    [ class "is-size-4"
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

                Paint.HasGrid grid color ->
                    let
                        fMouseDown =
                            UserMsg.OpenBuffer
                                user
                                grid
                                color

                        fMouseUp =
                            UserMsg.CloseBuffer
                                user
                                grid
                                color

                        fMouseOver =
                            UserMsg.ColorPixel
                                user
                                grid

                        select_ =
                            select user grid
                    in
                    Html.div
                        []
                        [ Html.div
                            [ class "columns"
                            ]
                            [ Html.div
                                [ style "display" "flex"
                                , style "justify-content" "flex-end"
                                , class "column is-3"
                                ]
                                [ Html.div
                                    []
                                    [ select_ Color.White
                                    , select_ Color.Red
                                    , select_ Color.Green
                                    , select_ Color.Blue
                                    , select_ Color.Yellow
                                    , select_ Color.Magenta
                                    , select_ Color.Cyan
                                    , select_ Color.Black
                                    , Html.div
                                        [ class "my-2"
                                        ]
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
                                    , Html.div
                                        [ class "mb-2"
                                        ]
                                        [ Html.button
                                            [ class "button"
                                            , onClick <|
                                                FromUser <|
                                                    UserMsg.ClearGrid
                                                        user
                                                        grid
                                                        color
                                            ]
                                            [ Html.text "clear"
                                            ]
                                        ]
                                    , Html.div
                                        []
                                        [ Html.div
                                            []
                                            [ Html.text "cell width"
                                            ]
                                        , Html.input
                                            [ style "width" "75px"
                                            , class "is-button-4 mb-2"
                                            , value <| String.fromInt grid.cell
                                            , type_ "number"
                                            , onInput
                                                (\str ->
                                                    FromUser <|
                                                        UserMsg.SizeCell
                                                            user
                                                            grid
                                                            color
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
                                                        String.fromInt grid.cell
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            , Html.div
                                [ class <|
                                    String.concat
                                        [ Color.toClass color
                                        , "-"
                                        , "cursor"
                                        , " "
                                        , "column is-5"
                                        ]
                                ]
                                [ Html.div
                                    []
                                    [ Html.div
                                        [ id "s-rgb-pixel-grid"
                                        ]
                                      <|
                                        List.map
                                            (\r ->
                                                row grid.cell color r fMouseDown fMouseUp fMouseOver
                                            )
                                            grid.grid
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
    Html.div
        []
        [ Html.button
            [ class <|
                String.concat
                    [ Color.toClass color
                    ]
            , style "width" "50px"
            , style "height" "50px"
            , onClick <|
                FromUser <|
                    UserMsg.ChangeColor
                        user
                        grid
                        color
            ]
            []
        ]


cell : Color -> Cell -> UserMsg.Msg -> UserMsg.Msg -> (Color -> Cell -> UserMsg.Msg) -> Html Msg
cell color cell_ fMouseDown fMouseUp fMouseOver =
    Html.button
        [ class <|
            String.concat
                [ Color.toClass cell_.color
                , " "
                , Color.toClass color
                , "-"
                , "cursor"
                , " "
                , "is-cell"
                ]
        , onMouseDown <|
            FromUser fMouseDown
        , onMouseUp <|
            FromUser fMouseUp
        , onMouseOver <|
            FromUser <|
                fMouseOver color cell_
        ]
        []


row : Int -> Color -> Row -> UserMsg.Msg -> UserMsg.Msg -> (Color -> Cell -> UserMsg.Msg) -> Html Msg
row width color cells fMouseDown fMouseUp fMouseOver =
    Html.div
        [ style "display" "grid"
        , style "grid-auto-columns" <|
            String.concat
                [ "max("
                , String.fromInt width
                , "px)"
                ]
        , style "grid-auto-flow" "column"
        ]
    <|
        List.map
            (\c ->
                cell color c fMouseDown fMouseUp fMouseOver
            )
            cells
