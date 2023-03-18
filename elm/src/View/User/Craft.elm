module View.User.Craft exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style)
import Html.Events exposing (onClick)
import Model.Color as Color exposing (Color)
import Model.User.State.State as State
import Model.User.User exposing (User)
import Msg.Msg exposing (Msg(..))
import Msg.User.Msg as UserMsg
import View.User.Header


body : User -> Html Msg
body user =
    Html.div
        []
        [ Html.div
            [ class "mb-6"
            ]
            [ View.User.Header.body user State.Craft
            ]
        , Html.div
            []
            [ Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Red
                    , right = Color.Green
                    , target = Color.Yellow
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Red
                    , right = Color.Blue
                    , target = Color.Magenta
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Green
                    , right = Color.Blue
                    , target = Color.Cyan
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Red
                    , right = Color.Cyan
                    , target = Color.White
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Green
                    , right = Color.Magenta
                    , target = Color.White
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ add
                    { left = Color.Blue
                    , right = Color.Yellow
                    , target = Color.White
                    }
                ]
            ]
        ]


type alias Args =
    { left : Color
    , right : Color
    , target : Color
    }

add : Args -> Html Msg
add args =
    let
        multiplier =
            Html.div
                [ class "is-color-block-balance"
                ]
                [ Html.div
                    [ class "is-text-container-6"
                    ]
                    [ Html.div
                        [ class "is-size-6"
                        ]
                        [ Html.text "5x"
                        ]
                    ]
                ]
    in
    Html.div
        [ style "align-items" "center"
        , style "justify-content" "center"
        , style "display" "flex"
        ]
        [ Html.div
            [ class "is-color-block-container"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ Color.toClass args.left
                        , " "
                        , "is-color-block"
                        ]
                ]
                []
            , multiplier
            ]
        , Html.div
            []
            [ Html.button
                [ class "is-mix-button"
                , onClick <|
                    FromUser <|
                        UserMsg.AddPixel
                            (Color.toSeeds args.left)
                            (Color.toSeeds args.right)
                ]
                []
            ]
        , Html.div
            [ class "is-color-block-container"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ Color.toClass args.right
                        , " "
                        , "is-color-block"
                        ]
                ]
                []
            , multiplier
            ]
        , Html.div
            []
            [ Html.img
                [ src "svg/equal-sign.svg"
                , style "width" "150px"
                ]
                []
            ]
        , Html.div
            [ class "is-color-block-container"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ Color.toClass args.target
                        , " "
                        , "is-color-block"
                        ]
                ]
                []
            , multiplier
            ]
        ]
