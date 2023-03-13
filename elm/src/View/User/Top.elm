module View.User.Top exposing (body)

import Html exposing (Html)
import Msg.Msg exposing (Msg)


body : Html Msg
body =
    Html.div
        []
        [ Html.text "top"
        ]
