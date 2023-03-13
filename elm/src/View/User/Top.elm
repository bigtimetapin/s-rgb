module View.User.Top exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, src, style, width)
import Html.Events exposing (onClick)
import Msg.Global as FromGlobal
import Msg.Msg as Msg exposing (Msg)


body : Html Msg
body =
    Html.div
        [ class "has-text-centered"
        ]
        [ Html.div
            [ class "is-text-container-3"
            , style "margin-bottom" "250px"
            ]
            [ Html.button
                [ class "is-connect-button is-size-3"
                , onClick <| Msg.Global FromGlobal.Connect
                ]
                [ Html.text "(PLEASE CONNECT YOUR WALLET TO BEGIN)"
                ]
            ]
        , Html.div
            [ class "is-text-container-1 has-text-weight-bold"
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "display" "flex"
            ]
            [ Html.img
                [ src "logo/logo.png"
                , width 40
                ]
                []
            , Html.h2
                [ class "is-size-1"
                ]
                [ Html.text
                    """RGB.INDUSTRIES
                    """
                ]
            ]
        ]
