module View.User.Mix exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style)
import Html.Events exposing (onClick)
import Model.Pixel as Pixel
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
                    { left = "has-red"
                    , right = "has-black"
                    , target = "has-red"
                    , seeds =
                        { r = 1
                        , g = 0
                        , b = 0
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = "has-green"
                    , right = "has-black"
                    , target = "has-green"
                    , seeds =
                        { r = 0
                        , g = 1
                        , b = 0
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = "has-blue"
                    , right = "has-black"
                    , target = "has-blue"
                    , seeds =
                        { r = 0
                        , g = 0
                        , b = 1
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = "has-red"
                    , right = "has-green"
                    , target = "has-yellow"
                    , seeds =
                        { r = 1
                        , g = 1
                        , b = 0
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = "has-red"
                    , right = "has-blue"
                    , target = "has-magenta"
                    , seeds =
                        { r = 1
                        , g = 0
                        , b = 1
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                [ class "mb-6"
                ]
                [ mint
                    { left = "has-green"
                    , right = "has-blue"
                    , target = "has-cyan"
                    , seeds =
                        { r = 0
                        , g = 1
                        , b = 1
                        , depth = 1
                        }
                    }
                ]
            , Html.div
                []
                [ Html.div
                    [ style "align-items" "center"
                    , style "justify-content" "center"
                    , style "display" "flex"
                    ]
                    [ Html.div
                        [ class <|
                            String.concat
                                [ "has-red"
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
                                    UserMsg.MintPixel
                                        { r = 1
                                        , g = 1
                                        , b = 1
                                        , depth = 1
                                        }
                            ]
                            []
                        ]
                    , Html.div
                        [ class <|
                            String.concat
                                [ "has-green"
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
                                    UserMsg.MintPixel
                                        { r = 1
                                        , g = 1
                                        , b = 1
                                        , depth = 1
                                        }
                            ]
                            []
                        ]
                    , Html.div
                        [ class <|
                            String.concat
                                [ "has-blue"
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
                                [ "has-white"
                                , " "
                                , "is-color-block"
                                ]
                        ]
                        []
                    ]
                ]
            ]
        ]


type alias Args =
    { left : String
    , right : String
    , target : String
    , seeds : Pixel.Seeds
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
                    [ args.left
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
                        UserMsg.MintPixel
                            args.seeds
                ]
                []
            ]
        , Html.div
            [ class <|
                String.concat
                    [ args.right
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
                    [ args.target
                    , " "
                    , "is-color-block"
                    ]
            ]
            []
        ]
