module View.Footer exposing (view)

import Html exposing (Html)
import Html.Attributes exposing (class, href, target)
import Msg.Msg exposing (Msg)


view : Html Msg
view =
    Html.footer
        [ class "level mx-5 my-2"
        ]
        [ Html.div
            [ class "level-left"
            ]
            [ Html.div
                [ class "level-item"
                ]
                [ Html.a
                    [ href "https://github.com/bigtimetapin/s-rgb"
                    , target "_blank"
                    ]
                    [ Html.span
                        [ class "icon is-medium"
                        ]
                        [ Html.i
                            [ class "fab fa-sm fa-github"
                            ]
                            []
                        ]
                    ]
                ]
            , Html.div
                [ class "level-item"
                ]
                [ Html.a
                    [ class "icon is-medium"
                    , href "mailto:hi@seangreen.info"
                    , target "_blank"
                    ]
                    [ Html.i
                        [ class "far fa-sm fa-envelope"
                        ]
                        []
                    ]
                ]
            ]
        , Html.div
            [ class "level-right"
            ]
            [ Html.div
                [ class "level-item is-text-container-5"
                ]
                [ Html.div
                    [ class "is-size-5 has-text-weight-bold"
                    ]
                    [ Html.a
                        [ href "https://docs.google.com/presentation/d/e/2PACX-1vTbYb_vM7uBODzRfu0xWA3xsFbI3oaOSkWXF9Z9ccTSC6c_Gz8bhw7K6Dy8amuNxKhQnDQBWm8hxB9Z/pub?start=false&slide=id.p"
                        , target "_blank"
                        ]
                        [ Html.text "?"
                        ]
                    ]
                ]
            ]
        ]
