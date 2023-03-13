module View.User.Header exposing (body)

import Html exposing (Html)
import Html.Attributes exposing (class, style)
import Model.User.State as State exposing (State)
import Msg.Msg exposing (Msg)

body : State -> Html Msg
body state =
    let
        hightlight_ =
            highlight state
    in
    Html.div
        [ style "align-items" "center"
        , style "justify-content" "center"
        , style "display" "flex"
        ]
        [ Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ "is-text-container-4 has-text-weight-bold"
                        , hightlight_ Stake
                        ]
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "STAKE"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ "is-text-container-4 has-text-weight-bold"
                        , hightlight_ Mix
                        ]
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "MIX"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ "is-text-container-4 has-text-weight-bold"
                        , hightlight_ Vault
                        ]
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "VAULT"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3 has-vertical-line-right"
            ]
            [ Html.div
                [ class "is-text-container-4 has-text-weight-bold"
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "TRADE"
                    ]
                ]
            ]
        , Html.div
            [ class "px-3"
            ]
            [ Html.div
                [ class <|
                    String.concat
                        [ "is-text-container-4 has-text-weight-bold"
                        , hightlight_ Paint
                        ]
                ]
                [ Html.div
                    [ class "is-size-4"
                    ]
                    [ Html.text "PAINT"
                    ]
                ]
            ]
        ]

highlight : State -> This -> String
highlight state this =
    let
        class =
            " has-green-text"
    in
    case (this, state) of
        (Stake, State.Stake _) ->
            class

        (Mix, State.Mix _) ->
            class

        (Vault, State.Vault _) ->
             class

        (Paint, State.Paint _ _ _) ->
            class

        _ ->
            ""

type This
    = Stake
    | Mix
    | Vault
    | Paint
