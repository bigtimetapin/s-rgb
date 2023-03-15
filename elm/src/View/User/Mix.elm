module View.User.Mix exposing (body)

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
            [ View.User.Header.body user State.Mix
            ]
        , Html.div
            []
            [ Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = Color.Red
                    , right = Color.Green
                    , target = Color.Yellow
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = Color.Red
                    , right = Color.Blue
                    , target = Color.Magenta
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = Color.Green
                    , right = Color.Blue
                    , target = Color.Cyan
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = Color.Red
                    , right = Color.Cyan
                    , target = Color.White
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = Color.Green
                    , right = Color.Magenta
                    , target = Color.White
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
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

mint : Args -> Html Msg
mint args =
    Html.div
        [ style "align-items" "center"
        , style "justify-content" "center"
        , style "display" "flex"
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
            [ class <|
                String.concat
                    [ Color.toClass args.right
                    , " "
                    , "is-color-block"
                    ]
            ]
            []
        , Html.div
            []
            [ Html.img
                [ src "svg/equal-sign.svg"
                , style "width" "150px"
                ]
                []
            ]
        , Html.div
            [ class <|
                String.concat
                    [ Color.toClass args.target
                    , " "
                    , "is-color-block"
                    ]
            ]
            []
        ]
