module View.User.Mix exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style)
import Html.Events exposing (onClick)
import Model.User.State as State
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
                [ style "align-items" "center"
                , style "justify-content" "center"
                , style "display" "flex"
                ]
                [ Html.div
                    [ class "has-red is-color-block"
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
                                    , g = 0
                                    , b = 0
                                    , depth = 1
                                    }

                        ]
                        []
                    ]
                , Html.div
                    [ class "has-black is-color-block"
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
                    [ class "has-red is-color-block"
                    ]
                    []
                ]




            , Html.div
                [ style "align-items" "center"
                , style "justify-content" "center"
                , style "display" "flex"
                ]
                [ Html.div
                    [ class "has-red is-color-block"
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
                                    , b = 0
                                    , depth = 1
                                    }

                        ]
                        []
                    ]
                , Html.div
                    [ class "has-green is-color-block"
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
                    [ class "has-yellow is-color-block"
                    ]
                    []
                ]
            ]
        ]
